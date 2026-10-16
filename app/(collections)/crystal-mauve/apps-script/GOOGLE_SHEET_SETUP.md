# Configuration Google Sheets (OptiTrav COD / Multi-Landing Pages)

Ce projet est prêt à envoyer toutes les commandes vers votre feuille Google Sheet centrale.

---

### Étape 1 : Copier le code Apps Script
1. Ouvrez votre **Google Sheet** (OptiTrav / Tableau de bord).
2. Cliquez sur **Extensions** > **Apps Script**.
3. Supprimez le code existant et collez l'intégralité du code contenu dans [google_apps_script.js](file:///c:/Users/Mediast%2001/Documents/landinPages/crystal/crystal2/google_apps_script.js).
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

### Étape 3 : Coller l'URL dans le .env du serveur (vitasilk-frontend)
Dans le `.env` du serveur (à côté du docker-compose), ajoutez :
```env
SHEETS_ENDPOINT_CRYSTAL_MAUVE=https://script.google.com/macros/s/VOTRE_SCRIPT_ID/exec
```
*(Port Next.js : l'URL est lue côté serveur par `/api/landing/crystal-mauve/order`, jamais exposée au navigateur. Chaque landing page a sa propre variable et sa propre feuille.)*
