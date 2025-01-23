"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/data";

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const adminStatus = await isAdmin();
        if (adminStatus) {
          router.push("https://localhost:443/admin");
        } else {
          router.push("/?error=Vous n'avez pas les droits d'accès.");
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        router.push("/?error=Une erreur est survenue.");
      }
    };

    checkAdminStatus();
  }, [router]);

  return (
    <div>
      Vérification du statut administrateur...
    </div>
  );
}