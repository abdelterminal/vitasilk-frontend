# Configuration Google Sheets (OptiTrav COD / Multi-Landing Pages)

Ce projet est prêt à envoyer toutes les commandes vers votre feuille Google Sheet centrale.

---

### Étape 1 : Copier le code Apps Script
1. Ouvrez votre **Google Sheet** (OptiTrav / Tableau de bord).
2. Cliquez sur **Extensions** > **Apps Script**.
3. Supprimez le code existant et collez l'intégralité du code contenu dans [google_apps_script.js](file:///c:/Users/Mediast%2001/Documents/landinPages/vitasilk/google_apps_script.js).
4. Cliquez sur **Enregistrer** (icône 💾).

---

### Étape 2 : Déployer l'Application Web
1. Cliquez sur le bouton bleu **Déployer** (en haut à droite) > **Nouveau déploiement**.
2. Cliquez sur l'icône ⚙️ > choisissez **Application Web**.
3. Configurez les options :
   - **Description :** `Webhook Master COD`
   - **Exécuter en tant que :** `Moi`
   - **Qui a accès :** `Tout le monde` (Important !)
4. Cliquez sur **Déployer**, accordez les autorisations Google.
5. Copiez l'**URL de l'application Web** (`https://script.google.com/macros/s/.../exec`).

---

### Étape 3 : Coller l'URL dans .env
Sur le VPS, ouvrez le fichier `.env` du site vitasilk et collez l'URL :
```env
SHEETS_ENDPOINT_PROTEIN_COLLAGEN=https://script.google.com/macros/s/VOTRE_SCRIPT_ID/exec
```
*(Cette page envoie la commande côté serveur via /api/landing/protein-collagen/order — l'URL ne doit jamais être exposée au navigateur.)*
