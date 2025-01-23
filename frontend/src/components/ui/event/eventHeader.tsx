import {
  CalendarIcon,
  LocationOn,
  PeopleFill,
  LockOpenIcon,
  LockClosedIcon,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Event {
  title: string;
  privacy: boolean;
  startDate: string; // datetime string
  endDate: string; // datetime string
  location: string;
  image: string;
  participant_count: number; // Utiliser le nombre de participants directement
}

interface EventProps {
  event: Event;
}

export default function EventHeader({ event }: EventProps) {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
  
    // Obtenir directement les parties de la date
    const daysOfWeek = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];
    const months = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];

    const localTime = new Date(date.getTime() - date.getTimezoneOffset() * -60000);
  
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = localTime.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${dayOfWeek} ${day} ${month} ${year}, ${hours}h${minutes}`;
  };  

  return (
    <div className="flex w-full rounded-lg px-3 md:px-8 py-5 bg-gradient-to-b from-transparent from-45% to-primary min-h-72 md:min-h-fit relative overflow-hidden items-end md:bg-none md:bg-secondary text-primary-foreground md:text-secondary-foreground lg:h-full lg:items-start shadow-md">
      <Image
        src={`/uploads/event_pictures/${event.image}`}
        alt="Card"
        className="absolute z-[-10] w-full h-full left-0 top-0 object-cover rounded-lg md:hidden"
        width={200}
        height={150}
      />
      <div className="w-full flex flex-col mt-48 md:mt-0 gap-2 lg:justify-between lg:h-full">
        <div className="flex items-center md:items-start md:flex-col gap-2 mb-1">
          <h1 className="text-xl md:text-2xl font-bold">{event.title}</h1>
          <Button variant={event.privacy ? "public" : "private"} size="sm">
            {event.privacy ? "Public" : "Privé"}
            {event.privacy ? (
              <LockOpenIcon className="w-4 ml-2" />
            ) : (
              <LockClosedIcon className="w-4 ml-2" />
            )}
          </Button>
        </div>
        <div className="flex items-center gap-1.5 font-semibold">
          <CalendarIcon className="w-5 min-w-5" />
          <div>
            <p>
              Du {formatDateTime(event.startDate)}
              <br />
              au {formatDateTime(event.endDate)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-semibold">
          <LocationOn className="w-5 min-w-5" />
          <p>{event.location}</p>
        </div>
        <div className="flex items-center gap-1.5 font-semibold">
          <PeopleFill className="w-5 min-w-5" />
          <p>{event.participant_count} participant{event.participant_count <= 1 ? '' : 's'}</p>
        </div>
      </div>
    </div>
  );
}
