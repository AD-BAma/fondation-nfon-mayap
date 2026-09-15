# Guide de Configuration Backend & Supabase — Fondation Nfon Mayap

Ce guide vous explique pas à pas comment connecter la base de données **Supabase** et activer les notifications pour le site de la **Fondation Nfon Mayap**.

---

## 1. Créer votre projet Supabase (Gratuit)

1. Rendez-vous sur [https://supabase.com](https://supabase.com) et créez un compte ou connectez-vous.
2. Cliquez sur **"New Project"** (Nouveau projet).
3. Renseignez :
   - **Nom du projet** : `Fondation Nfon Mayap`
   - **Mot de passe de la base** : *(choisissez un mot de passe sécurisé)*
   - **Région** : Choisissez la plus proche (ex: *Frankfurt (eu-central-1)* ou *London (eu-west-2)*).
4. Cliquez sur **"Create new project"** et patientez environ 1 à 2 minutes pendant l'initialisation.

---

## 2. Déployer les Tables et la Sécurité (SQL)

1. Dans le tableau de bord Supabase, cliquez sur **SQL Editor** dans le menu latéral gauche.
2. Cliquez sur **"New query"**.
3. Ouvrez le fichier [`supabase_schema.sql`](./supabase_schema.sql) du projet, copiez l'intégralité de son contenu et collez-le dans l'éditeur SQL de Supabase.
4. Cliquez sur le bouton vert **"Run"** (ou `Ctrl + Enter`).

> Vos deux tables (`contact_messages` et `support_pledges`) avec leurs politiques de sécurité (Row Level Security) sont créées et prêtes.

---

## 3. Récupérer vos Clés API et Configurer le Site

1. Dans le tableau de bord Supabase, allez dans **Project Settings** (icône d'engrenage en bas à gauche) > **API**.
2. Vous y trouverez deux valeurs :
   - **Project URL** (ex: `https://abcdefghijklmn.supabase.co`)
   - **Project API Keys** > Clé **`anon` `public`** (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
3. Ouvrez le fichier [`js/config.js`](./js/config.js) dans votre projet et remplacez les valeurs :

```javascript
window.APP_CONFIG = {
  supabase: {
    url: 'https://VOTRE_PROJECT_ID.supabase.co',
    anonKey: 'VOTRE_CLE_ANON_PUBLIQUE'
  },
  // ...
};
```

---

## 4. Consultation des Données

- **Messages de contact** : Accédez à la section **Table Editor** > `contact_messages`.
- **Promesses de partenariat / soutien** : Accédez à la section **Table Editor** > `support_pledges`.
- Vous pouvez exporter les données en CSV / Excel à tout moment en un clic.

---

## 5. (Optionnel) Notifications Email Directes (EmailJS)

Si vous souhaitez recevoir un email instantané à chaque soumission sur `contact@fondationnfonmayap.org` :
1. Créez un compte gratuit sur [https://www.emailjs.com](https://www.emailjs.com).
2. Connectez votre adresse email dans **Email Services**.
3. Créez deux modèles d'emails (**Email Templates**) pour le Contact et les Promesses de soutien.
4. Dans [`js/config.js`](./js/config.js), activez l'option :
   ```javascript
   emailjs: {
     enabled: true,
     publicKey: 'VOTRE_PUBLIC_KEY',
     serviceId: 'service_fondation',
     templateContactId: 'template_contact',
     templatePledgeId: 'template_pledge'
   }
   ```
