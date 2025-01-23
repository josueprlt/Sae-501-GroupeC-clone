import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CookiePopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setShowPopup(true);
    }
  }, []);

  function handleAcceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    setShowPopup(false);
  }

  function handleRefuseCookies() {
    window.location.href = "https://www.google.com";
  }

  if (!showPopup) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-secondary border-t border-FormBorder shadow-md p-4 md:p-6 w-full z-50 flex flex-col md:flex-row items-center justify-between gap-4`}
    >
      <p className="text-xs md:text-base text-center md:text-left flex-1">
        Ce site utilise n'utilise que des cookies essentiels à son fonctionnement. En continuant, vous acceptez notre utilisation des cookies.
      </p>
      <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
        <Button size="default" onClick={handleAcceptCookies}>
          Accepter
        </Button>
        <Button size="default" variant="secondary" onClick={handleRefuseCookies}>
          Sortir du site
        </Button>
      </div>
    </div>
  );
}
