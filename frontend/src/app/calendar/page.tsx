"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Agbalumo, Raleway } from "next/font/google";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchUser } from "@/lib/data";
import frLocale from '@fullcalendar/core/locales/fr';
import { fetchUserEvents } from "@/lib/data"; // Importez la nouvelle fonction
import Link from "next/link";
import { StarIcon, User, LockOpenIcon, LockClosedIcon, LocationOn, PeopleFill, PenIcon, EyeIcon } from "@/components/ui/icons";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchEvent, updateEvent } from "@/lib/event";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";

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

function Calendar({ events, user, viewOrModif, setViewOrModif, upEvent }: { events: any; user: any; viewOrModif: any; setViewOrModif: any; upEvent: any; }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="fr"
      locales={[frLocale]}
      headerToolbar={{
        left: 'prev,next today',
        center: isMobile ? '' : 'title', // Cache "center" en mode mobile
        right: isMobile ? '' : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      eventContent={RenderEventContent}
      events={events.map((event) => ({
        title: event.title,
        start: event.startDate.date,
        end: event.endDate.date,
        description: event.description,
        idEvent: event.id,
        image: event.image,
        location: event.location,
        participants: event.participant_count,
        privacy: event.privacy,
        creator: event.creator,
        userConnected: user.email,
        view: viewOrModif,
        setView: setViewOrModif,
        upEvent: upEvent,
      }))}
    />
  );
}


function extractDateAndTime(isoString) {
  const date = new Date(isoString);

  const localTime = new Date(date.getTime() - date.getTimezoneOffset() * -60000);

  const year = date.getFullYear();
  const month = String(localTime.getMonth() + 1).padStart(2, "0");
  const day = String(localTime.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const hours = String(localTime.getHours()).padStart(2, "0");
  const minutes = String(localTime.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return { formattedDate, formattedTime };
}


function RenderEventContent(eventInfo: any) {
  let titleEvent = eventInfo.event.title;
  let creatorEmail = eventInfo.event.extendedProps.creator;
  let userAuth = eventInfo.event.extendedProps.userConnected;
  let eventID = eventInfo.event.extendedProps.idEvent;

  let view = eventInfo.event.extendedProps.view;
  let setView = eventInfo.event.extendedProps.setView;
  let upEvent = eventInfo.event.extendedProps.upEvent; // Récupération de upEvent

  const handleView = () => {
    setView(!view);
    upEvent(eventID);
  }

  return (
    <Popover
      showArrow
      className={`flex flex-col p-2 w-full h-full items-start text-black bg-white border-b-4 drop-shadow-md rounded-md overflow-hidden ${creatorEmail === userAuth ? 'border-destructive' : 'border-blue-500'}`}
      placement="center"
    >
      <PopoverTrigger>
        <Button
          className={`flex flex-col p-2 w-full h-full items-center ${creatorEmail === userAuth ? 'bg-destructive hover:bg-destructive' : 'bg-blue-500 hover:bg-blue-500'}`}
        >
          <b className="text-white truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {titleEvent}
          </b>
          {creatorEmail === userAuth ? (
            <div className="flex items-center gap-2 pt-2">
              <StarIcon className="w-3 h-3 text-white" />
              <p className="text-white truncate w-full hidden lg:block overflow-hidden text-ellipsis whitespace-nowrap">
                Propriétaire
              </p>
            </div>
          ) : (
            <p className="pt-2 text-white truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {creatorEmail}
            </p>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px py">
          <InfoPopUp eventInfo={eventInfo} view={handleView} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

function InfoPopUp({ eventInfo, view }: { eventInfo: any; view: any; }) {
  let titleEvent = eventInfo.event.title;
  let creatorEmail = eventInfo.event.extendedProps.creator;
  let userAuth = eventInfo.event.extendedProps.userConnected;

  return (
    <>
      <div className="w-full h-28 overflow-hidden rounded-lg">
        <Image
          src={`/uploads/event_pictures/${eventInfo.event.extendedProps.image}`}
          alt="Card"
          className="w-full h-full object-cover"
          width={200}
          height={150}
        />
      </div>
      <h3 className="text-small font-bold mt-3">
        {titleEvent}
      </h3>
      <div className="text-tiny mt-3 w-60">{eventInfo.event.extendedProps.description}</div>
      <div className="flex flex-col gap mt-3 text-gray-600">
        <div className="flex items-center gap-2 px-2 py-1 mb-2 w-min bg-black text-white hover:bg-gray-800 rounded-lg">
          {eventInfo.event.extendedProps.privacy ? "Public" : "Privé"}
          {eventInfo.event.extendedProps.privacy ? (
            <LockOpenIcon className="w-4" />
          ) : (
            <LockClosedIcon className="w-4" />
          )}
        </div>
        <i className="flex gap-2 items-center">
          {creatorEmail === userAuth ? <StarIcon className="w-4 h-4" /> : <User className="w-4 h-4" />}
          {creatorEmail === userAuth ? 'Votre événement' : creatorEmail}
        </i>
        <i className="flex gap-2 items-center">
          <LocationOn className="w-4" />
          {eventInfo.event.extendedProps.location}
        </i>
        <i className="flex gap-2 items-center">
          <PeopleFill className="w-4" />
          {eventInfo.event.extendedProps.participants} participant{eventInfo.event.extendedProps.participants <= 1 ? '' : 's'}
        </i>
      </div>

      <div className="flex items-start gap-2 mt-4">
        <Link target="_blank" href={`event/${eventInfo.event.extendedProps.idEvent}`} className="bg-black text-white hover:bg-gray-700 px-4 py-2 rounded-md">
          <EyeIcon className="w-5 h-5" />
        </Link>

        {creatorEmail === userAuth && (
          <Button size="default" className="bg-black text-white hover:bg-gray-700" onClick={view}>
            <PenIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
    </>
  );
}

function ModificationEvent({
  view,
  setView,
  title,
  setTitle,
  description,
  setDescription,
  etat,
  setEtat,
  location,
  setLocation,
  startDate,
  setStartDate,
  startHour,
  setStartHour,
  endDate,
  setEndDate,
  endHour,
  setEndHour,
  image,
  success,
  error,
  handleEditEvent,
  setInputImage,
  initialData
}: {
  view: any;
  setView: string | null;
  title: string | null;
  setTitle: any;
  description: string | null;
  setDescription: any;
  etat: boolean | null;
  setEtat: any;
  location: string | null;
  setLocation: any;
  startDate: string | null;
  setStartDate: any;
  startHour: string | null;
  setStartHour: any;
  endDate: string | null;
  setEndDate: any;
  endHour: string | null;
  setEndHour: any;
  image: string | null;
  success: string | null;
  error: string | null;
  handleEditEvent: any;
  setInputImage: any;
  initialData: any;
}) {
  // Synchronise les données initiales lorsque le composant est monté ou que `initialData` change
  useEffect(() => {
    if (initialData) {
      setEtat(initialData.etat || false);
    }
  }, [initialData, view]);

  return (
    <Dialog open={view} onOpenChange={setView}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Modifier l'évènement</DialogTitle>
        </DialogHeader>
        <div className="sm:px-10 px-0 h-[516px] overflow-y-scroll">
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="title" className="text-left">
              Titre de l’événement
            </label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="description" className="text-left">
              Description
            </label>
            <Input
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap mt-2">
            <label htmlFor="etat" className="text-left">
              Etat
            </label>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-1">
                <input
                  id="etat-private"
                  type="radio"
                  name="etat"
                  className="col-span-3"
                  checked={!etat}
                  onChange={() => setEtat(false)}
                />
                <Button variant={"private"} size="sm">
                  Privé
                  <LockClosedIcon className="w-4 ml-2" />
                </Button>
              </div>
              <div className="flex flex-row gap-1">
                <input
                  id="etat-public"
                  type="radio"
                  name="etat"
                  className="col-span-3"
                  checked={etat}
                  onChange={() => setEtat(true)}
                />
                <Button variant={"public"} size="sm">
                  Public
                  <LockOpenIcon className="w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="location" className="text-left">
              Lieu
            </label>
            <Input
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="startdate" className="text-left">
              Date de début
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="startdate"
                type="date"
                name="startdate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="col-span-3"
              />
              <Input
                id="starthour"
                type="time"
                name="starthour"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="enddate" className="text-left">
              Date de fin
            </label>
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="enddate"
                type="date"
                name="enddate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Input
                id="endhour"
                type="time"
                name="endhour"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="image" className="text-left">
              Image de couverture
            </label>
            {typeof image === "string" && (
              <img src={`/uploads/event_pictures/${image}`} alt="Image de couverture événement" className="w-32 h-32 rounded" />
            )}
            <Input
              id="image"
              name="image"
              type="file"
              className="col-span-3"
              onChange={(e) => setInputImage(e.target.files[0])}
            />
          </div>
        </div>
        <DialogFooter>
          <span className={`text-center pb-3 ${error === "" ? "text-green-500" : "text-red-500"}`}>
            {success}
            {error}
          </span>
          <Button
            variant={"accent"}
            className="text-center md:mx-auto"
            size={"lg"}
            onClick={handleEditEvent}
          >
            Mettre à jour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>("");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean | null>(true);
  const [viewOrModif, setViewOrModif] = useState<boolean | null>(false);

  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");
  const [etat, setEtat] = useState<any>(null);
  const [location, setLocation] = useState<string | null>("");
  const [startDate, setStartDate] = useState<string | null>("");
  const [startHour, setStartHour] = useState<string | null>("");
  const [endDate, setEndDate] = useState<string | null>("");
  const [endHour, setEndHour] = useState<string | null>("");
  const [image, setImage] = useState<string | null>("");
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>("");
  const [event, setEvent] = useState<any>(null);

  const upEvent = async (id) => {
    const dataEvents = await fetchEvent(id);
    setEvent(dataEvents);

    if (dataEvents) {
      const { formattedDate: startDate, formattedTime: startHourForm } = extractDateAndTime(dataEvents.startDate);
      const { formattedDate: endDate, formattedTime: endHourform } = extractDateAndTime(dataEvents.endDate);

      setId(dataEvents.id);
      setTitle(dataEvents.title);
      setDescription(dataEvents.description);
      setLocation(dataEvents.location);
      setEtat(dataEvents.privacy);
      setStartDate(startDate);
      setStartHour(startHourForm);
      setEndDate(endDate);
      setEndHour(endHourform);
      setImage(dataEvents.image);
    }

    setLoading(false);
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();

    const normalizeDateTime = (date, hour, minutes) => {
      let hours = parseInt(hour, 10);
      let mins = parseInt(minutes, 10);

      if (hours === 24) {
        hours = 0;
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        date = nextDay.toISOString().split("T")[0];
      }

      return `${date}T${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
    };

    const [startHourInt, startMinutesInt] = startHour.split(":").map(Number);
    const [endHourInt, endMinutesInt] = endHour.split(":").map(Number);


    const normalizedStart = normalizeDateTime(startDate, startHourInt + 1, startMinutesInt);
    const normalizedEnd = normalizeDateTime(endDate, endHourInt + 1, endMinutesInt);
    const combinedStartDateTime = new Date(normalizedStart).toISOString();
    const combinedEndDateTime = new Date(normalizedEnd).toISOString();

    setError("");
    setSuccess("");

    if (!title || !description || !location || !startDate || !startHour || !endDate || !endHour) {
      setError("Tous les champs doivent être remplis.");
      return;
    }
    if (new Date(combinedStartDateTime) >= new Date(combinedEndDateTime)) {
      setError("La date et l'heure de début doivent être avant la date et l'heure de fin.");
      return;
    }

    let newImage = image;


    if (inputImage != null) {
      try {
        const response = await fetch(`/api/upload/event_pic?fileName=${image}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Erreur lors de la suppression de l'ancienne image");
        }
      } catch (err: any) {
        setError(err.message);
        return;
      }

      const formData = new FormData();
      formData.append("file", inputImage);


      try {
        const response = await fetch("/api/upload/event_pic", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        newImage = data.fileName;
      } catch (err) {
        setError("Erreur lors de la mise à jour de l'image de l'event");
        return;
      }
    }

    try {
      await updateEvent(id, title, description, location, etat, combinedStartDateTime, combinedEndDateTime, newImage);
      upEvent(id);
      const updatedEvents = await fetchUserEvents();
      setEvents(updatedEvents); // Mettez à jour les événements pour FullCalendar
      setSuccess("Evènement mis à jour avec succès !");
    } catch (err) {
      setError("Erreur lors de la mise à jour des informations de l'évènement");
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);

        if (userData) {
          const userEvents = await fetchUserEvents();
          setEvents(userEvents); // Mettez à jour les événements
        }
      } catch (err) {
        setError("Erreur lors de la récupération de l'utilisateur :", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const eventProps = {
    handleEditEvent,
    id,
    setId,
    event,
    setEvent,
    title,
    setTitle,
    description,
    setDescription,
    etat,
    setEtat,
    location,
    setLocation,
    startDate,
    setStartDate,
    startHour,
    setStartHour,
    endDate,
    setEndDate,
    endHour,
    setEndHour,
    image,
    setImage,
    setInputImage,
    success,
    error
  };

  return (
    <div>
      {user ? (
        <>
          <Calendar events={events} user={user} viewOrModif={viewOrModif} setViewOrModif={setViewOrModif} upEvent={upEvent} />
          <ModificationEvent view={viewOrModif} setView={setViewOrModif} {...eventProps} />
        </>
      ) : (
        <>
          <p>Connectez-vous pour accéder à votre calendrier</p>
        </>
      )}

    </div>
  );
}