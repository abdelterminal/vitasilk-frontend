> **Ported to vitasilk-frontend:** the page no longer calls the sheet from the browser.
> Deploy the script below, then set the web-app URL as `SHEETS_ENDPOINT_CRYSTAL_ROSE` in the
> server's `.env` (not `VITE_GOOGLE_SHEETS_URL`). Orders go through `/api/landing/crystal-rose/order`.

# Configuration Google Sheets (OptiTrav COD / Multi-Landing Pages)

Ce projet est prêt à envoyer toutes les commandes vers votre feuille Google Sheet centrale.

---

### Étape 1 : Copier le code Apps Script
1. Ouvrez votre **Google Sheet** (OptiTrav / Tableau de bord).
2. Cliquez sur **Extensions** > **Apps Script**.
3. Supprimez le code existant et collez l'intégralité du code contenu dans [google_apps_script.js](file:///c:/Users/Mediast%2001/Documents/landinPages/crystal%20rose/crystalrose/google_apps_script.js).
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
Ouvrez votre fichier `.env` et collez l'URL :
```env
SHEETS_ENDPOINT_CRYSTAL_ROSE=https://script.google.com/macros/s/VOTRE_SCRIPT_ID/exec
```
*(Utilisez cette même URL dans les 6 landing pages).*
