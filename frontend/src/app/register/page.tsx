"use client";

import { useState } from "react";
import { Raleway } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/lib/login";
import Image from "next/image";
import { Logo } from "@/components/ui/logos";
import { toast } from "sonner";

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

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorPassword, setErrorPassword] = useState('');
  const [error, setError] = useState("");
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpinnerActive(true);
      if (password !== passwordVerify) {
        setErrorPassword('Les mots de passe ne correspondent pas');
        return;
      }

      if (!validatePasswordComplexity(password)) {
        return;
      }

      await register(email, name, firstname, password, router);
      toast(`Vous vous êtes bien inscrit ${firstname} ${name} !`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSpinnerActive(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePasswordComplexity = (password: string): boolean => {
    if (password.length < 8) {
      setErrorPassword('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorPassword('Le mot de passe doit contenir au moins une majuscule');
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setErrorPassword('Le mot de passe doit contenir au moins une minuscule');
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setErrorPassword('Le mot de passe doit contenir au moins un chiffre');
      return false;
    }
    return true;
  };

  // Inputs liés aux états
  let inputs = [

    {
      required: true,
      id: "firstname",
      name: "Prénom",
      type: "text",
      value: firstname,
      onChange: (e: any) => setFirstname(e.target.value),
    },
    {
      required: true,
      id: "lastname",
      name: "Nom",
      type: "text",
      value: name,
      onChange: (e: any) => setName(e.target.value),
    },
    {
      required: true,
      id: "email",
      name: "Email",
      type: "email",
      value: email,
      onChange: (e: any) => setEmail(e.target.value),
    },
    {
      required: true,
      id: "password",
      name: "Mot de passe",
      type: showPassword ? "text" : "password",
      value: password,
      onChange: (e: any) => setPassword(e.target.value),
    },
    {
      required: true,
      id: "passwordVerify",
      name: "Confirmer le mot de passe",
      type: showPassword ? "text" : "password",
      value: passwordVerify,
      onChange: (e: any) => setPasswordVerify(e.target.value),
    },
  ];

  return (
    <div
      className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}
    >
      <Link href="/">
        <Logo className="w-24 md:w-40"/>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col w-9/12 shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:w-2/4 md:p-6"
      >
        <h2
          className={`${ralewaySemBold.className} text-base md:text-3xl w-full text-start md:text-center`}
        >
          Créer un compte
        </h2>

        <div className="w-full lg:w-96">
          {inputs.map((input) => (
            <div key={input.id} className="mt-3 flex flex-col gap-1">
              <label className="text-xs md:text-base" htmlFor={input.id}>
                {input.name}
              </label>
              <Input
                required={input.required}
                id={input.id}
                placeholder={input.name}
                type={input.type}
                value={input.value} // Lier la valeur à l'état
                onChange={input.onChange} // Met à jour l'état correspondant
                className="text-xs placeholder:text-FormBorder border-FormBorder md:text-base"
              />
            </div>

          ))}
          
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? "Cacher" : "Montrer"} le mot de passe
          </button>

          {errorPassword && (
            <div className="text-red-500 text-center mt-4">{errorPassword}</div>
          )}

          {/* Affichage conditionnel de l'erreur */}
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}

          <div className="flex justify-center flex-col">
            <Button size="default" className="mt-4 mx-auto">
              <Image width={5} height={5} className={`animate-spin h-5 w-5 mr-3 ${spinnerActive ? '' : 'hidden'}`} src="./spinner.svg" alt="Spiner svg" />
              Créer son compte
            </Button>
            <Link
              className="text-center mt-3 hover:underline hover:underline-offset-2 transition-transform md:text-sm"
              href="/login"
            >
              Déjà un compte ? Se connecter
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
