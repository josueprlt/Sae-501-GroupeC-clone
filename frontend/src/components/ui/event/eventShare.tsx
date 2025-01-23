"use client";

import { Instagram, Facebook, Whatsapp, Linkedin, Mail, LinkIcon } from '@/components/ui/icons';
import Link from 'next/link';
import { toast } from "sonner";

const EventShare = ({ handleShare, token, eventName }) => {
  const shareUrl = window.location.href;
  const shareText = token ? 
    `Viens rejoindre cet événement ! Voici la clé d'accès : ${token}` : 
    `Viens rejoindre cet événement !`;

  const mailSubject = eventName;
  const mailBody = token ? 
    `Viens rejoindre cet événement ! ${shareUrl}%0D%0A%0D%0AVoici la clé d'accès : ${token}` : 
    `${shareUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    toast('Lien copié dans le presse-papiers');
  };

  return (
    <div className='flex flex-col bg-secondary w-full lg:h-full rounded-lg p-1.5 md:px-8 md:py-5 w-fit hidden md:block shadow-md'>
      <h4 className='mt-2.5 mb-5 font-bold text-xl md:text-2xl'>Partager</h4>
      <div className='flex gap-12 justify-evenly'>
        <div className='pb-16 pt-10'>
          <p className='mb-8'>Via les réseaux</p>
          <ul className='flex gap-5 flex-wrap'>
            <li><Link href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer"><Instagram className="w-10" /></Link></li>
            <li><Link href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`} target="_blank" rel="noopener noreferrer"><Facebook className='w-10' /></Link></li>
            <li><Link href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer"><Whatsapp className='w-10' /></Link></li>
            <li><Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} target="_blank" rel="noopener noreferrer"><Linkedin className='w-10' /></Link></li>
          </ul>
        </div>
        <span className='w-px bg-border'></span>
        <div className='pb-16 pt-10'>
          <p className='mb-8'>Autres</p>
          <ul className='flex gap-5'>
            <li><Link href={`mailto:?subject=${mailSubject}&body=${mailBody}`} target="_blank" rel="noopener noreferrer"><Mail className="w-10" /></Link></li>
            <li><Link href="#" onClick={copyToClipboard}><LinkIcon className='w-10' /></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventShare;