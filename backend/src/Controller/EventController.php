<?php

namespace App\Controller;

use App\Entity\Event;
use App\Entity\User;
use App\Entity\UserEvent;
use App\Repository\EventRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Security;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class EventController extends AbstractController
{
    private $jwtManager;
    private $jwtEncoder;

    public function __construct(JWTTokenManagerInterface $jwtManager, JWTEncoderInterface $jwtEncoder)
    {
        $this->jwtManager = $jwtManager;
        $this->jwtEncoder = $jwtEncoder;
    }

    /**
     * @Route("/api/highlighted-events", name="highlighted-events")
     */
    public function highlightedEvents(EntityManagerInterface $entityManager): Response
    {
        $highlighted_events = $entityManager->getRepository(Event::class)
        ->createQueryBuilder('e')
        ->select('e.id, e.title, e.location, e.start_date, e.end_date, e.image')
        ->leftJoin('e.userEvents', 'ue', 'WITH', 'ue.validation = 1') // Ajouter une condition au join
        ->groupBy('e.id')
        ->where('e.privacy = 1')
        ->andWhere('e.end_date > :currentDate')
        ->andWhere('e.deleted IS NULL')
        ->setParameter('currentDate', new \DateTime())
        ->orderBy('COUNT(ue.user)', 'DESC')
        ->setMaxResults(6)
        ->getQuery()
        ->getResult();
        
    
        $serializer = $this->container->get('serializer');
        $highlighted_events_json = $serializer->serialize($highlighted_events, 'json', ['circular_reference_handler' => function ($object) {
            return $object->getId();
        }]);
    
        return new Response($highlighted_events_json, 200, ['Content-Type' => 'application/json']);
    }

    /**
     * @Route("/api/event/{id}", name="event", methods={"GET"})
     */
    public function event($id, EntityManagerInterface $entityManager): Response
    {
        $event = $entityManager->getRepository(Event::class)->createQueryBuilder('e')
            ->where('e.id = :id')
            ->andWhere('e.deleted IS NULL')
            ->setParameter('id', $id)
            ->getQuery()
            ->getOneOrNullResult();

        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        $creator = $event->getCreator();
        $creatorData = [
            'id' => $creator->getId(),
            'email' => $creator->getEmail(),
            'firstname' => $creator->getFirstname(),
            'lastname' => $creator->getLastname(),
            'bio' => $creator->getBio(),
            'age' => $creator->getAge(),
            'profilePicture' => $creator->getProfilePicture(),
        ];

        $participantCount = count(array_filter($event->getUserEvents()->toArray(), function ($userEvent) {
            return $userEvent->isValidation();
        }));

        $eventData = [
            'id' => $event->getId(),
            'title' => $event->getTitle(),
            'description' => $event->getDescription(),
            'privacy' => $event->isPrivacy(),
            'startDate' => $event->getStartDate(),
            'endDate' => $event->getEndDate(),
            'location' => $event->getLocation(),
            'image' => $event->getImage(),
            'creator' => $creatorData,
            'token' => $event->getToken(),
            'participant_count' => $participantCount,
        ];

        return $this->json($eventData);
    }

    /**
     * @Route("/api/unique-locations", name="unique-locations", methods={"GET"})
     */
    public function getUniqueLocations(Request $request, EntityManagerInterface $entityManager): Response
    {
        $searchTerm = $request->query->get('q', '');

        $queryBuilder = $entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->select('DISTINCT e.location, COUNT(e.id) AS event_count')
            ->where('e.privacy = 1')
            ->andWhere('e.location LIKE :searchTerm')
            ->andWhere('e.deleted IS NULL')
            ->setParameter('searchTerm', '%' . $searchTerm . '%')
            ->groupBy('e.location')
            ->orderBy('event_count', 'DESC')
            ->setMaxResults(10);

        $locations = $queryBuilder->getQuery()->getResult();

        return $this->json($locations);
    }

    /**
     * @Route("/api/search-events", name="search-events", methods={"GET"})
     */
    public function searchEvents(Request $request, EntityManagerInterface $entityManager): Response
    {
        $searchTerm = $request->query->get('q', null);
        $location = $request->query->get('location', null);
        $startDate = $request->query->get('startDate', null);
        $endDate = $request->query->get('endDate', null);
        $creatorFirstname = $request->query->get('creatorFirstname', null);
        $limit = $request->query->get('limit', 9);
        $offset = $request->query->get('offset', 0);

        $queryBuilder = $entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->select('e.id, e.title, e.description, e.location, e.start_date, e.end_date, e.image') // Modifier la sélection des champs
            ->leftJoin('e.creator', 'c')
            ->where('e.privacy = 1')
            ->andWhere('e.deleted IS NULL');

        // Check if all search parameters are empty
        $isSearchEmpty = $searchTerm === null && $location === null && $startDate === null && $endDate === null && $creatorFirstname === null;

        if (!$isSearchEmpty) {
            if ($searchTerm !== null) {
                $queryBuilder->andWhere('(e.title LIKE :searchTerm OR e.description LIKE :searchTerm)')
                    ->setParameter('searchTerm', '%' . $searchTerm . '%');
            }

            if ($location !== null) {
                $queryBuilder->andWhere('e.location = :location')
                    ->setParameter('location', $location);
            }

            if ($startDate !== null) {
                $queryBuilder->andWhere('e.start_date LIKE :startDate')
                    ->setParameter('startDate', $startDate . '%');
            }

            if ($endDate !== null) {
                $queryBuilder->andWhere('e.end_date LIKE :endDate')
                    ->setParameter('endDate', $endDate . '%');
            }

            if ($creatorFirstname !== null) {
                $queryBuilder->andWhere('c.firstname LIKE :creatorFirstname')
                    ->setParameter('creatorFirstname', '%' . $creatorFirstname . '%');
            }
        }

        // Clone the query builder for the count query
        $countQueryBuilder = clone $queryBuilder;
        $totalEvents = $countQueryBuilder->select('COUNT(e.id)')
                                         ->getQuery()
                                         ->getSingleScalarResult();

        // Set limit and offset for pagination
        $queryBuilder->setMaxResults($limit)
                     ->setFirstResult($offset);

        $events = $queryBuilder->getQuery()->getResult();

        return $this->json([
            'total' => $totalEvents,
            'events' => $events
        ]);
    }

    /**
     * @Route("/api/events/join/{id}", name="join-event", methods={"POST"})
     */
    public function joinEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer le token depuis le cookie
        $token = $request->cookies->get('redirectImage');

        if (!$token) {
            return $this->json(['error' => 'Token not found'], Response::HTTP_UNAUTHORIZED);
        }

        // Décoder le token pour obtenir les informations de l'utilisateur
        $data = $this->jwtEncoder->decode($token);
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Trouver l'événement par ID
        $event = $entityManager->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        try {
            // Ajouter l'utilisateur à l'événement
            $eventUser = new UserEvent();
            $eventUser->setToken(bin2hex(random_bytes(32)));
            $eventUser->setEvent($event);
            $eventUser->setUser($user);
            $eventUser->setValidation(true);
            $entityManager->persist($eventUser);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['success' => 'User registered to event successfully']);
    }

    /**
     * @Route("/api/events/leave/{id}", name="leave-event", methods={"DELETE"})
     */
    public function leaveEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer le token depuis le cookie
        $token = $request->cookies->get('redirectImage');

        if (!$token) {
            return $this->json(['error' => 'Token not found'], Response::HTTP_UNAUTHORIZED);
        }

        // Décoder le token pour obtenir les informations de l'utilisateur
        $data = $this->jwtEncoder->decode($token);
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        // Trouver l'événement par ID
        $event = $entityManager->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        try {
            // Retirer l'utilisateur de l'événement
            $eventUser = $entityManager->getRepository(UserEvent::class)->findOneBy(['event' => $event, 'user' => $user]);

            if (!$eventUser) {
                return $this->json(['error' => 'User is not registered for this event'], Response::HTTP_NOT_FOUND);
            }
            $entityManager->remove($eventUser);
            $entityManager->persist($event);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['success' => 'User unregistered from event successfully']);
    }

    /**
     * @Route("/api/events", name="create-event", methods={"POST"})
     */
    public function createEvent(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer le token depuis le cookie
        $token = $request->cookies->get('redirectImage');

        if (!$token) {
            return $this->json(['error' => 'Token not found'], Response::HTTP_UNAUTHORIZED);
        }

        // Décoder le token pour obtenir les informations de l'utilisateur
        $data = $this->jwtEncoder->decode($token);
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $eventData = json_decode($request->getContent(), true);

        $event = new Event();
        $event->setTitle($eventData['title']);
        $event->setDescription($eventData['description']);
        $event->setPrivacy($eventData['privacy']);
        $event->setLocation($eventData['location']);
        $event->setStartDate(new \DateTime($eventData['start_date']));
        $event->setEndDate(new \DateTime($eventData['end_date']));
        $event->setImage($eventData['image']);
        $event->setCreator($user);
        $event->setToken(bin2hex(random_bytes(10)));
        // Ajouter l'utilisateur créateur à la liste des utilisateurs inscrits
        $userEvent = new UserEvent();
        $userEvent->setToken(bin2hex(random_bytes(32)));
        $userEvent->setEvent($event);
        $userEvent->setUser($user);
        $userEvent->setValidation(true);

        try {
            $entityManager->persist($event);
            $entityManager->persist($userEvent);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['success' => 'Event created successfully']);
    }

    /**
     * @Route("/api/delete-event/{id}", name="delete-event", methods={"DELETE"})
     */
    public function deleteEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupérer le token depuis le cookie
        $token = $request->cookies->get('redirectImage');

        if (!$token) {
            return $this->json(['error' => 'Token not found'], Response::HTTP_UNAUTHORIZED);
        }
    
        // Décoder le token pour obtenir les informations de l'utilisateur
        $data = $this->jwtEncoder->decode($token);
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['username']]);
    
        if (!$user) {
            return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
    
        // Trouver l'événement par ID
        $event = $entityManager->getRepository(Event::class)->find($id);
    
        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }
    
        if ($event->getCreator()->getId() !== $user->getId()) {
            return $this->json(['error' => 'User is not the creator of the event'], Response::HTTP_FORBIDDEN);
        }
    
        try {
            // Mettre à jour la colonne deleted avec la date actuelle
            $event->setDeleted(new \DateTime());
            $entityManager->persist($event);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    
        return $this->json(['success' => 'Event marked as deleted successfully']);
    }

    /**
     * @Route("/api/update-event/{id}", name="update-event", methods={"PATCH"})
     */
    public function updateEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $eventData = json_decode($request->getContent(), true);
        $event = $entityManager->getRepository(Event::class)->find($id);

        if (!$event) {
            return $this->json(['error' => 'Event not found'], Response::HTTP_NOT_FOUND);
        }

        $event->setTitle($eventData['title']);
        $event->setDescription($eventData['description']);
        $event->setPrivacy($eventData['privacy']);
        $event->setLocation($eventData['location']);
        $event->setStartDate(new \DateTime($eventData['start_date']));
        $event->setEndDate(new \DateTime($eventData['end_date']));
        $event->setImage($eventData['image']);

        try {
            $entityManager->persist($event);
            $entityManager->flush();
        } catch (\Exception $e) {
            return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        return $this->json(['success' => 'Event updated successfully']);
    }

    /**
     * @Route("/register-event", name="register-event", methods={"POST"})
     */
    public function registerEvent(Request $request, EntityManagerInterface $entityManager, MailerInterface $mailer): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];
        $eventId = $data['event'];
        $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
        $event = $entityManager->getRepository(Event::class)->find($eventId);

        if (!$existingUser) {
            // Création d'un utilisateur fictif
            $user = new User();
            $user->setEmail($email);
            $user->setPassword('default_password');
            $user->setFirstName('Default');
            $user->setLastName('User');
            $user->setRoles(['ROLE_EMAIL']);
            $entityManager->persist($user);
            
            $eventUser = new UserEvent();
            $eventUser->setToken(bin2hex(random_bytes(32)));
            $eventUser->setEvent($event);
            $eventUser->setUser($user);
            $eventUser->setValidation(false);    
            $entityManager->persist($eventUser);  
            $entityManager->flush();
            
            $email = (new Email())
                ->from('your_email@example.com')
                ->to($user->getEmail())
                ->subject('Confirmation d\'inscription à un événement')
                ->html('<p>Vous vous êtes inscrit à l\'événement ' . $event->getTitle() . ' sur notre site. Pour confirmer votre inscription, veuillez cliquer sur le bouton ci-dessous.</p>
                        <a href="https://localhost:3000/confirm-registration?token=' . $eventUser->getToken() . '">
                            <button>Confirmer l\'inscription</button>
                        </a>
                        Si vous souhaitez vous désinscrire de l\'événement, cliquez sur le bouton ci-dessous.
                            <a href="https://localhost:3000/remove-registration?token=' . $eventUser->getToken() . '">
                                <button>Se désinscrire de l\'event</button>
                            </a>');

                $mailer->send($email);
        } else {
            $existingEventUser = $entityManager->getRepository(UserEvent::class)->findOneBy(['event' => $event, 'user' => $existingUser]);
            if($existingEventUser) {
                if ($existingEventUser->isValidation() === true) {
                    return $this->json(['error' => 'Vous êtes déjà inscrit à cet événement'], 400);
                } else {
                    $email = (new Email())
                    ->from('your_email@example.com')
                    ->to($existingUser->getEmail())
                    ->subject('Confirmation d\'inscription à un événement')
                    ->html('<p>Vous vous êtes inscrit à l\'événement ' . $event->getTitle() . ' sur notre site. Pour confirmer votre inscription, veuillez cliquer sur le bouton ci-dessous.</p>
                            <a href="https://localhost:3000/confirm-registration?token=' . $existingEventUser->getToken() . '">
                                <button>Confirmer l\'inscription</button>
                            </a>
                            Si vous souhaitez vous désinscrire de l\'événement, cliquez sur le bouton ci-dessous.
                            <a href="https://localhost:3000/remove-registration?token=' . $existingEventUser->getToken() . '">
                                <button>Se désinscrire de l\'event</button>
                            </a>');
    
                    $mailer->send($email);
                    return $this->json(['success' => 'Un email de confirmation a été envoyé à votre adresse email.'], 200);
                }
            }
            if (in_array('ROLE_EMAIL', $existingUser->getRoles())) {
                $eventUser = new UserEvent();
                $eventUser->setToken(bin2hex(random_bytes(32)));
                $eventUser->setEvent($event);
                $eventUser->setUser($existingUser);
                $eventUser->setValidation(false);
                $entityManager->persist($eventUser);  
                $entityManager->flush();
                
                $email = (new Email())
                ->from('your_email@example.com')
                ->to($existingUser->getEmail())
                ->subject('Confirmation d\'inscription à un événement')
                ->html('<p>Vous vous êtes inscrit à l\'événement ' . $event->getTitle() . ' sur notre site. Pour confirmer votre inscription, veuillez cliquer sur le bouton ci-dessous.</p>
                        <a href="https://localhost:3000/confirm-registration?token=' . $eventUser->getToken() . '">
                            <button>Confirmer l\'inscription</button>
                        </a>
                        Si vous souhaitez vous désinscrire de l\'événement, cliquez sur le bouton ci-dessous.
                            <a href="https://localhost:3000/remove-registration?token=' . $eventUser->getToken() . '">
                                <button>Se désinscrire de l\'event</button>
                            </a>');

                $mailer->send($email);
            } else {
                return $this->json(['error' => 'Vous possédez déjà un compte sur notre application, veuillez vous connecter pour vous inscrire à cet événement.'], 400);
            }
        }

        return $this->json(['status' => 'success']);
    }

    /**
     * @Route("/confirm-registration", name="confirm-registration", methods={"POST"})
     */
    public function confirmRegistration(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $token = $data['token'];    
        $userEvent = $entityManager->getRepository(UserEvent::class)->findOneBy(['token' => $token]);

        if (!$userEvent) {
            return $this->json(['error' => 'Invalid token'], 400);
        }

        if ($userEvent->isValidation() === true) {
            return $this->json(['error' => 'Inscription déjà validée'], 400);
        }

        $userEvent->setValidation(true);
        $entityManager->flush();

        return $this->json(['status' => 'success']);
    }

    /**
     * @Route("/remove-registration", name="remove-registration", methods={"POST"})
     */
    public function removeRegistration(Request $request, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $token = $data['token'];    
        $userEvent = $entityManager->getRepository(UserEvent::class)->findOneBy(['token' => $token]);

        if (!$userEvent) {
            return $this->json(['error' => 'Invalid token'], 400);
        }

        $entityManager->remove($userEvent);
        $entityManager->flush();

        return $this->json(['status' => 'success']);
    }

    /**
     * @Route("/verifyToken", name="verify-token", methods={"GET"})
     */
    public function verifyToken(Request $request, EventRepository $eventRepository): JsonResponse
    {
        $eventId = $request->query->get('eventId');
        $token = $request->query->get('token');

        if (!$eventId || !$token) {
            return new JsonResponse(['error' => 'Missing parameters'], 400);
        }

        $event = $eventRepository->find($eventId);

        if (!$event) {
            return new JsonResponse(['error' => 'Event not found'], 404);
        }

        // Assuming the event entity has a method getToken() to retrieve the token from the database
        $storedToken = $event->getToken();

        if ($storedToken !== $token) {
            return new JsonResponse(['error' => 'Invalid token'], 400);
        }

        return new JsonResponse(['status' => 'success', 'token' => $token], 200);
    }

}