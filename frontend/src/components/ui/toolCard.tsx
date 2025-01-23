import { Raleway } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';


const ralewayBold = Raleway({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-raleway',
});

const ralewayMedium = Raleway({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-raleway',
});

interface ToolCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
}

export function ToolCard({ id, title, description, icon, color, link }: ToolCardProps) {
  return (
    <li key={id}>
      <Link href={`${link}`} className={`${color} group flex justify-between items-center bg-white w-60 md:w-96 rounded-2xl shadow-md p-3.5 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden`}>
        <div className='w-full flex gap-6 flex-col'>
          <h2 className={`${ralewayBold.className} text-base md:text-2xl`}>{title}</h2>
          <p className={`${ralewayMedium.className} hidden md:block`}>{description}</p>
        </div>
        <Image className='relative h-min w-11 h-11 md:w-36 md:h-36' src={icon} alt="toolcard Icon" width={44} height={44} />
        <Image className='absolute top-28 -right-28 group-hover:top-6 group-hover:-right-0 md:top-36 md:-right-36 md:group-hover:top-10 md:group-hover:-right-6 opacity-20 w-11 h-11 md:w-36 md:h-36 ease-in-out duration-500' src={icon} alt="toolcard Icon" width={44} height={44} />
      </Link>
    </li>
  );
}