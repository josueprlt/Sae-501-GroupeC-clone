"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUser, deleteUserAccount } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  updateUserProfile,
  updateUserSettings,
  updateUserProfilePicture,
} from "@/lib/data";
import Image from "next/image";
import PageProfileSkeleton from "./loading";
import Filter from "@/components/ui/search/filter";
import { useSearchParams } from 'next/navigation';
import EventsTable from '@/components/ui/search/table';
import Pagination from '@/components/ui/search/pagination';
import { fetchUserSearchEvents } from "@/lib/data";
import { Raleway } from "next/font/google";
import Link from "next/link";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-raleway",
});

const ITEMS_PER_PAGE = 9;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [globalSuccess, setGlobalSuccess] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();

  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const data = await fetchUserSearchEvents(
      query,
      location,
      startDate,
      endDate,
      ITEMS_PER_PAGE,
      offset
    );
    if (data) {
      setEvents(data.events);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, query, location, startDate, endDate]);

  // Form input profile
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  // Form input settings
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordValidator, setNewPasswordValidator] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [success, setSuccess] = useState("");

  // Form input image
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorImage, setErrorImage] = useState("");
  const [successImage, setSuccessImage] = useState("");

  // Form input delete account
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const getUser = async () => {
    try {
      const userData = await fetchUser();
      setUser(userData);
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setAge(userData.age);
      setBio(userData.bio);
      setEmail(userData.email);
      setImage(userData.profile_pic);
    } catch (err) {
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <PageProfileSkeleton />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  // Fonction pour mettre à jour le profil utilisateur
  const handleEditProfile = async (e: any) => {
    e.preventDefault();
    try {
      await updateUserProfile(firstname, lastname, age, bio);
      setSuccess("Profil utilisateur mis à jour avec succès");
      getUser();
    } catch (err) {
      setError("Erreur lors de la mise à jour des informations utilisateur");
    }
  };

  // Fonction pour mettre à jour les paramètres utilisateur
  const handleEditSettings = async (e) => {
    e.preventDefault();
    if (newPassword !== newPasswordValidator) {
      setErrorPassword("Les nouveaux mots de passe ne correspondent pas");
      return;
    }
    setErrorPassword("");
    try {
      await updateUserSettings(email, password, newPassword);
      setSuccess("Paramètres utilisateur mis à jour avec succès");
      getUser();
    } catch (err) {
      setError("Erreur lors de la mise à jour des paramètres utilisateur");
    }
  };

  // Fonction pour mettre à jour l'image de profil
  const handleProfilePictureChange = (e) => {
    setSuccessImage("");
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePicture(file);
      setErrorImage("");
    } else {
      setProfilePicture(null);
      setErrorImage("Veuillez sélectionner une image valide");
    }
  };

  // Fonction pour mettre à jour l'image de profil
  const handleUploadProfilePicture = async (e) => {
    e.preventDefault();

    if (!profilePicture) {
      setErrorImage("Veuillez sélectionner une image");
      return;
    }

    // Delete previous image

    if (image) {
      try {
        const response = await fetch(`/api/upload/profile_pic?fileName=${image}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Erreur lors de la suppression de l'ancienne image");
        }
      } catch (err: any) {
        setErrorImage(err.message);
        return;
      }
    }

    const formData = new FormData();
    formData.append("file", profilePicture);

    try {
      const response = await fetch("/api/upload/profile_pic", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      const imageUrl = data.fileName;

      await updateUserProfilePicture(imageUrl);
      setSuccessImage("Image de profil mise à jour avec succès");
      getUser();
    } catch (err) {
      setErrorImage("Erreur lors de la mise à jour de l'image de profil");
    }
  };


  // Fonction pour supprimer le compte utilisateur
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteUserAccount(deletePassword);

      if (response.error) {
        if (response.error === 'Invalid password') {
          setDeleteError("Mot de passe incorrect. Veuillez vérifier votre mot de passe.");
        } else {
          setDeleteError(response.error);
        }
        return;
      }

      window.location.reload();
    } catch (err) {
      setDeleteError("Erreur lors de la suppression du compte. Veuillez vérifier votre mot de passe.");
    }
  };

  return (
    <>
      {globalSuccess && (
        <div className="col-span-4 text-green-500 text-center">
          {globalSuccess}
        </div>
      )}

      {/* Edit User Profile */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hover:bg-primary/70 mb-2 mr-2">
            Modifier le profil
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier mon profil</DialogTitle>
            <DialogDescription>
              Modifier les informations de votre profil utilisateur.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="firstname" className="text-right">
                Prénom
              </label>
              <Input
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="lastname" className="text-right">
                Nom
              </label>
              <Input
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="age" className="text-right">
                Âge
              </label>
              <Input
                id="age"
                value={age}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 0) {
                    setAge(value);
                  }
                }}
                className="col-span-3"
                type="number"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">
                Biographie
              </label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            {success && (
              <div className="col-span-4 text-green-500 text-start">
                {success}
              </div>
            )}
            <Button onClick={handleEditProfile}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Setting */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hover:bg-primary/70 mb-2 mr-2">
            Modifier les paramètres
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>Modifier mes paramètres</DialogTitle>
            <DialogDescription>
              Modifier les informations de connexion.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="password" className="text-right">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="newPassword" className="text-right">
                Nouveau mot de passe
              </label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="newPasswordValidator" className="text-right">
                Confirmer le nouveau mot de passe
              </label>
              <Input
                id="newPasswordValidator"
                type="password"
                value={newPasswordValidator}
                onChange={(e) => setNewPasswordValidator(e.target.value)}
                className="col-span-3"
              />
              {errorPassword && (
                <div className="col-span-4 text-red-500 text-start">
                  {errorPassword}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            {success && (
              <div className="col-span-4 text-green-500 text-center">
                {success}
              </div>
            )}
            <Button onClick={handleEditSettings}>Sauvegarder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Account */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" className="hover:bg-red-700 mb-2 mt-4">
            Supprimer mon compte
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Supprimer mon compte</DialogTitle>
            <DialogDescription>
              Veuillez entrer votre mot de passe pour confirmer la suppression de votre compte.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="deletePassword" className="text-right">
                Mot de passe
              </label>
              <Input
                id="deletePassword"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                className="col-span-3"
              />
              {deleteError && (
                <div className="col-span-4 text-red-500 text-start">
                  {deleteError}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Supprimer mon compte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Image */}
      <div className="flex w-full p-1.5 bg-secondary rounded-lg gap-2 md:gap-6 md:px-8 md:py-5 lg:h-full shadow-md">
        <Dialog>
          <DialogTrigger asChild>
            {/* <Button className="hover:bg-primary/70 mb-2">Modifier la photo de profil</Button> */}
            <div className="aspect-square w-32 md:w-64 hover:cursor-pointer  lg:order-2">
              <Image
                className="rounded-lg object-cover hover:opacity-75  h-full w-full"
                src={image ? `/uploads/profile_pictures/${image}` : "/img.webp"}
                alt={`Image de profil de ${firstname}`}
                width={200}
                height={200}
                priority
              />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[750px]">
            <DialogHeader>
              <DialogTitle>Modifier ma photo de profil</DialogTitle>
              <DialogDescription>
                Sélectionnez une nouvelle photo de profil.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="image" className="text-right">
                  Image de profil
                </label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleProfilePictureChange}
                  className="col-span-3"
                />
                {errorImage && (
                  <div className="col-span-4 text-red-500 text-start">
                    {errorImage}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              {successImage && (
                <div className="col-span-4 text-green-500 text-center">
                  {successImage}
                </div>
              )}
              <Button onClick={handleUploadProfilePicture}>Sauvegarder</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>



        <div className="flex flex-col overflow-hidden h-fit lg:h-full w-full">
          <h4 className="hidden md:block mt-2.5 mb-8 font-bold text-xl md:text-2xl">
            Mon Profil
          </h4>
          <div className="flex gap-11 mb-5 font-semibold">
            <p>
              {firstname} {lastname}
            </p>
            {age ? (
              <p className="mr-6">{age} ans</p>
            ) : (
              <p className="mr-6">Âge non renseigné</p>
            )}
          </div>
          <p className="hidden md:block font-semibold">Biographie :</p>
          <p className="line-clamp-3 md:line-clamp-none text-sm">
            {bio ? bio : "Pas de biographie"}
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mt-20 mb-10">
          <h2 className={`${raleway.className} text-base md:text-3xl`}>Mes événements créés</h2>
          <Link href="/event/create"><Button>Créer un événement</Button></Link>
        </div>
        <div className="w-full mt-10">
          <Filter variant="noCreator" />
          <EventsTable events={events} />
          <div className="mt-5 flex w-full justify-center items-start">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>
    </>
  );
}