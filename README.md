# Guide d'initialisation de l'application

### Étapes :

1. **Se placer dans le dossier backend** :
   ```sh
   cd backend
   ```

2. **Lancer Docker Compose avec reconstruction des conteneurs** :
   ```sh
   docker-compose up --build
   ```

3. **Importer la base de données (fichier app.sql à la racine du projet) sur phpmyadmin pour une meilleure expérience** :
   - *Utilisateur: root*
   - *Mot de passe: root*


4. **Sinon, faire une migration depuis le terminal du container php** :
   ```sh
   php bin/console make:migration
   php bin/console doctrine:migrations:migrate
   ```

5. **Accéder au front & au back pour accepter le risque de sécurité (Problème lié aux certificats auto-générés)** :
   - https://localhost (back)
   - https://localhost:3000 (front)

---

L'application est maintenant prête.
Si vous rencontrez le moindre problème, veuillez nous contacter à l'adresse : corentin.pouget@etu.unilim.fr

