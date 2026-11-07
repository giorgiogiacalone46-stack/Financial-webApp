/**
 * Configurazione Ambiente Applicazione
 * Branch: main (Produzione / Stabile)
 * 
 * Regola Costituzionale:
 * - In main (produzione): Sincronizzazione reale attiva di default con Google Sheets.
 * - In beta: Sandbox attiva di default per proteggere il database reale da qualsiasi scrittura.
 */

export const APP_ENV = {
  branch: 'beta',
  isBeta: true,
  defaultSandboxMode: false,
  appName: 'Finanze (Beta)',
  statusDesc: 'Sincronizzazione Live & Locale',
  mobileText: 'Finanze'
};
