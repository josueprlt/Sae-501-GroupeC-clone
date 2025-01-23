import { Raleway } from "next/font/google";
import { LogoReverse } from "@/components/ui/logos";
import Link from "next/link";

const ralewayBold = Raleway({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-raleway",
});

const ralewayMedium = Raleway({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-raleway",
});

export function Footer() {
  return (
    <footer className="flex items-center flex-col gap-6 p-5 bg-foreground text-background">
      <Link href="/"><LogoReverse className="w-40" /></Link>

      <div className={`${ralewayBold.className} flex text-sm md:text-lg items-center gap-5`}>
        <Link href="/mentions-legales">
          Mentions Légales
        </Link>
        <hr className="bg-background w-5 rotate-90" />
        <Link href="/politique-de-confidentialite">
          Politique de confidentialité
        </Link>
      </div>

      <div className={`${ralewayMedium.className} flex text-sm items-center gap-2`}>
        <Link href="/">
          © L’agendary
        </Link>
        <hr className="bg-background w-5 rotate-90" />
        <span className="underline">
          Tous droits réservés
        </span>
        <hr className="bg-background w-5 rotate-90" />
        <span>2024</span>
      </div>

    </footer>
  );
}
