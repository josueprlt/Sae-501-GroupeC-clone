"use client";

import { useState } from "react";
import { Raleway } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/login";
import Image from "next/image";
import { Logo } from "@/components/ui/logos";


const ralewaySemBold = Raleway({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-raleway",
});

const ralewayMedium = Raleway({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-raleway",
});

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [spinnerActive, setSpinnerActive] = useState(false);
  const router = useRouter(); // Pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinnerActive(true);
      await login(email, password, router);
    } catch (err) {
      setError(err.message);
    } finally {
      setSpinnerActive(false);
    }
  };

  let inputs = [
    {
      id: "email",
      name: "Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: "password",
      name: "Mot de passe",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  return (
    <div
      className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}
    >
      <Link href="/">
        <Logo className="w-40"/>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:p-8"
      >
        <h2
          className={`${ralewaySemBold.className} text-base md:text-3xl md:text-center`}
        >
          Se connecter
        </h2>

        <div className="w-full lg:w-96">
          {inputs.map((input) => (
            <div key={input.id} className="mt-3 flex flex-col gap-1">
              <label className="text-xs md:text-base" htmlFor={input.id}>
                {input.name}
              </label>
              <Input
                id={input.id}
                placeholder={input.name}
                type={input.type}
                value={input.value}
                onChange={input.onChange} // Gère les changements
                className="text-xs placeholder:text-FormBorder border-FormBorder md:text-base"
              />
              {input.id === "password" && (
                <Link
                  href="/forgot-password"
                  className="text-cardDate text-sm text-right hover:underline hover:underline-offset-2 transition-transform"
                >
                  Mot de passe oublié
                </Link>
              )}
            </div>
          ))}

          {/* Afficher un message d'erreur si nécessaire */}
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}

          <div className="flex justify-center flex-col">
            <Button size="default" className="mt-4 mx-auto">
              <Image width={5} height={5} className={`animate-spin h-5 w-5 mr-3 ${spinnerActive ? '' : 'hidden'}`} src="./spinner.svg" alt="Spiner svg" />
              Se connecter
            </Button>
            <Link
              className="text-center mt-3 hover:underline hover:underline-offset-2 transition-transform md:text-sm"
              href="/register"
            >
              Pas encore de compte ? S'inscrire
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
