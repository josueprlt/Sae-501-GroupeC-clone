import React from 'react';

const PolitiqueConfidentialite = () => {
  return (
      <div className="w-full max-w-4xl mx-auto text-foreground bg-secondary shadow-md rounded-md p-6 md:p-10 border border-gray-200 flex flex-col gap-6 mt-10 mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Politique de Confidentialité</h1>
        <p>
          Bienvenue sur notre application de création et d'inscription à des événements. Nous nous engageons à respecter votre vie privée et à protéger vos données personnelles. Cette politique de confidentialité décrit les informations que nous collectons, la manière dont nous les utilisons, et vos droits concernant vos données.
        </p>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">1. Informations que Nous Collectons</h2>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg md:text-xl font-semibold">Données d'Inscription</h3>
            <p>
              Pour créer un compte sur notre application et participer à des événements, nous collectons des informations personnelles telles que votre nom, adresse e-mail, et mot de passe. Ces informations sont nécessaires pour vous identifier et vous permettre de participer aux événements.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg md:text-xl font-semibold">Cookie de Connexion</h3>
            <p>
              Le seul cookie utilisé par notre application est un <strong>cookie de connexion</strong>. Ce cookie est essentiel pour vous maintenir connecté(e) de manière sécurisée pendant votre session. Il ne collecte aucune information personnelle supplémentaire et est supprimé lorsque vous vous déconnectez ou fermez votre navigateur.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">2. Utilisation des Informations</h2>
          <p>Nous utilisons vos informations personnelles pour les raisons suivantes :</p>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              <strong>Création et Gestion de Compte</strong> : Pour vous permettre de créer un compte, de vous connecter et de gérer vos événements.
            </li>
            <li>
              <strong>Inscription aux Événements</strong> : Pour vous permettre de vous inscrire et de participer aux événements de votre choix.
            </li>
            <li>
              <strong>Amélioration de l'Expérience Utilisateur</strong> : Pour garantir une expérience fluide et sécurisée lors de l'utilisation de l'application.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">3. Partage des Données</h2>
          <p>
            Nous ne partageons vos données personnelles avec aucun tiers sans votre consentement explicite, sauf si cela est requis par la loi. Nous nous assurons que vos données sont protégées et ne sont accessibles que par les personnes habilitées.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">4. Vos Droits</h2>
          <p>Vous avez le droit de :</p>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li><strong>Accéder</strong> à vos informations personnelles.</li>
            <li><strong>Rectifier</strong> toute information incorrecte ou incomplète.</li>
            <li><strong>Supprimer</strong> votre compte et les données associées.</li>
          </ul>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter à tout moment via les coordonnées fournies dans l'application.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">5. Sécurité des Données</h2>
          <p>
            Nous prenons la sécurité de vos données au sérieux et utilisons des mesures appropriées pour protéger vos informations contre tout accès non autorisé, toute modification, divulgation ou destruction.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">6. Modifications de cette Politique</h2>
          <p>
            Nous nous réservons le droit de mettre à jour cette politique de confidentialité de temps en temps afin de refléter les changements apportés à nos pratiques ou pour d'autres raisons opérationnelles, légales ou réglementaires. Toute modification sera communiquée via l'application.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">7. Contact</h2>
          <p>
            Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, vous pouvez nous contacter via l'adresse e-mail fournie dans l'application.
          </p>
          <p className="text-center">Merci de votre confiance et de votre utilisation de notre application.</p>
        </div>
      </div>
  );
};

export default PolitiqueConfidentialite;

