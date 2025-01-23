'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import EventHeader from "@/components/ui/event/eventHeader";
import EventOrganizer from "@/components/ui/event/eventOrganizer";
import EventDescription from "@/components/ui/event/eventDescription";
import EventShare from "@/components/ui/event/eventShare";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LockOpenIcon, LockClosedIcon, Close, DeleteIcon, ModifyIcon, PlusCircle } from "@/components/ui/icons";
import { FormElement } from "@/components/ui/form/formElement";
import { fetchEvent, updateEvent, joinEvent, isUserRegistered, leaveEvent, deleteEvent, createEventRegistration, verifyToken } from "@/lib/event";
import { toast } from "sonner";
import { fetchUser } from "@/lib/data";
import PageEventSkeleton from "./loading";
import NotFound from "@/app/not-found";
import Image from "next/image";


export default function Event({ params }) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [etat, setEtat] = useState(null);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endHour, setEndHour] = useState("");
  const [image, setImage] = useState("");
  const [inputImage, setInputImage] = useState(null);

  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [spinnerActive, setSpinnerActive] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [isTokenValid, setIsTokenValid] = useState(false);

  const handleAccess = () => {
    setIsTokenValid(false);
  };

  useEffect(() => {
    if (!params?.id) return;

    const fetchData = async () => {
      try {
        const currentUser = await fetchUser();
        setUser(currentUser);

        if (currentUser) {
          const registered = await isUserRegistered(params.id);
          setIsRegistered(registered.isRegistered);
          if (!registered.isRegistered) {
            handleAccess();
          } else {
            setIsTokenValid(true);
          }
        } else {
          handleAccess();
        }

        const eventData = await fetchEvent(params.id);
        setEvent(eventData);

        // Pre-fill form with existing event data
        setId(eventData.id);
        setTitle(eventData.title);
        setDescription(eventData.description);
        setLocation(eventData.location);
        setEtat(eventData.privacy);
        const { formattedDate: startDate, formattedTime: startHourForm } = extractDateAndTime(eventData.startDate);
        const { formattedDate: endDate, formattedTime: endHourform } = extractDateAndTime(eventData.endDate);
        setStartDate(startDate);
        setStartHour(startHourForm);
        setEndDate(endDate);
        setEndHour(endHourform);
        setImage(eventData.image);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    const verifyAccessToken = async (token) => {
      try {
        const response = await verifyToken(params.id, token);
        if (response.status === 'success') {
          setIsTokenValid(true);
          await fetchData();
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error("Invalid access token:", error);
        setErrorMessage('Invalid access key. Please try again.');
      }
    };

    const fetchEventData = async () => {
      const eventData = await fetchEvent(params.id);
      setEvent(eventData);

      const token = searchParams.get('accessKey');

      if (eventData?.privacy === false) {
        setIsTokenValid(true);
        console.log("Event is public, token is valid");
        fetchData();
      } else if (!user && token) {
        verifyAccessToken(token);
      } else {
        fetchData();
      }
    };

    fetchEventData();
  }, [params?.id]);

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormEmail(value);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleSubmit = async (e) => {
    if (!spinnerActive) {
      e.preventDefault();
      setSpinnerActive(true);
      const updatedForm = {
        email: formEmail,
        event: event.id,
      };

      try {
        await createEventRegistration(updatedForm.email, updatedForm.event);
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        setSpinnerActive(false);
      } catch (error) {
        console.error("Erreur lors de l'inscription à l'événement :", error);
        setErrorMessage("Erreur lors de l'inscription à l'événement. Veuillez réessayer.");
        setSpinnerActive(false);
      }
    }
  };

  const handleShare = async () => {
    try {
      const eventData = await fetchEvent(params.id);
      const token = eventData.privacy ? eventData.token : null;

      const shareText = token ? 
        `Viens rejoindre cet événement ! Voici la clé d'accès : ${token}` : 
        `Viens rejoindre cet événement !`;

      if (navigator.share) {
        navigator.share({
          title: eventData.title,
          text: shareText,
          url: window.location.href,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        alert('Web Share API is not supported in your browser.');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token :", error);
    }
  };

  const handleJoinEvent = async () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      if (event) {
        try {
          const response = await joinEvent(event.id);
          toast(`Vous avez rejoint l'événement ${event.title}`);
          setIsRegistered(true);
          setEvent((prevEvent) => ({
            ...prevEvent,
            userEvents: prevEvent.userEvents ? [...prevEvent.userEvents, user.id] : [user.id],
            participant_count: prevEvent.participant_count + 1,
          }));
          await upEvent();
        } catch (error) {
          toast(`Erreur lors de l'inscription à l'événement ${event.title}`);
        }
      }
    }
  };

  const handleLeaveEvent = async () => {
    if (event) {
      try {
        const response = await leaveEvent(event.id);
        toast(`Vous avez quitté l'événement ${event.title}`);
        setIsRegistered(false);
        setEvent((prevEvent) => ({
          ...prevEvent,
          userEvents: prevEvent.userEvents ? prevEvent.userEvents.filter((userId) => userId !== user.id) : [],
          participant_count: prevEvent.participant_count - 1,
        }));
        await upEvent();
      } catch (error) {
        toast(`Erreur lors de la désinscription de l'événement ${event.title}`);
      }
    }
  };

  const handleDeleteEvent = async () => {
    if (event) {
      try {
        const response = await deleteEvent(event.id);
        toast(`Vous avez supprimé l'événement ${event.title}`);
        router.push("/");
      } catch (error) {
        toast(`Erreur lors de la suppression de l'événement ${event.title}`);
      }
    }
  };

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

  // Fonction pour mettre à jour l'image de l'event
  const handleInputImage = (file: any) => {
    if (file && file.type.startsWith("image/")) {
      setInputImage(file);
      setError("");

    } else {
      setInputImage(null);
      setError("Veuillez sélectionner une image valide");
    }
  };

  const upEvent = async () => {
    const dataEvents = await fetchEvent(params.id);
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

    const startHourInt = parseInt(startHour.split(":")[0], 10);
    const startMinutesInt = parseInt(startHour.split(":")[1], 10);

    const endHourInt = parseInt(endHour.split(":")[0], 10);
    const endMinutesInt = parseInt(endHour.split(":")[1], 10);

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


    if (inputImage != null ) {
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
        console.log(data);
      } catch (err) {
        setError("Erreur lors de la mise à jour de l'image de l'event");
        return;
      }
    }

    try {
      await updateEvent(id, title, description, location, etat, combinedStartDateTime, combinedEndDateTime, newImage);
      upEvent();
      setSuccess("Evènement mis à jour avec succès !");
    } catch (err) {
      console.log(err);
      setError("Erreur lors de la mise à jour des informations de l'évènement");
    }
  };

  const handleSubmitToken = async (event: React.FormEvent) => {
    event.preventDefault();
    setSpinnerActive(true);
    setErrorMessage('');

    try {
      const response = await verifyToken(params.id, accessKey);
      if (response.status === 'success') {
        setIsTokenValid(true);
        await upEvent();
      } else {
        setErrorMessage('Invalid access key. Please try again.');
        setSpinnerActive(false);
      }
    } catch (error) {
      setErrorMessage('Invalid access key. Please try again.');
      setSpinnerActive(false);
    }
  };

  return (
    <>
      {isTokenValid || (event && event.privacy === true) ? (
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-7">
          <Image
            src={`/uploads/event_pictures/${event.image}`}
            alt="Card"
            className="rounded-lg hidden object-cover md:block w-full col-span-7 h-96 shadow-md"
            width={500}
            height={300}
          />
        
          <div className="lg:col-span-3">
            <EventHeader event={event} />
          </div>
          <div className="lg:col-span-4">
            <EventOrganizer organisateur={event.creator} />
          </div>
          <div className="lg:col-span-3 xl:col-span-4">
            <EventDescription description={event.description} />
          </div>
          <div className="lg:col-span-4 xl:col-span-3">
            <EventShare handleShare={handleShare} token={event?.privacy == false ? event.token : null} />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 lg:col-span-7">
            <Button className="md:hidden" size={"lg"} onClick={handleShare}>
              Partager
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-xs">
          <div className="flex mt-4 w-full max-w-[700px] gap-4">
          <Link href="/register">
              <Button size="default" className="w-full">S'enregistrer</Button>
            </Link>
            <Link href="/login">
              <Button size="default" className="w-full">Connexion</Button>
            </Link>
          </div>
          <div className="flex justify-center items-flex-start flex-col shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:p-8 w-full max-w-[700px]">
            <h2 className="text-base md:text-lg text-start mt-5">
              Vous n'avez pas accès à cet événement,<br /> veuillez entrer la clé d'accès pour y participer.
            </h2>
      
            <form onSubmit={handleSubmitToken} className="flex flex-col items-center mt-5 w-full">
              <Input
                id="access"
                placeholder="Clé d'accès"
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                className="text-xs placeholder:text-FormBorder border-FormBorder md:text-base mb-4 w-full"
              />
              <Button size="default" className="w-full">
                {spinnerActive && (
                  <Image
                    width={20}
                    height={20}
                    className="animate-spin h-5 w-5 mr-3"
                    src="/spinner.svg"
                    alt="Spinner"
                  />
                )}
                Valider
              </Button>
            </form>
      
            {errorMessage && <p className="text-red-500 mt-2 text-center">{errorMessage}</p>}
          </div>
        </div>
      )}

      {(isTokenValid || (event && event.privacy === true)) && (
        <div className="sticky bottom-0 flex justify-center items-center gap-4 p-4">
          {!user || (user.id !== event.creator.id) ? (

            isRegistered ? (
              <Button
                variant="destructive"
                size="lg"
                onClick={handleLeaveEvent}
              >
                <Close className="w-6 h-6" />
              </Button>
            ) : (
              <Button
                variant="accent"
                size="lg"
                onClick={handleJoinEvent}
              >
                <PlusCircle className="w-6 h-6" />
              </Button>
            )
          ) : (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size={"lg"} className="hover:bg-primary/70">
                    <ModifyIcon className="w-6 h-6"/>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[650px]">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-center">Modifier l'événement</DialogTitle>
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
                      <label htmlFor="descrition" className="text-left">
                        Description
                      </label>
                      <Input
                        id="title"
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
                            id="etat"
                            type="radio"
                            name="etat"
                            className="col-span-3"
                            defaultChecked={!etat}
                            onChange={() => setEtat(false)}
                          />
                          <Button variant={"private"} size="sm">
                            Privé
                            <LockClosedIcon className="w-4 ml-2" />
                          </Button>
                        </div>
                        <div className="flex flex-row gap-1">
                          <input
                            id="etat"
                            type="radio"
                            name="etat"
                            className="col-span-3"
                            defaultChecked={etat}
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
                          name="startdate"
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
                          name="enddate"
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
                        <Image src={`/uploads/event_pictures/${image}`} alt="Image de couverture événement" className="w-32 h-32 rounded" width={512} height={512} />
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
                    <span className={`text-center pb-3 ${error == "" ? 'text-green-500' : 'text-red-500'}`}>{success}{error}</span>
                    <Button variant={"accent"} className="text-center md:mx-auto" onClick={handleEditEvent} size={"lg"}>Mettre à jour</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <AlertDialog>
                <AlertDialogTrigger><Button variant={"destructive"} size={"lg"}><DeleteIcon className="w-6 h-6"/></Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet événément ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action ne peut pas pas être annulée. Toutes les données associées à cet événement seront supprimées de manière permanente.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteEvent}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-secondary p-6 rounded-lg shadow-lg w-96 flex gap-4 flex-col relative">
            <Button onClick={closeModal} variant={"transparent"} size={"icon"} className="absolute top-2 right-2">
              <span className="sr-only">Close menu</span>
              <Close className="w-5" />
            </Button>
            <h2 className="text-lg font-bold ">Connexion à l'application</h2>
            <p className="">En vous connectant, vous pouvez vous inscrire à plusieurs événements et les suivre facilement.</p>
            <Link className="h-fit w-fit" href="/login"><Button>Se connecter</Button></Link>
            <hr />
            <h2 className="text-lg font-bold ">Inscription par email</h2>
            <p className="">Vous pouvez également vous inscrire avec votre adresse mail, sans connexion. Un email vous sera envoyé.</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <FormElement
                variant="input"
                type="email"
                placeholder="Entrez votre email"
                id="email"
                name="email"
                maxLength={255}
                required
                value={formEmail}
                onChange={handleInputChange}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="flex justify-end gap-2">
                <Button type="submit" variant="accent" className={spinnerActive ? 'disabled' : ''}>
                  <Image width={5} height={5} className={`animate-spin h-5 w-5 mr-3 ${spinnerActive ? '' : 'hidden'}`} src="/spinner-black.svg" alt="Spiner svg" />
                  S'inscrire
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-secondary p-6 rounded-lg shadow-lg w-96 flex gap-4 flex-col relative">
            <Button onClick={closeModal}>
              <span className="sr-only">Close menu</span>
              <Close className="w-5" />
            </Button>
            <h2 className="text-lg font-bold ">Inscription réussie</h2>
            <p className="">Votre inscription a bien été prise en compte, vous allez recevoir un mail de confirmation.</p>
            <Button onClick={closeSuccessModal}>Fermer</Button>
          </div>
        </div>
      )}
    </>
  );
}