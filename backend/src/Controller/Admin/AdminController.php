<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\UX\Chartjs\Builder\ChartBuilderInterface;
use Symfony\UX\Chartjs\Model\Chart;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\User;
use App\Entity\Event;

use App\Repository\EventRepository;
use App\Repository\UserRepository;

class AdminController extends AbstractDashboardController
{

    private $eventRepository;
    private $userRepository;

    public function __construct(UserRepository $userRepository, EventRepository $eventRepository)
    {
        $this->eventRepository = $eventRepository;
        $this->userRepository = $userRepository;
    }

    #[Route('/admin')]
    public function dashboard(Request $request)
    {
        $eventCounts = $this->eventRepository->countPublicAndPrivateEvents();

        $users = $this->userRepository->findAll();

        $ageRanges = [
            'under_18' => 0,
            '18_24' => 0,
            '25_34' => 0,
            '35_44' => 0,
            'above_45' => 0,
        ];

        foreach ($users as $user) {

            $age = $user->getAge();

            if ($age === null) {
                continue;
            }

            if ($age < 18 && $age > 0) {
                $ageRanges['under_18']++;
            } elseif ($age >= 18 && $age <= 24) {
                $ageRanges['18_24']++;
            } elseif ($age >= 25 && $age <= 34) {
                $ageRanges['25_34']++;
            } elseif ($age >= 35 && $age <= 44) {
                $ageRanges['35_44']++;
            } elseif ($age >= 45) {
                $ageRanges['above_45']++;
            }
        }
        

        return $this->render('admin/dashboard.html.twig', [
            'eventCounts' => $eventCounts,
            'ageRanges' => $ageRanges,


        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('App');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home', 'dashboard');
        yield MenuItem::linkToCrud('User', 'fas fa-list', User::class);
        yield MenuItem::linkToCrud('Event', 'fas fa-list', Event::class);
    }
}
