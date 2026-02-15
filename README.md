# 💒 WedAm — Invitation de mariage interactive

Application d'invitation de mariage en React + Vite. Pas de backend, pas de base de données. Les RSVP sont envoyés directement à un formulaire externe (Tally, Google Forms, Formspree…).

---

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

Ouvrir dans le navigateur :
```
http://localhost:5173/#/i/sophie-marc
http://localhost:5173/#/i/julie-martin
http://localhost:5173/#/i/famille-dupont
http://localhost:5173/#/i/code-invalide   ← redirige vers Access Denied
```

---

## 📂 Structure du projet

```
src/
├── config/
│   └── formConfig.js        ← Configuration du formulaire RSVP
├── data/
│   └── guests.json          ← Liste blanche des invités
├── helpers/
│   └── submitRSVP.js        ← Fonction d'envoi du RSVP
├── hooks/
│   └── useGuest.js          ← Hook de recherche d'invité
├── styles/
│   └── global.scss           ← Variables CSS + styles globaux
├── components/
│   ├── IntroOverlay.jsx      ← Overlay cinématique d'entrée
│   ├── SectionReveal.jsx     ← Animation de révélation au scroll
│   ├── GoldDivider.jsx       ← Séparateur décoratif doré
│   ├── MenuCard.jsx          ← Carte de menu (Bœuf/Volaille/Végétarien)
│   ├── MenuStepper.jsx       ← Stepper pour sélection multi-invités
│   ├── RSVPForm.jsx          ← Formulaire RSVP complet
│   └── Confirmation.jsx      ← Écran de confirmation animé
├── pages/
│   ├── InvitationPage.jsx    ← Page principale d'invitation
│   └── AccessDenied.jsx      ← Page code invalide
├── App.jsx
└── main.jsx
```

---

## 👥 Gestion des invités

Éditez `src/data/guests.json` :

```json
[
  {
    "code": "sophie-marc",
    "name": "Sophie & Marc",
    "seats": 2
  }
]
```

Chaque invité reçoit un lien unique :
`https://votre-site.com/#/i/sophie-marc`

---

## 📬 Configuration du formulaire RSVP

Éditez `src/config/formConfig.js` pour connecter l'envoi des RSVP à votre service de formulaire.

### Option 1 : Tally (recommandé)

1. Créez un nouveau formulaire sur [tally.so](https://tally.so)
2. Ajoutez ces champs (type « Texte court » ou « Texte long ») :
   - `code` — Code d'invitation
   - `guestName` — Nom de l'invité
   - `seats` — Nombre de places
   - `attending` — Présence (oui/non)
   - `menuSelections` — Choix de menus (JSON)
   - `dietary` — Restrictions alimentaires
   - `timestamp` — Horodatage

3. Activez les **Webhooks** dans les paramètres de votre formulaire Tally :
   - Allez dans Intégrations > Webhooks
   - Copiez l'URL du webhook

4. Configurez `formConfig.js` :
   ```js
   provider: 'webhook',
   endpoint: 'https://votre-webhook-url.com',
   ```

> **Alternative Tally :** Utilisez un service comme [Formspree](https://formspree.io) ou [Web3Forms](https://web3forms.com) comme intermédiaire.

### Option 2 : Google Forms

1. Créez un Google Form avec les mêmes champs
2. Pour chaque champ, récupérez l'`entry.XXXXXXX` (inspectez le HTML du formulaire)
3. Configurez `formConfig.js` :
   ```js
   provider: 'google-forms',
   endpoint: 'https://docs.google.com/forms/d/e/FORM_ID/formResponse',
   fieldMap: {
     code:           'entry.123456789',
     guestName:      'entry.234567890',
     seats:          'entry.345678901',
     attending:      'entry.456789012',
     menuSelections: 'entry.567890123',
     dietary:        'entry.678901234',
     timestamp:      'entry.789012345',
   },
   ```

### Option 3 : Formspree (le plus simple)

1. Créez un compte sur [formspree.io](https://formspree.io)
2. Créez un formulaire et copiez l'endpoint
3. Configurez :
   ```js
   provider: 'webhook',
   endpoint: 'https://formspree.io/f/xPkgRvWL',
   ```

### Mode démo

Si `endpoint` vaut `'YOUR_ENDPOINT_HERE'`, les RSVP sont simulés localement (log en console) — parfait pour le développement.

---

## 🎨 Personnalisation

- **Noms des mariés** : cherchez « Mouna & Amine » dans les composants
- **Date & lieu** : modifiez `InvitationPage.jsx` et `IntroOverlay.jsx`
- **Couleurs** : éditez les CSS custom properties dans `src/styles/global.scss`
- **Menus** : modifiez le tableau `MENU_OPTIONS` dans `RSVPForm.jsx`
- **Polices** : changez les Google Fonts dans `index.html` et les variables CSS

---

## 🌐 Déploiement

L'app utilise `HashRouter` et est 100% statique. Déployez `dist/` sur n'importe quel hébergement :

```bash
npm run build
```

Puis uploadez le dossier `dist/` sur :
- **GitHub Pages** : utilisez `gh-pages` ou l'action GitHub
- **Netlify** : drag & drop du dossier `dist`
- **Vercel** : connectez le repo et configurez `npm run build` / `dist`

---

## 📦 Payload RSVP

Chaque soumission envoie ce JSON :

```json
{
  "code": "sophie-marc",
  "guestName": "Sophie & Marc",
  "seats": 2,
  "attending": true,
  "menuSelections": ["beef", "vegetarian"],
  "dietary": "Allergie aux noix",
  "timestamp": "2026-02-15T14:30:00.000Z"
}
```

---

## 📄 License

Projet privé — usage personnel uniquement.
