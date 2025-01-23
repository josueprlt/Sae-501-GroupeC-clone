<?php

namespace App\Repository;

use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Event>
 */
class EventRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Event::class);
    }


    public function countPublicAndPrivateEvents(): array
    {
        $qb = $this->createQueryBuilder('e')
            ->select('e.privacy, COUNT(e.id) as count')
            ->groupBy('e.privacy');

        $results = $qb->getQuery()->getResult();

        $data = [
            'public' => 0,
            'private' => 0,
        ];

        foreach ($results as $result) {
            if ($result['privacy']) {
                $data['public'] = $result['count'];
            } else {
                $data['private'] = $result['count'];
            }
        }

        return $data;
    }


//    /**
//     * @return Event[] Returns an array of Event objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('e.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Event
//    {
//        return $this->createQueryBuilder('e')
//            ->andWhere('e.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
