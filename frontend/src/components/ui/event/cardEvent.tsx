import { Raleway } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const ralewayBold = Raleway({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-raleway',
});

const ralewayMedium = Raleway({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-raleway',
});

interface CardProps {
  id: number;
  nom: string;
  lieu: string;
  startDate: string;
  endDate: string;
  img: string;
  index: number;
}

export function CardEvent({ nom, lieu, startDate, endDate, img, id, index }: CardProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <li key={index} className='w-full'>
      <Link href={`/event/${id}`} className='flex justify-between items-center bg-white h-32 md:w-full 4xl:w-[480px] rounded-3xl shadow-md cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden'>
        <section className='flex flex-col justify-between w-full h-full p-3.5 pr-0'>
          <div className='text-sm md:text-lg'>
            <p className={`${ralewayBold.className}`}>{nom}</p>
            <p className={`${ralewayMedium.className}`}>{lieu}</p>
          </div>
          <div className='flex gap-2 text-cardDate text-xs md:text-sm'>
            <img src="./calendar.svg" alt="calendar Icon" />
            <p className={`${ralewayMedium.className}`}>Du <strong>{formatDateTime(startDate)}</strong> Au <strong>{formatDateTime(endDate)}</strong></p>
          </div>
        </section>
        <section className='w-5/12 h-full sm:w-6/12'>
          <Image className='object-cover w-full h-full' src={`/uploads/event_pictures/${img}`} alt="Img évènement" width={200} height={150} />
        </section>
      </Link>
    </li>
  );
}