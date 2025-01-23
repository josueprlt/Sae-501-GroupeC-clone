"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { removeRegistration } from "@/lib/event";
import { Close } from "@/components/ui/icons";

export default function RemoveRegistration() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            // Rediriger vers une autre page si le token n'est pas présent
            router.replace('/');
        }
    }, [searchParams, router]);

    const handleSubmit = async () => {
        const token = searchParams.get('token');
        if (token) {
            try {
                await removeRegistration(token);
                setIsSuccess(true);
                setPopupMessage("Désinscription réussie !");
            } catch (error: any) {
                if (error.message === 'Invalid token') {
                    setIsSuccess(false);
                    setPopupMessage("Erreur lors de la désinscription. Le token est invalide. Veuillez vérifier le lien de désinscription.");
                } else if (error.message) {
                    setIsSuccess(false);
                    setPopupMessage("Erreur lors de la désinscription. Veuillez réessayer plus tard.");
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
            <h1 className="text-base font-semibold text-center md:text-2xl">Désinscription à votre événement</h1>
            <Button onClick={handleSubmit}>Se désinscrire</Button>
            {popupMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-secondary p-6 rounded-lg shadow-lg w-96 flex gap-4 flex-col relative">
                    <Button onClick={closePopup}>
                        <span className="sr-only">Close menu</span>
                        <Close className="w-5"/>
                    </Button>
                        <h2 className="text-lg font-bold">{isSuccess ? "Inscription réussie" : "Erreur"}</h2>
                        <p>{popupMessage}</p>
                        <Button onClick={closePopup}>Fermer</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
