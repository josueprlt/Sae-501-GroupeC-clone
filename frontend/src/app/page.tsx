"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Agbalumo, Raleway } from "next/font/google";
import { ToolCard } from "@/components/ui/toolCard";
import { CardEvent } from "@/components/ui/event/cardEvent";
import { CardEventSkeleton } from "@/components/ui/event/cardEventSkeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchHighlightedEvents } from "@/lib/event";
import { fetchUser } from "@/lib/data";
import { Suspense } from 'react';

const agbalumo = Agbalumo({
  subsets: ["latin"],
  variable: "--font-test",
  weight: "400",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-raleway",
});

let toolCards = [
  {
    title: "Recherchez un événement",
    description: "Trouvez ce qui vous convient !",
    icon: "./research-red.svg",
    color: "text-cardResearchPrimary",
    link: "/search"
  },
  {
    title: "Créez un nouvel événement",
    description: "Faisons de nouvelles choses, ensemble.",
    icon: "./plus-blue.svg",
    color: "text-cardCreatePrimary",
    link: "/event/create"
  },
];

export default function Home() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataEvents = await fetchHighlightedEvents();
      setHighlights(dataEvents);
      setLoading(false);
    };
    fetchData();

    const fetchUserData = async () => {
      const userData = await fetchUser();
      setUser(userData);
    };
    fetchUserData();
  }, []);

  return (
    <div className="">
      <div className="relative flex flex-col items-center p-24 rounded-lg">
        <Image
          src="/bgToolCards.webp"
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className="z-[-1] rounded-2xl"
          priority
        />
        <h1
          className={`${agbalumo.className} text-3xl md:text-4xl pb-14 text-center text-secondary`}
        >
          L'Art de Planifier !
        </h1>
        <ul className="flex items-center flex-wrap justify-center gap-5">
          {toolCards.map((toolcard, index) => (
            <ToolCard
              key={index}
              id={index + 1}
              title={toolcard.title}
              description={toolcard.description}
              icon={toolcard.icon}
              color={toolcard.color}
              link={toolcard.link}
            />
          ))}
        </ul>
      </div>

      <h2
        className={`${raleway.className} text-base text-center md:text-3xl mt-20 mb-10`}
      >
        Evénements publics les plus populaires !
      </h2>
      {highlights.length > 0 ? (
        <>
          <ul className="flex items-center gap-5 flex-col lg:grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
            {!loading && (
              highlights.map((card, index) => (
                <CardEvent
                  id={card.id}
                  nom={card.title}
                  lieu={card.location}
                  startDate={card.start_date}
                  endDate={card.end_date}
                  img={card.image}
                  index={index}
                />
              ))
            )}
          </ul>
        </>
      ) : (
        <>
          {loading ? (
            <ul className="flex items-center gap-5 flex-col lg:grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <CardEventSkeleton key={index} />
              ))}
            </ul>
          ) : (
            <p className="text-center">Il n'y a pas d'évènements populaires pour le moment...</p>
          )}
        </>
      )}
      <div className="text-center">
        <Link href="/search"><Button className="mt-10">Voir Plus</Button></Link>
      </div>

      <h2
        className={`${raleway.className} text-base text-center md:text-3xl mt-20 mb-10`}
      >
        A propos de nous
      </h2>
      <section className="w-full flex justify-center">
        <div className="flex flex-col gap-5 text-sm lg:text-base lg:flex-row-reverse">
          <Image
            className="object-cover rounded-md w-full lg:w-6/12"
            src="/teams.jpg"
            alt="Image teams"
            width={500}
            height={500}
          />
          <div className="flex flex-col justify-center gap-5 md:w-full lg:w-6/12 sm:text-sm md:text-base">
            <p>
              <span className={`${agbalumo.className}`}>L'agendary</span> est
              une application conviviale qui permet à chacun de créer un
              événement en seulement quelques secondes. Que vous souhaitiez
              organiser une fête d'anniversaire intime, une grande convention,
              ou un événement culturel d'envergure, L'Agendary vous facilite la
              tâche.
            </p>
            <p>
              Avec L'Agendary, vous avez la possibilité de rendre votre événement
              privé, accessible uniquement aux personnes que vous invitez, ou
              public, ouvert à toute la communauté des utilisateurs. Cela vous
              donne un contrôle total sur qui peut voir et participer à vos
              événements.
            </p>
            <p>
              Peu importe le type d'événement – qu'il s'agisse d'une réunion de
              famille, d'une rencontre professionnelle ou d'un concert – vous
              pouvez non seulement le créer, mais aussi y participer facilement
              grâce à une interface intuitive et rapide.
            </p>
            <p>
              Créez, partagez et rejoignez les événements qui vous passionnent
              avec L'Agendary, et ne manquez jamais une occasion de vous divertir
              ou de vous connecter avec les autres!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}