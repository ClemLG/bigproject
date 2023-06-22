# Backend

## Installation

1. Clonez le dépôt GitHub de l'application :

   ```
   git clone https://github.com/ClemLG/bigproject.git

## Répertoire

2. Accédez au répertoire du projet :

   ```
   cd bigproject/backend

## Dépendances

3. Installez les dépendances du projet en utilisant npm :

```
npm install
```

## Base de données

4. Pour la configuration de la base de données,
   ouvrez le fichier config.js et modifiez les informations de configuration de la base de données selon vos besoins :

```
{
  "username": "dualz",
  "password": "9999999999",
  "database": "dualz",
  "host": "localhost",
  "dialect": "mariadb"
}

```

## Démarrage du serveur

5. Lancez le serveur backend en utilisant nodemon :

```y
nodemon server
```

Le serveur se lancera sur le port 3003. Vous verrez le message suivant dans la console :
Connexion à la base de données MariaDB réussie !