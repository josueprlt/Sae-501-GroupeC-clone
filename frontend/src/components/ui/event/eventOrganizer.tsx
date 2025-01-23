import Link from 'next/link';
import Image from 'next/image';

interface Organisateur {
  firstname: string;
  lastname: string;
  age: number;
  bio: string;
  profilePicture: string;
}

interface EventOrganizerProps {
  organisateur: Organisateur;
}

export default function EventOrganizer({ organisateur }: EventOrganizerProps) {

  return (
    <div className="flex w-full p-1.5 bg-secondary rounded-lg gap-2 md:gap-6 md:px-8 md:py-5 lg:h-full shadow-md">
      <div className="aspect-square w-32 md:w-auto lg:order-2">
        <Image
          className="rounded-lg object-cover h-32 w-32 md:h-52 md:w-52"
          src={organisateur.profilePicture ? `/uploads/profile_pictures/${organisateur.profilePicture}` : "/img.webp"} 
          alt={`Image de profil de ${organisateur.firstname + ' ' + organisateur.lastname}`}
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col overflow-hidden h-fit lg:h-full w-full">
        <h4 className="hidden md:block mt-2.5 mb-8 font-bold text-xl md:text-2xl">
          Organisateur
        </h4>
        <div className="flex gap-11 mb-5 font-semibold">
          <p>{organisateur.firstname + ' ' + organisateur.lastname}</p>
          <p className="mr-6">
          {organisateur.age ? (
            `${organisateur.age} ans`
          ) : (
            'Âge non connu'
          )}
          </p>
        </div>
        <p className="hidden md:block font-semibold">Bio :</p>
        <p className="line-clamp-3 md:line-clamp-none text-sm">
          { organisateur.bio ? ( organisateur.bio ) : ( 'Pas de biographie' ) }
        </p>
      </div>
    </div>
  );
}
