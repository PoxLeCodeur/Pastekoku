# Pastekoku

L'idée de Pastekoku est de faire un jeu Bomberman avec différents types de fruits à la place des bombes (surtout des pastèques), et que chaque fruit a des caractéristiques différentes.

**La base :**

- Des personnages qui peuvent se déplacer (haut, bas, gauche, droite), poser des bombes et mourir.☑️

- Une map avec des murs destructibles, et des murs indestructibles.☑️

- Des bombes avec un rayon d’explosion qui peut tuer les joueurs (et une pastèque)

- Des bots qui se déplacent et cherchent à se tuer entre eux en posant des bombes.❎

- Différents objets qui permettent d’améliorer notre personnage ou nos bombes.☑️

- La possibilité de jouer en multijoueur local.❎

**Features additionnelles :**

- Des types de bombes originales(genre une pastèque).

- Des skins de personnage.❎

- Des maps additionnelles.❎

- Paramétrage des bindings❎

**Guide d'installation :**

*Ce guide d'installation part du principe que vous possédez déjà Visual Studio Code, wamp ou autres alternatives, git ainsi que Node Package Manager (npm), s'il vous manque l'un de ces éléments, référez-vous au cours du **sublime** Corto Dufour⭐*.
- Lancer Visual Studio Code ou autre logiciel de gros geekos💻.
    - Lancez Wamp ou votre altenative pour accéder à la base de donnée.
- Lancer un nouveau terminal à l'aide du raccourcis clavier *ctrl + shift + `* (ou allez dans *Terminal*, *Nouveau Terminal*).
- Entrez la commande **git clone https://github.com/PoxLeCodeur/Pastekoku.git**.
- Vous avez désormais un dossier appelé Pastekoku sur votre PC que vous pouvez ouvrir en allant dans "*Fichier*" puis "*Ouvrir le Dossier*" (vous pouvez voir où le dossier a été installé dans la réponse du terminal après le git clone).
- Récupérez depuis le Drive le fichier **config.json** et mettez le dans la racine.
  - Si le Drive n'est pas encore disponible, créez-le directement à la racine, et écrivez :
     <code> 
{
  "dbConfig": {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "port": 8889,
    "database": "bomberman"
  },
  "listPerPage": 10
}</code>
  - N'oubliez pas le **ctrl + S** pour valider la saisie.
- Une fois fait, retournez sur le terminal et entrez la commande "**npm i**" pour installer les bibliothèques Node requises.
- Entrez ensuite la commande "**node migration/dataBase,js**" suivi de "**node migration/dbTable.js**" et enfin "**node migration/dbMigration.js**".
- Tout en restant dans le terminal, faites "**node index.js**" puis **ctrl cliquez** sur **http://localhost:3000** (Par défaut 3000, différent si vous l'avez changé). Une page avec le jeu devrait normalement s'ouvrir sur votre navigateur.
- Vous devrez peut-être rajouter un "**/pastekoku/**" à la fin de l'url pour avoir accès au jeu.
- Voili voilou😸.

**Guide de jeu :**
- Il s'agit d'un **Bomberman** classique💣 mais avec des fruits🍉 réalisé principalement à l'aide de l'outil **Kaboom!💥**.
  - La raison principale de ce choix est que, je cite, "*En vrai un Bomberman avec Kaboom c'est rigolo*🧠🧠🧠" nonobstant son manque de versatilité et de personnalisation qui nous ont posé de nombreux problèmes lors de la réalisation de ce projet.
  - (La vraie raison de ce choix est la facilité d'animation des personnages, la gestion de la map et des déplacements et la possibilité d'utiliser des png, notre graphiste ayant une haine viscérale des vecteurs).
- Vous incarnez un petit golem qui a pour seul but de fruiter ses petits camarades😇.
  - Vous pouvez poser des **fruits explosifs** tah les choux péteurs en appuyant sur la **barre espace** ou de la touche **E** si vous êtes le *joueur 2*.
  - Il existe différents types de fruits avec différents effets que vous découvrirez au fur et à mesure des parties !
  - Vous pouvez bien évidemment vous **déplacer** à l'aide des **flèches directionnelles**◀️🔼🔽▶️ ou des touches **ZQSD** si vous êtes le *joueur 2*.
  - Certains murs sont destructible mais certains demandent plus d'efforts que d'autres🧱.

**Contenu actuel du jeu :**
- Deux petits golems qui posent des fruits(lesquels explosent mais ne font aucun dégat pour le moment).
- Une pomme ramassable qui à l'avenir donnera un bonus.
- Une map mais dont les murs ne sont pas encore destructibles.
