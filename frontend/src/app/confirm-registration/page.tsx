"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { confirmRegistration } from "@/lib/event";
import { Close } from "@/components/ui/icons";

export default function ConfirmRegistration() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            // Rediriger vers la page d'accueil
            router.replace('/');
        }
    }, [searchParams, router]);

    const handleSubmit = async () => {
        const token = searchParams.get('token');
        if (token) {
            try {
                await confirmRegistration(token);
                setIsSuccess(true);
                setPopupMessage("Inscription réussie !");
                router.replace('/');
            } catch (error: any) {
                if (error.message === 'Inscription déjà validée') {
                    setIsSuccess(false);
                    setPopupMessage("Erreur lors de l'inscription. Votre inscription a déjà été confirmée.");
                } else if (error.message === 'Invalid token') {
                    setIsSuccess(false);
                    setPopupMessage("Erreur lors de l'inscription. Le token est invalide. Veuillez vérifier le lien d'inscription.");
                } else if (error.message) {
                    setIsSuccess(false);
                    setPopupMessage("Erreur lors de l'inscription. Veuillez réessayer plus tard.");
                } else {
                    setIsSuccess(false);
                    setPopupMessage("Erreur inconnue. Veuillez réessayer.");
                }
            }
        }
    };

    const closePopup = () => {
        setPopupMessage(null);
        setIsSuccess(null);
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-base font-semibold text-center md:text-2xl">Inscription à votre événement</h1>
            <Button onClick={handleSubmit}>Confirmer l'inscription</Button>
            {popupMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-secondary p-6 rounded-lg shadow-lg w-96 flex gap-4 flex-col relative">
                        <h2 className="text-lg font-bold">{isSuccess ? "Inscription réussie" : "Erreur"}</h2>
                        <p>{popupMessage}</p>
                        <Button onClick={closePopup}>Fermer</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
