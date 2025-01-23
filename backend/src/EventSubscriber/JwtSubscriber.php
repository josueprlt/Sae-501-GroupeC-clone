<?php

namespace App\EventSubscriber;

use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ControllerEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpFoundation\RequestStack;
use App\Repository\UserRepository;

class JwtSubscriber implements EventSubscriberInterface
{
    private $jwtEncoder;
    private $requestStack;
    private $userRepository;

    public function __construct(JWTEncoderInterface $jwtEncoder, RequestStack $requestStack, UserRepository $userRepository)
    {
        $this->jwtEncoder = $jwtEncoder;
        $this->requestStack = $requestStack;
        $this->userRepository = $userRepository;
    }

    public function onKernelController(ControllerEvent $event)
    {
        $request = $this->requestStack->getCurrentRequest();
        $path = $request->getPathInfo();
        

        // Vérifier si /admin

        if (strpos($path, '/admin') !== 0) {
            return;
        }

        $token = $request->cookies->get('redirectImage');

        if (!$token) {
            throw new AccessDeniedHttpException('Token not found');
        }

        try {
            $data = $this->jwtEncoder->decode($token);
        } catch (\Exception $e) {
            throw new AccessDeniedHttpException('Invalid token');
        }

        $user = $this->userRepository->findOneBy(['email' => $data['username']]);

        if (!$user) {
            throw new AccessDeniedHttpException('User not found');
        }

        if ($user->getIsActive() != null) {
            return new JsonResponse(['error' => 'Account is not active'], 401);
        }

        if (!in_array('ROLE_ADMIN', $user->getRoles())) {
            throw new AccessDeniedHttpException('User is not an admin');
        }
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}