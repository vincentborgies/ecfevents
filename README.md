# Gestion d'Événements

Ce projet est une application de gestion d'événements qui permet aux utilisateurs de s'inscrire à des événements, de les gérer et d'administrer les utilisateurs.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- [PHP](https://www.php.net/downloads) (version 7.4 ou supérieure)
- [Composer](https://getcomposer.org/download/)
- [Node.js](https://nodejs.org/) (pour gérer les dépendances JavaScript)
- [MySQL](https://www.mysql.com/downloads/) (ou un autre système de gestion de base de données)

## Installation

1. **Clonez le dépôt :**

   ```bash
   git clone https://votre-repo-url.git
   cd votre-dossier
   ```

2. **Installez les dépendances PHP :**

   Accédez au dossier `api-slim` et exécutez la commande suivante :

   ```bash
   cd api-slim
   composer install
   ```

3. **Configurez la base de données :**

   - Créez une base de données MySQL pour l'application.
   - Modifiez le fichier `db.php` dans le dossier `api-slim` pour y ajouter vos informations de connexion à la base de données.
   - Importez la structure de la base de données à partir du fichier `ecf_events.sql` qui se trouve à la racine du projet.

4. **Démarrez le serveur PHP :**

   Dans le dossier `api-slim`, exécutez la commande suivante pour démarrer le serveur :

   ```bash
   php -S localhost:3000
   ```

5. **Lancer le front-end :**
   Ouvrez le fichier `index.html` situé à la racine du dossier `public` dans votre navigateur pour visualiser l'application.


## Utilisation

- **Connexion :** Utilisez les identifiants d'un utilisateur existant pour vous connecter.
- **Gestion des événements :** Les administrateurs peuvent ajouter, modifier et supprimer des événements.
- **Inscription :** Les utilisateurs peuvent s'inscrire à des événements et se désinscrire si nécessaire.
