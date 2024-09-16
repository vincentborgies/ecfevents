# Tableau des scénarios de test pour l'interface utilisateur

| Champs | Questions | Résultats attendus | Validé |
|--------|-----------|---------------------|--------|
| Connexion | Est-ce que je peux me connecter avec un email et un mot de passe valides ? | Connexion réussie, redirection vers la page appropriée selon le rôle | |
| | Est-ce que je peux me connecter avec un email invalide ? | Message d'erreur : "Email ou mot de passe incorrect" | |
| | Est-ce que je peux me connecter avec un mot de passe invalide ? | Message d'erreur : "Email ou mot de passe incorrect" | |
| | Est-ce que je peux laisser les champs email et mot de passe vides ? | Message d'erreur : "Email et mot de passe requis" | |
| Navigation (Utilisateur) | Est-ce que je peux accéder à la page "Tous les événements" ? | Affichage de la liste de tous les événements | |
| | Est-ce que je peux accéder à la page "Mes événements" ? | Affichage de la liste des événements auxquels l'utilisateur est inscrit | |
| | Est-ce que je peux me déconnecter ? | Déconnexion réussie, redirection vers la page de connexion | |
| Navigation (Admin) | Est-ce que je peux accéder à la page "Gérer les événements" ? | Affichage de la page de gestion des événements | |
| | Est-ce que je peux accéder à la page "Gérer les utilisateurs" ? | Affichage de la page de gestion des utilisateurs | |
| | Est-ce que je peux me déconnecter ? | Déconnexion réussie, redirection vers la page de connexion | |
| Liste des événements (Utilisateur) | Est-ce que je peux voir tous les événements disponibles ? | Affichage correct de tous les événements | |
| | Est-ce que je peux m'inscrire à un événement ? | Inscription réussie, mise à jour de l'interface | |
| | Est-ce que je peux me désinscrire d'un événement ? | Désinscription réussie, mise à jour de l'interface | |
| | Est-ce que je peux voir le statut de mon inscription pour chaque événement ? | Affichage correct du statut (inscrit/non inscrit) | |
| Mes événements (Utilisateur) | Est-ce que je peux voir la liste de mes événements ? | Affichage correct des événements auxquels l'utilisateur est inscrit | |
| | Est-ce que je peux me désinscrire d'un événement depuis cette page ? | Désinscription réussie, mise à jour de la liste | |
| Gestion des événements (Admin) | Est-ce que je peux ajouter un nouvel événement ? | Création réussie de l'événement, mise à jour de la liste | |
| | Est-ce que je peux laisser des champs vides lors de la création d'un événement ? | Message d'erreur pour chaque champ requis | |
| | Est-ce que je peux voir la liste de tous les événements ? | Affichage correct de tous les événements | |
| | Est-ce que je peux voir les participants d'un événement ? | Affichage correct de la liste des participants | |
| Gestion des utilisateurs (Admin) | Est-ce que je peux ajouter un nouvel utilisateur ? | Création réussie de l'utilisateur | |
| | Est-ce que je peux laisser des champs vides lors de la création d'un utilisateur ? | Message d'erreur pour chaque champ requis | |
| | Est-ce que je peux ajouter un utilisateur avec un email déjà existant ? | Message d'erreur : "Email déjà utilisé" | |
| Limites et contraintes | Est-ce que je peux m'inscrire à un événement complet ? | Message d'erreur : "L'événement est complet" | |
| | Est-ce que je peux m'inscrire deux fois au même événement ? | Message d'erreur : "Vous êtes déjà inscrit à cet événement" | |
| | Est-ce que je peux accéder à des pages admin en tant qu'utilisateur normal ? | Redirection ou message d'erreur d'accès non autorisé | |
| Responsive design | Est-ce que l'interface s'adapte correctement sur mobile ? | Affichage correct et fonctionnel sur différentes tailles d'écran | |
| | Est-ce que l'interface s'adapte correctement sur tablette ? | Affichage correct et fonctionnel sur différentes tailles d'écran | |
| | Est-ce que l'interface s'adapte correctement sur desktop ? | Affichage correct et fonctionnel sur différentes tailles d'écran | |
