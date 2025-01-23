import { Raleway, Agbalumo } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo } from "@/components/ui/logos";

const agbalumo = Agbalumo({
  subsets: ["latin"],
  variable: "--font-test",
  weight: "400",
});

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
  let inputs = [
    {
      id: "password",
      name: "Mot de passe",
      type: "password",
    },
    {
      id: "confirm_password",
      name: "Confirmation du mot de passe",
      type: "password",
    },
  ];

  let firstname = "Henry";
  let name = "Dupuis";
  return (
    <div
      className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}
    >
      <Link href="/">
        <Logo className="w-24 md:w-40" />
      </Link>

      <form
        action=""
        method="POST"
        className="flex justify-center items-center flex-col w-9/12 shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:w-2/4 md:p-6"
      >
        <h2
          className={`${ralewaySemBold.className} text-base md:text-3xl w-full text-start md:text-center`}
        >
          Nouveau mot de passe
        </h2>
        <p className="w-full text-start mt-3 text-xs md:text-base md:text-center">
          Bonjour {firstname} {name} ! Rentrez un nouveau mot de passe pour
          votre compte{" "}
          <span className={`${agbalumo.className}`}>L’agendary</span>.
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
              />
            </div>
          ))}

          <div className="flex justify-center flex-col">
            <Button size="default" className="mt-4 mx-auto">
              Mettre à jour
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
