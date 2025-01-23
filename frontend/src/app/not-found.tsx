import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center flex-col'>
      <h1 className='text-7xl font-bold mb-4'>404</h1>
      <div className='md:grid grid-cols-2 gap-4 items-center justify-center'>
        <Image src="/calendar404.webp" alt='Illustration calendrier erreur 404' width={500} height={500} className='w-full'/>
        <div className='flex flex-col items-center justify-center gap-6'>
          <p className='text-2xl mb-4 text-center'>Oups la page que vous recherchez semble introuvable</p>
          <div className='flex gap-2 flex-wrap items-center justify-center'>
          <Link href="/">
            <Button>Retourner sur la page d'accueil</Button>
          </Link>
          <Link href="/search">
            <Button variant={"secondary"}>Rechercher un nouvel événement</Button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  )
}