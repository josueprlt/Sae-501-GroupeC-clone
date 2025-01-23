"use client";

import { useState } from "react";
import { Raleway } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { sendRecoverPassword } from "@/lib/login";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  let inputs = [
    {
      id: "email",
      name: "Email",
      type: "email",
      value: email,
      onChange: (e: any) => setEmail(e.target.value),
    },
  ];



  const handlerRecoverEmail = async (e: any) => {
    e.preventDefault();
    console.log(email);
    try {
      await sendRecoverPassword(email);
      setError("");
      setSuccess("Un email de réinitialisation vous a été envoyé");

    } catch (error: any) {
      setSuccess("");
      setError(error.message);
    }
  };


  return (
    <div
      className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}
    >
      <Link href="/">
        <img className="w-24 md:w-40" src="/logo2.svg" alt="Logo Icon" />
      </Link>

      <form
        action=""
        method="POST"
        className="flex justify-center items-center flex-col w-9/12 shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:w-2/4 md:p-6"
      >
        <h2
          className={`${ralewaySemBold.className} text-base md:text-3xl w-full text-start md:text-center`}
        >
          Mot de passe oublié
        </h2>
        <p className="w-full text-start mt-3 text-xs md:text-base md:text-center">
          Rentrez votre adresse email pour recevoir un lien de réinitialisation de votre mot de passe.
        </p>

        <div className="w-full lg:w-96">
          {inputs.map((input) => (
            <div className="mt-3 flex flex-col gap-1">
              <label className="text-xs md:text-base" htmlFor={input.id}>
                {input.name}
              </label>
              <Input
                id={input.id}
                placeholder={input.name}
                type={input.type}
                className="text-xs placeholder:text-FormBorder border-FormBorder md:text-base"
                onChange={input.onChange}
              />
            </div>
          ))}

          {error && (
            <p className="text-red-500 text-xs md:text-base">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-xs md:text-base">{success}</p>
          )}

          <div className="flex justify-center flex-col">
            <Button onClick={handlerRecoverEmail} size="default" className="mt-4 mx-auto">
              Envoyer
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
