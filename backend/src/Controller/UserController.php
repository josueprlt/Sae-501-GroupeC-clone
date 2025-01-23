<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use App\Entity\Event;
use App\Entity\UserEvent; // Ajoutez cet import
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;


class UserController extends AbstractController
{

    private $entityManager;
    private $jwtManager;
    private $passwordEncoder;
    private $validator;
    private $mailer;

    public function __construct(
        EntityManagerInterface $entityManager,
        JWTTokenManagerInterface $jwtManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator,
        JWTEncoderInterface $jwtEncoder,
        MailerInterface $mailer
    ) {
        $this->entityManager = $entityManager;
        $this->jwtManager = $jwtManager;
        $this->jwtEncoder = $jwtEncoder;
        $this->passwordHasher = $passwordHasher;
        $this->validator = $validator;
        $this->mailer = $mailer;
    }

    // Function to know if the user is logged
    public function isLogged(Request $request) 
    {
        // Récupérer le token depuis le cookie
        $token = $request->cookies->get('redirectImage');

        if (!$token) {
            return new JsonResponse(['error' => 'Token not found'], 401);
        }

        $data = $this->jwtEncoder->decode($token);
        $user = $this->getUserRepository()->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        if ($user->getIsActive() != null) {
            return new JsonResponse(['error' => 'Account is not active'], 401);
        }

        return $user;
    }

    // Function to get user repository
    private function getUserRepository()
    {
        return $this->entityManager->getRepository(User::class);
    }

    public function updateProfile(Request $request): Response
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['firstname'])) {
            $user->setFirstname($data['firstname']);
        }

        if (isset($data['lastname'])) {
            $user->setLastname($data['lastname']);
        }

        if (isset($data['age']) && is_int($data['age'])) {
            $user->setAge($data['age']);
        }
        else {
            return new JsonResponse(['error' => 'Invalid age'], 400);
        }

        if (isset($data['bio'])) {
            $user->setBio($data['bio']);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new JsonResponse(['message' => 'Profile updated successfully']);
    

    }

    public function updateSettings(Request $request): Response
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }

        if (isset($data['password']) && isset($data['newPassword'])) {
            if ($this->passwordHasher->isPasswordValid($user, $data['password'])) {
                $newPassword = $this->passwordHasher->hashPassword($user, $data['newPassword']);
                $user->setPassword($newPassword);

                $this->entityManager->persist($user);
                $this->entityManager->flush();

                return new JsonResponse(['message' => 'Profile updated successfully']);

            } else {
                return new JsonResponse(['error' => 'Invalid current password'], 400);
            }
        }

        return new JsonResponse(['error' => 'An error has occured'], 400);
    }


    public function updateImage(Request $request): Response
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }

        $data = json_decode($request->getContent(), true);
        $imageUrl = $data['imageUrl'] ?? null;

        if ($imageUrl) {
            $user->setProfilePicture($imageUrl);
            $this->entityManager->flush();
            return new JsonResponse(['success' => 'Profile picture updated successfully']);
        }

        return new JsonResponse(['error' => 'Invalid image URL'], 400);
    }


    public function deleteUser(Request $request): Response {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }

        $data = json_decode($request->getContent(), true);
        $password = $data['password'] ?? null;

        if (!$password || !$this->passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Invalid password'], 400);
        }

        $user->setIsActive(new \DateTime());

        // Supprimer les événements créés par l'utilisateur
        $createdEvents = $user->getCreatedEvents();
        foreach ($createdEvents as $event) {
            $event->setDeleted(new \DateTime());
            $users = $event->getUserEvents();
            foreach ($users as $user) {
                $user = $user->getUser();
                $email = (new Email())
                    ->from('your_email@example.com')
                    ->to($user->getEmail())
                    ->subject('Suppression d\'un événement auquel vous étiez inscrit')
                    ->html('
                        <p>Bonjour ' . $user->getFirstname() . ',</p>
                        <p>L\'événement "' . $event->getTitle() . '" auquel vous étiez inscrit a été supprimé.</p>
                        <p>Vous pouvez consulter les autres événements sur notre site.</p>
                    
                    ');

                $this->mailer->send($email);

                        
            }
            $this->entityManager->persist($event);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        // Supprimer le cookie contenant le token
        $response = new JsonResponse(['message' => 'User and their created events deleted successfully']);
        $response->headers->clearCookie('token');

        return $response;
    }

    /**
     * @Route("/api/unique-user-names", name="unique-user-names", methods={"GET"})
     */
    public function getUniqueUserNames(Request $request, EntityManagerInterface $entityManager): Response
    {
        $searchTerm = $request->query->get('q', '');

        $queryBuilder = $entityManager->getRepository(User::class)
            ->createQueryBuilder('u')
            ->select('u.firstname, COUNT(e.id) AS event_count')
            ->join(Event::class, 'e', 'WITH', 'e.creator = u.id AND e.privacy = 1')
            ->where('u.firstname LIKE :searchTerm')
            ->andWhere('e.deleted IS NULL')
            ->setParameter('searchTerm', '%' . $searchTerm . '%')
            ->groupBy('u.id')
            ->orderBy('event_count', 'DESC')
            ->setMaxResults(10);

        $userFirstNames = $queryBuilder->getQuery()->getResult();

        return $this->json($userFirstNames);
    }

    public function isUserRegisteredToEvent(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }

        $event = $entityManager->getRepository(Event::class)
                            ->createQueryBuilder('e')
                            ->leftJoin('e.userEvents', 'ue')
                            ->addSelect('ue')
                            ->where('e.id = :id')
                            ->setParameter('id', $id)
                            ->getQuery()
                            ->getOneOrNullResult();

        if (!$event) {
            return new JsonResponse(['error' => 'Event not found'], 404);
        }

        $isRegistered = false;

        // Vérifier si l'utilisateur est enregistré à l'événement
        foreach ($event->getUserEvents() as $userEvent) {
            if ($userEvent->getUser()->getId() === $user->getId()) {
                $isRegistered = true;
                break;
            }
        }

        return new JsonResponse(['isRegistered' => $isRegistered]);
    }

    /**
     * @Route("/api/user-events", name="user-events", methods={"GET"})
     */
    public function getUserEvents(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }
    
        // Récupérer les événements où l'utilisateur est inscrit
        $userEvents = $entityManager->getRepository(UserEvent::class)->createQueryBuilder('ue')
            ->join('ue.event', 'e')
            ->where('ue.user = :user')
            ->andWhere('e.deleted IS NULL')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    
        $events = array_map(fn($ue) => $ue->getEvent(), $userEvents);
    
        // Filtrer les informations spécifiques des événements
        $filteredEvents = array_map(function($event) {
            return [
                'id' => $event->getId(),
                'title' => $event->getTitle(),
                'startDate' => $event->getStartDate(),
                'endDate' => $event->getEndDate(),
                'privacy' => $event->isPrivacy(),
                'location' => $event->getLocation(),
                'creator' => $event->getCreator()->getEmail(),
                'description' => $event->getDescription(),
                'image' => $event->getImage(),
                'participant_count' => count($event->getUserEvents()) // Ajouter le nombre de participants
            ];
        }, $events);
    
        return new JsonResponse($filteredEvents);
    }

    /**
     * @Route("/api/user-unique-locations", name="user-unique-locations", methods={"GET"})
     */
    public function getUserUniqueLocations(Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }
    
        $searchTerm = $request->query->get('q', '');
    
        $queryBuilder = $entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->select('DISTINCT e.location, COUNT(e.id) AS event_count')
            ->where('e.creator = :user')
            ->andWhere('e.location LIKE :searchTerm')
            ->andWhere('e.deleted IS NULL')
            ->setParameter('user', $user)
            ->setParameter('searchTerm', '%' . $searchTerm . '%')
            ->groupBy('e.location')
            ->orderBy('event_count', 'DESC')
            ->setMaxResults(10);
    
        $locations = $queryBuilder->getQuery()->getResult();
    
        return $this->json($locations);
    }

    /**
     * @Route("/api/user-created-events", name="user-created-events", methods={"GET"})
     */
    public function getUserCreatedEvents(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->isLogged($request);
        if (!$user instanceof User) {
            return $user; // Retourne la réponse d'erreur de isLogged
        }
    
        $searchTerm = $request->query->get('q', null);
        $location = $request->query->get('location', null);
        $startDate = $request->query->get('startDate', null);
        $endDate = $request->query->get('endDate', null);
        $limit = $request->query->get('limit', 9);
        $offset = $request->query->get('offset', 0);
    
        $queryBuilder = $entityManager->getRepository(Event::class)
            ->createQueryBuilder('e')
            ->where('e.creator = :user')
            ->andWhere('e.deleted IS NULL')
            ->setParameter('user', $user);
    
        if ($searchTerm !== null) {
            $queryBuilder->andWhere('(e.title LIKE :searchTerm OR e.description LIKE :searchTerm)')
                ->setParameter('searchTerm', '%' . $searchTerm . '%');
        }
    
        if ($location !== null) {
            $queryBuilder->andWhere('e.location = :location')
                ->setParameter('location', $location);
        }
    
        if ($startDate !== null) {
            $queryBuilder->andWhere('e.startDate >= :startDate')
                ->setParameter('startDate', $startDate);
        }
    
        if ($endDate !== null) {
            $queryBuilder->andWhere('e.endDate <= :endDate')
                ->setParameter('endDate', $endDate);
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
    
        $filteredEvents = array_map(function($event) {
            return [
                'id' => $event->getId(),
                'title' => $event->getTitle(),
                'start_date' => $event->getStartDate()->format(\DateTime::ATOM),
                'end_date' => $event->getEndDate()->format(\DateTime::ATOM),
                'privacy' => $event->isPrivacy(),
                'location' => $event->getLocation(),
                'description' => $event->getDescription(),
                'image' => $event->getImage()
            ];
        }, $events);
    
        return new JsonResponse([
            'total' => $totalEvents,
            'events' => $filteredEvents
        ]);
    }

}
