/**
 * Configurazione Ambiente Applicazione
 * Branch: main (Produzione / Stabile)
 *
 * Regola Costituzionale:
 * - In main (produzione): Sincronizzazione reale attiva di default con Google Sheets.
 * - In beta: Laboratorio R&D per sviluppo e collaudo locale.
 */

export const APP_ENV = {
  branch: 'main',
  isBeta: false,
  defaultSandboxMode: false,
  appName: 'Finanze',
  statusDesc: '☁️ Cloud Sincronizzato',
  mobileText: 'Finanze'
};
