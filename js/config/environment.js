/**
 * Configurazione Ambiente Applicazione
 * Branch: beta (Laboratorio R&D / Sviluppo Attivo)
 * 
 * Regola Costituzionale:
 * - In beta: Sandbox attiva di default per proteggere il database reale da qualsiasi scrittura.
 * - In main (produzione): Sincronizzazione reale attiva di default con Google Sheets.
 */

export const APP_ENV = {
  branch: 'beta',
  isBeta: true,
  defaultSandboxMode: true,
  appName: 'Finanze (Beta Sandbox)',
  statusDesc: '🛡️ Database Protetto',
  mobileText: '🛡️ Sandbox'
};
