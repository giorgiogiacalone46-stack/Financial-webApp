/**
 * BiometricService - Sblocco Biometrico Apple Face ID / Touch ID (WebAuthn)
 * Conforme alle Human Interface Guidelines Apple per autenticazione nativa
 */

export const BiometricService = {
  /**
   * Verifica se il browser/ambiente supporta le Web Authentication API (WebAuthn)
   */
  isSupported() {
    return typeof window !== 'undefined' &&
           !!window.PublicKeyCredential &&
           !!navigator.credentials &&
           typeof navigator.credentials.get === 'function';
  },

  /**
   * Verifica se è disponibile un autenticatore biometrico di piattaforma (Face ID / Touch ID)
   */
  async isPlatformAuthenticatorAvailable() {
    if (!this.isSupported()) return false;
    try {
      if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      }
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Verifica se l'utente ha abilitato lo sblocco biometrico nelle impostazioni
   */
  isEnabled() {
    try {
      return localStorage.getItem('finanze_biometric_enabled') === 'true';
    } catch (e) {
      return false;
    }
  },

  /**
   * Abilita o disabilita lo sblocco biometrico
   */
  setEnabled(enabled) {
    try {
      if (enabled) {
        localStorage.setItem('finanze_biometric_enabled', 'true');
      } else {
        localStorage.removeItem('finanze_biometric_enabled');
        localStorage.removeItem('finanze_biometric_cred_id');
      }
    } catch (e) {
      console.warn('Impossibile salvare preferenza biometrica:', e);
    }
  },

  /**
   * Registra una chiave biometrica locale di piattaforma (Face ID / Touch ID)
   */
  async enrollBiometric() {
    if (!this.isSupported()) {
      throw new Error('WebAuthn non supportato su questo dispositivo o browser.');
    }

    // Verifica disponibilità piattaforma
    const available = await this.isPlatformAuthenticatorAvailable();
    if (!available) {
      console.info('Autenticatore di piattaforma non segnalato, tentativo diretto.');
    }

    const challenge = new Uint8Array(32);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(challenge);
    } else {
      for (let i = 0; i < 32; i++) challenge[i] = Math.floor(Math.random() * 256);
    }

    const userId = new Uint8Array(16);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(userId);
    } else {
      for (let i = 0; i < 16; i++) userId[i] = Math.floor(Math.random() * 256);
    }

    const hostname = (window.location && window.location.hostname) ? window.location.hostname : 'localhost';

    const creationOptions = {
      challenge,
      rp: {
        name: "Financial WebApp Apple",
        id: hostname
      },
      user: {
        id: userId,
        name: "giorgio@personal-finance",
        displayName: "Giorgio"
      },
      pubKeyCredParams: [
        { alg: -7, type: "public-key" },  // ES256 (standard Apple Face ID / Touch ID)
        { alg: -257, type: "public-key" } // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform", // Forza Face ID / Touch ID nativo
        userVerification: "required"
      },
      timeout: 60000,
      attestation: "none"
    };

    try {
      const credential = await navigator.credentials.create({
        publicKey: creationOptions
      });

      if (credential && credential.id) {
        // Memorizza ID credenziale
        localStorage.setItem('finanze_biometric_cred_id', credential.id);
        this.setEnabled(true);
        return true;
      }
      return false;
    } catch (err) {
      console.warn('Errore registrazione biometrica:', err);
      // Se l'errore è dovuto al contesto (es. file:// o cert non attendibile), informiamo l'utente
      if (err.name === 'NotAllowedError') {
        throw new Error('Riconoscimento biometrico annullato o negato dall\'utente.');
      } else if (err.name === 'SecurityError') {
        throw new Error('WebAuthn richiede un contesto sicuro (HTTPS o localhost).');
      } else {
        throw new Error(err.message || 'Errore durante la registrazione biometrica.');
      }
    }
  },

  /**
   * Esegue la verifica biometrica (Face ID / Touch ID)
   */
  async authenticate() {
    if (!this.isEnabled() || !this.isSupported()) {
      return false;
    }

    const challenge = new Uint8Array(32);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(challenge);
    } else {
      for (let i = 0; i < 32; i++) challenge[i] = Math.floor(Math.random() * 256);
    }

    const hostname = (window.location && window.location.hostname) ? window.location.hostname : 'localhost';
    const credId = localStorage.getItem('finanze_biometric_cred_id');

    const getOptions = {
      challenge,
      timeout: 60000,
      userVerification: "required",
      rpId: hostname
    };

    if (credId) {
      try {
        // Decodifica l'ID credenziale registrata
        const rawId = Uint8Array.from(atob(credId), c => c.charCodeAt(0));
        getOptions.allowCredentials = [{
          id: rawId,
          type: 'public-key',
          transports: ['internal']
        }];
      } catch (e) {
        // Fallback su chiamata aperta
      }
    }

    try {
      const assertion = await navigator.credentials.get({
        publicKey: getOptions
      });
      return !!assertion;
    } catch (err) {
      console.warn('Autenticazione biometrica annullata o non riuscita:', err);
      return false;
    }
  }
};

if (typeof window !== 'undefined') {
  window.BiometricService = BiometricService;
}
