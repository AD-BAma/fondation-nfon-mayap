/**
 * FONDATION NFON MAYAP — CONFIGURATION GLOBALE
 * Clés de connexion Supabase & options de notification
 */

window.APP_CONFIG = {
  // 1. SUPABASE (Stockage direct des messages et promesses de soutien)
  supabase: {
    url: 'https://ednuqtripegmgoibvkbd.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbnVxdHJpcGVnbWdvaWJ2a2JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODg4MDUsImV4cCI6MjEwNTA2NDgwNX0.Nlf9D-_9dOdQyCpUSF7ERirTt7a-mU_tlgDEpP2aBTA'
  },

  // 2. NOTIFICATIONS EMAIL DIRECTES (Optionnel - via EmailJS)
  emailjs: {
    enabled: false,                          // Passez à true si vous configurez EmailJS
    publicKey: 'VOTRE_PUBLIC_KEY',
    serviceId: 'service_fondation',
    templateContactId: 'template_contact',
    templatePledgeId: 'template_pledge'
  },

  // 3. COORDONNÉES DE CONTACT
  contact: {
    email: 'contact@fondationnfonmayap.org',
    phone: '+237 699 993 961',
    location: 'Njiyap – Foumban, Cameroun'
  }
};
