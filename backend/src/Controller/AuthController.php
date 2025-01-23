<?php

// src/Controller/AuthController.php

namespace App\Controller;

use App\Entity\User;
use App\Entity\UserEvent;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

class AuthController extends AbstractController
{
    private $entityManager;
    private $jwtManager;
    private $passwordEncoder;
    private $validator;

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

    // Méthode pour gérer l'enregistrement
public function register(Request $request): JsonResponse
{
    $data = json_decode($request->getContent(), true);
    
    // Vérifiez que l'email et le mot de passe sont fournis
    if (!isset($data['email'], $data['password'], $data['firstname'], $data['name'])) {
        return new JsonResponse(['error' => 'Tous les champs sont requis.'], 400);
    }

    // Vérifiez si l'utilisateur existe déjà
    $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
    if ($existingUser) {
        if (in_array('ROLE_EMAIL', $existingUser->getRoles())) {
            // Modifier les informations de l'utilisateur existant
            $existingUser->setPassword(password_hash($data['password'], PASSWORD_BCRYPT)); // Hashage du mot de passe
            $existingUser->setFirstname($data['firstname']);
            $existingUser->setLastname($data['name']);
            $existingUser->setRoles([]);
            $existingUser->setBio('Je m\'appelle ' . $existingUser->getFirstname() . ' ' . $existingUser->getLastname() . ', et je suis un utilisateur de l\'application.');
            $existingUser->setAge(0);

            // Mettre à jour les événements utilisateur relatifs à l'utilisateur
            $events = $this->entityManager->getRepository(UserEvent::class)->findBy(['user' => $existingUser]);
            foreach ($events as $event) {
                $event->setValidation(true);
            }

            $this->entityManager->persist($existingUser);
            $this->entityManager->flush();

            // Générer un token JWT pour l'utilisateur mis à jour
            $token = $this->jwtManager->create($existingUser);
            setcookie('redirectImage', $token, time() + 2592000, '/', 'localhost', true, true);

            return new JsonResponse(200);
        } else {
            return new JsonResponse(['error' => 'Cet email est déjà utilisé.'], 400);
        }
    }

    // Créer un nouvel utilisateur
    $user = new User();
    $user->setEmail($data['email']);
    $user->setPassword(password_hash($data['password'], PASSWORD_BCRYPT)); // Hashage du mot de passe
    $user->setFirstname($data['firstname']);
    $user->setLastname($data['name']);
    $user->setBio('Je m\'appelle ' . $user->getFirstname() . ' ' . $user->getLastname() . ', et je suis un utilisateur de l\'application.');
    $user->setAge(0);

    // Persister l'utilisateur
    $this->entityManager->persist($user);
    $this->entityManager->flush();

    $email = (new Email())
        ->from('your_email@example.com')
        ->to($data['email'])
        ->subject('Confirmation de la création de votre compte')
        ->html('<h1>Bonjour  ' . $data['firstname'] . ' !</h1> </br></br>
        <p>Nous vous confirmons que votre compte a bien été créé.</p></br>
        <p>Merci de la confiance que vous nous portez !</p>'
        );

    $this->mailer->send($email);

    // Générer un token JWT pour l'utilisateur nouvellement enregistré
    $token = $this->jwtManager->create($user);
    setcookie('redirectImage', $token, time() + 2592000, '/', 'localhost', true, true);

    return new JsonResponse(201);
}

    // Méthode pour gérer la connexion
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getUserRepository()->findOneBy(['email' => $data['email']]);

        if (!$user || !$this->passwordHasher->isPasswordValid($user, $data['password'], null)) {
            throw new BadCredentialsException('Invalid credentials');
        }

        if ($user->getIsActive() != null) {
            return new JsonResponse(['error' => 'Account is not active'], 401);
        }

        // Créer le token JWT
        $token = $this->jwtManager->create($user);
        setcookie('redirectImage', $token, time() + 2592000, '/', 'localhost', true, true);
        return new JsonResponse(200);
    }

    public function logout(): JsonResponse
    {
        setcookie('redirectImage', '', time() - 3600, '/', 'localhost', true, true);
        return new JsonResponse(200);
    }

    private function getUserRepository()
    {
        return $this->entityManager->getRepository(User::class);
    }

    public function logged(Request $request): JsonResponse
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

        // Retourner un tableau avec les propriétés nécessaires
        return new JsonResponse([
            'id' => $user->getId(),
            'firstname' => $user->getFirstname(),
            'lastname' => $user->getLastname(),
            'email' => $user->getEmail(),
            'age' => $user->getAge(),
            'bio' => $user->getBio(),
            'roles' => $user->getRoles(),
            'profile_pic' => $user->getProfilePicture()
        ]);

    }

    public function isAdmin(Request $request) {
        $token = $request->cookies->get('redirectImage');

        if (!$token) {
            return new JsonResponse(['error' => 'Token not found'], 401);
        }

        $data = $this->jwtEncoder->decode($token);
        $user = $this->getUserRepository()->findOneBy(['email' => $data['username']]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return new JsonResponse(['isAdmin' => true], 200);
        }

        return new JsonResponse(['isAdmin' => false], 401);
    }



    public function recoverPassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'];

        // Vérifier si l'utilisateur existe
        $user = $this->getUserRepository()->findOneBy(['email' => $email]);
        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], 404);
        }

        // Générer un token de réinitialisation de mot de passe
        $resetToken = $this->jwtManager->createFromPayload($user, [
            'purpose' => 'password_reset',
            'exp' => (new \DateTime('+1 hour'))->getTimestamp() // Token expire dans 1 heure
        ]);


        // Créer et persister l'entité PasswordToken
        $user->setPasswordToken($resetToken);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        // Créer le lien de réinitialisation de mot de passe
        $resetLink = 'https://localhost:3000/reset-password?token=' . $resetToken;


        // URL du logo
        $logoUrl = 'https://picsum.photos/200/300';

        // Corps de l'email
        $emailContent = '
            <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: black; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center;">
                        <img src="' . $logoUrl . '" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
                    </div>
                    <h2 style="color: #333333;">Réinitialisation de votre mot de passe</h2>
                    <h3>Bonjour ' . htmlspecialchars($user->getFirstname()) . ',</h3>
                    <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :</p>
                    <p style="text-align: center;">
                        <a href="' . $resetLink . '" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Réinitialiser le mot de passe</a>
                    </p>
                    <p>Si vous n\'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</p>
                    <p>Merci,</p>
                    <p>L\'équipe de l\'Agendary</p>
                </div>
            </body>
            </html>
        ';

        // Envoyer l'email
        $email = (new Email())
            ->from('your_email@example.com')
            ->to($user->getEmail())
            ->subject('Password Reset Request')
            ->html($emailContent);

        $this->mailer->send($email);

        return new JsonResponse(['message' => 'Password reset email sent'], 200);
    }

    public function validatePasswordToken(Request $request): JsonResponse
    {
        $token = $request->query->get('token');

        // Vérifier si le token est présent
        if (!$token) {
            return new JsonResponse(['error' => 'Token not provided'], 400);
        }

        try {
            // Décoder le token
            $data = $this->jwtEncoder->decode($token);

            // Vérifier si le token est valide et a le bon claim
            if (!$data || $data['purpose'] !== 'password_reset') {
                return new JsonResponse(['error' => 'Invalid or expired token'], 400);
            }

            // Rechercher l'utilisateur associé au token
            $user = $this->getUserRepository()->findOneBy(['email' => $data['username']]);
            if (!$user) {
                return new JsonResponse(['error' => 'User not found'], 404);
            }

            return new JsonResponse(['message' => 'Token is valid'], 200);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Invalid token format'], 400);
        }
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $token = $data['token'];
        $password = $data['password'];

        // Vérifier si le token est présent
        if (!$token) {
            return new JsonResponse(['error' => 'Token not provided'], 400);
        }

        try {
            // Décoder le token
            $data = $this->jwtEncoder->decode($token);
    
            // Vérifier si le token est valide et a le bon claim
            if (!$data || $data['purpose'] !== 'password_reset') {
                return new JsonResponse(['error' => 'Invalid or expired token'], 400);
            }
    
            // Récupérer l'utilisateur associé au token
            $user = $this->getUserRepository()->findOneBy(['email' => $data['username']]);
            if (!$user) {
                return new JsonResponse(['error' => 'User not found'], 404);
            }
    
            // Mettre à jour le mot de passe de l'utilisateur
            $user->setPassword($this->passwordHasher->hashPassword($user, $password));
            $this->entityManager->persist($user);
            $this->entityManager->flush();
    
            return new JsonResponse(['message' => 'Password updated successfully'], 200);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Invalid token format'], 400);
        }
    }

}