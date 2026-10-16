# Configuration Google Sheets (OptiTrav COD / Multi-Landing Pages)

Ce projet est prêt à envoyer toutes les commandes vers votre feuille Google Sheet centrale.

---

### Étape 1 : Copier le code Apps Script
1. Ouvrez votre **Google Sheet** (OptiTrav / Tableau de bord).
2. Cliquez sur **Extensions** > **Apps Script**.
3. Supprimez le code existant et collez l’intégralité du code contenu dans `google_apps_script.js` (dans ce dossier).
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

### Étape 3 : Configurer l’URL sur le serveur
La landing page n’appelle plus Google Sheets depuis le navigateur : c’est la route serveur `/api/landing/sos-therapy/order` qui transmet la commande.
Ajoutez l’URL dans le `.env` du serveur (VPS), à côté du `docker-compose.yml` :
```env
SHEETS_ENDPOINT_SOS_THERAPY=https://script.google.com/macros/s/VOTRE_SCRIPT_ID/exec
```
Puis reconstruisez le conteneur. Sans cette variable, les commandes restent enregistrées dans le tableau `/sos-therapy/orders`.
