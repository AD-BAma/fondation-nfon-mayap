/**
 * FONDATION NFON MAYAP — BACKEND CONNECTOR & DATA LAYER
 * Gestion sécurisée des formulaires vers Supabase & notifications Email
 */

const backendService = {
  /**
   * Vérifie si Supabase est correctement configuré
   */
  isSupabaseConfigured() {
    const config = window.APP_CONFIG?.supabase;
    return Boolean(
      config &&
      config.url &&
      config.anonKey &&
      !config.url.includes('votre-projet') &&
      !config.anonKey.includes('votre-cle')
    );
  },

  /**
   * Récupère l'instance du client Supabase
   */
  getClient() {
    if (!this.isSupabaseConfigured()) return null;
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      return window.supabase.createClient(
        window.APP_CONFIG.supabase.url,
        window.APP_CONFIG.supabase.anonKey
      );
    }
    return null;
  },

  /**
   * Envoi d'un message de contact
   * @param {Object} formData - { name, email, phone, subject, message }
   */
  async sendContactMessage(formData) {
    const result = {
      success: true,
      supabaseSaved: false,
      emailSent: false,
      isSimulated: false,
      error: null
    };

    try {
      const client = this.getClient();
      
      // 1. Sauvegarde dans Supabase
      if (client) {
        const { data, error } = await client
          .from('contact_messages')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              phone: formData.phone || null,
              subject: formData.subject || 'Message général',
              message: formData.message,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          console.error('[Supabase Error - Contact]:', error);
          result.error = error.message;
        } else {
          result.supabaseSaved = true;
          console.log('[Supabase Success]: Contact message saved.');
        }
      } else {
        result.isSimulated = true;
        console.warn('[Supabase Notice]: Clés démo ou non configurées. Enregistrement simulé localement.');
      }

      // 2. Notification EmailJS (si activée)
      if (window.APP_CONFIG?.emailjs?.enabled && window.emailjs) {
        try {
          await window.emailjs.send(
            window.APP_CONFIG.emailjs.serviceId,
            window.APP_CONFIG.emailjs.templateContactId,
            {
              from_name: formData.name,
              from_email: formData.email,
              phone: formData.phone || 'Non renseigné',
              subject: formData.subject,
              message: formData.message,
              submitted_at: new Date().toLocaleString()
            }
          );
          result.emailSent = true;
          console.log('[EmailJS Success]: Contact email forwarded.');
        } catch (emailErr) {
          console.warn('[EmailJS Warning]:', emailErr);
        }
      }

      return result;
    } catch (err) {
      console.error('[Backend Error - Contact]:', err);
      return { success: true, fallback: true, error: err.message };
    }
  },

  /**
   * Envoi d'une promesse de soutien / partenariat
   * @param {Object} pledgeData - { name, email, phone, support_type, message }
   */
  async sendSupportPledge(pledgeData) {
    const result = {
      success: true,
      supabaseSaved: false,
      emailSent: false,
      isSimulated: false,
      error: null
    };

    try {
      const client = this.getClient();

      // 1. Sauvegarde dans Supabase
      if (client) {
        const { data, error } = await client
          .from('support_pledges')
          .insert([
            {
              name: pledgeData.name,
              email: pledgeData.email,
              phone: pledgeData.phone || null,
              support_type: pledgeData.support_type,
              message: pledgeData.message || null,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) {
          console.error('[Supabase Error - Pledge]:', error);
          result.error = error.message;
        } else {
          result.supabaseSaved = true;
          console.log('[Supabase Success]: Support pledge saved.');
        }
      } else {
        result.isSimulated = true;
        console.warn('[Supabase Notice]: Clés démo ou non configurées. Promesse simulée localement.');
      }

      // 2. Notification EmailJS (si activée)
      if (window.APP_CONFIG?.emailjs?.enabled && window.emailjs) {
        try {
          await window.emailjs.send(
            window.APP_CONFIG.emailjs.serviceId,
            window.APP_CONFIG.emailjs.templatePledgeId,
            {
              from_name: pledgeData.name,
              from_email: pledgeData.email,
              phone: pledgeData.phone || 'Non renseigné',
              support_type: pledgeData.support_type,
              message: pledgeData.message || 'Aucun message particulier',
              submitted_at: new Date().toLocaleString()
            }
          );
          result.emailSent = true;
          console.log('[EmailJS Success]: Pledge email forwarded.');
        } catch (emailErr) {
          console.warn('[EmailJS Warning]:', emailErr);
        }
      }

      return result;
    } catch (err) {
      console.error('[Backend Error - Pledge]:', err);
      return { success: true, fallback: true, error: err.message };
    }
  }
};

window.supabaseClient = backendService;