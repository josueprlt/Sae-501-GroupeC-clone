import React from 'react';

export default function MentionsLegales() {
  return (
      <div className="w-full max-w-4xl mx-auto bg-secondary text-foreground shadow-md rounded-md p-6 md:p-10 border border-gray-200 flex flex-col gap-6 mt-10 mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Mentions Légales</h1>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">1. Éditeur du Site</h2>
          <p>
            L'éditeur de ce site est <a href="https://www.iut.unilim.fr/" className="text-foreground font-semibold underline">L'IUT du Limousin</a>, dont le siège social est situé au 12 allée André Maurois, 87065 Limoges Cedex.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">2. Hébergement</h2>
          <p>
            Le site est hébergé par <a href="https://pulseheberg.com/" className="text-foreground font-semibold underline">Pulseheberg</a>, situé au 9 Boulevard de Strasbourg, 83000 Toulon.
            Pour toute question relative à l'hébergement du site, veuillez contacter Pulseheberg.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">3. Propriété Intellectuelle</h2>
          <p>
            L'ensemble des éléments présents sur ce site, incluant, sans s'y limiter, les textes, images, logos, et graphiques, sont la propriété exclusive de L'Agendary ou sont utilisés avec l'autorisation de leurs propriétaires respectifs. Toute reproduction, représentation, modification, publication, transmission ou dénaturation de tout ou partie du site est interdite, sauf autorisation préalable.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">4. Limitation de Responsabilité</h2>
          <p>
            Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement mis à jour, mais peut néanmoins contenir des inexactitudes, des omissions ou des lacunes. L'Agendary ne pourra être tenu responsable des erreurs, d'une absence de disponibilité des informations et/ou de la présence de virus sur le site.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">5. Données Personnelles</h2>
          <p>
            Les informations collectées sur ce site sont utilisées dans le cadre de la politique de confidentialité. Pour plus de détails sur la collecte et le traitement des données personnelles, veuillez consulter notre <a href="/politique-de-confidentialite" className="text-foreground font-semibold underline">Politique de Confidentialité</a>.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">6. Liens Hypertextes</h2>
          <p>
            Ce site peut contenir des liens hypertextes vers d'autres sites. L'Agendary ne peut pas être tenu responsable du contenu des sites externes accessibles via ces liens.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl md:text-2xl font-semibold">7. Droit Applicable</h2>
          <p>
            Les présentes mentions légales sont régies par les lois françaises. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux français.
          </p>
        </div>
      </div>
  );
};