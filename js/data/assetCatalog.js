/**
 * Catalogo Asset & Strumenti Finanziari JustETF
 * Database integrato di ETF, Ticker, ISIN, Asset Class e Metadati Finanziari
 */

export const ASSET_CLASSES = {
  monetario: {
    id: 'monetario',
    label: 'Monetario / Liquidità Sicura',
    color: '#34C759',
    riskLevel: 1,
    description: 'Strumenti a bassissima volatilità, tasso overnight interbancario (€STR), liquidità remunerata o BOT.'
  },
  azionario_globale: {
    id: 'azionario_globale',
    label: 'Azionario Globale (All-World)',
    color: '#0071E3',
    riskLevel: 4,
    description: 'Esposizione diversificata globale a mercati sviluppati ed emergenti (es. FTSE All-World, MSCI ACWI).'
  },
  azionario_sviluppati: {
    id: 'azionario_sviluppati',
    label: 'Azionario Paesi Sviluppati (DM)',
    color: '#0A84FF',
    riskLevel: 4,
    description: 'Grandi e medie capitalizzazioni dei paesi sviluppati (es. MSCI World).'
  },
  azionario_usa: {
    id: 'azionario_usa',
    label: 'Azionario USA (S&P 500 / Nasdaq)',
    color: '#5856D6',
    riskLevel: 4,
    description: 'Principali titoli del mercato statunitense (es. S&P 500, MSCI USA).'
  },
  azionario_emergenti: {
    id: 'azionario_emergenti',
    label: 'Azionario Mercati Emergenti (EM)',
    color: '#FF9500',
    riskLevel: 5,
    description: 'Economie in via di sviluppo ad alto potenziale di crescita (es. MSCI Emerging Markets).'
  },
  obbligazionario_globale: {
    id: 'obbligazionario_globale',
    label: 'Obbligazionario Globale (Aggregate Bond)',
    color: '#30D158',
    riskLevel: 2,
    description: 'Mix di titoli governativi e societari investment-grade globali.'
  },
  obbligazionario_gov: {
    id: 'obbligazionario_gov',
    label: 'Titoli di Stato / BTP / Gov Bond',
    color: '#34C759',
    riskLevel: 2,
    description: 'Obbligazioni governative della zona euro o italiane (BTP, Bund, Bonos).'
  },
  oro_commodities: {
    id: 'oro_commodities',
    label: 'Oro Fisico & Materie Prime (ETC)',
    color: '#FFCC00',
    riskLevel: 3,
    description: 'Metalli preziosi con copertura fisica a protezione dall\'inflazione.'
  },
  crypto: {
    id: 'crypto',
    label: 'Criptovalute / Digital Assets',
    color: '#FF9500',
    riskLevel: 7,
    description: 'Attività digitali ad altissima volatilità (es. Bitcoin, Ethereum).'
  },
  previdenza: {
    id: 'previdenza',
    label: 'Previdenza Complementare (Pensione)',
    color: '#AF52DE',
    riskLevel: 3,
    description: 'Fondi pensione negoziali o aperti con deducibilità fiscale Art. 51 TUIR.'
  },
  liquidita: {
    id: 'liquidita',
    label: 'Liquidità di Conto / Cassa Libera',
    color: '#64D2FF',
    riskLevel: 1,
    description: 'Liquidità non investita presente sul conto bancario o sul conto del broker.'
  }
};

export const POPULAR_ASSETS = [
  {
    ticker: 'XEON',
    isin: 'LU0290358497',
    name: 'Xtrackers II EUR Overnight Rate Swap UCITS ETF 1C',
    issuer: 'DWS (Xtrackers)',
    assetClass: 'monetario',
    ter: 0.10,
    distribution: 'Accumulazione',
    exchange: 'XETRA / Borsa Italiana',
    notes: 'Tasso interbancario €STR Overnight, ideale per Fondo Emergenza e Liquidità Sicura'
  },
  {
    ticker: 'VWCE',
    isin: 'IE00BK5BQT80',
    name: 'Vanguard FTSE All-World UCITS ETF (USD) Acc',
    issuer: 'Vanguard',
    assetClass: 'azionario_globale',
    ter: 0.22,
    distribution: 'Accumulazione',
    exchange: 'XETRA / Borsa Italiana',
    notes: 'Standard de facto per PAC azionario passivo globale (3.700+ titoli)'
  },
  {
    ticker: 'VGWL',
    isin: 'IE00B3RBWM25',
    name: 'Vanguard FTSE All-World UCITS ETF (USD) Dist',
    issuer: 'Vanguard',
    assetClass: 'azionario_globale',
    ter: 0.22,
    distribution: 'Distribuzione',
    exchange: 'Borsa Italiana',
    notes: 'Versione a distribuzione dei dividendi di VWCE'
  },
  {
    ticker: 'SWDA',
    isin: 'IE00B4L5Y983',
    name: 'iShares Core MSCI World UCITS ETF (Acc)',
    issuer: 'iShares (BlackRock)',
    assetClass: 'azionario_sviluppati',
    ter: 0.20,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana / XETRA',
    notes: 'Solo paesi sviluppati (MSCI World, 1.500+ titoli)'
  },
  {
    ticker: 'CSSPX',
    isin: 'IE00B5BMR087',
    name: 'iShares Core S&P 500 UCITS ETF (Acc)',
    issuer: 'iShares (BlackRock)',
    assetClass: 'azionario_usa',
    ter: 0.07,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana / XETRA',
    notes: 'Le 500 aziende a maggiore capitalizzazione degli Stati Uniti'
  },
  {
    ticker: 'EIMI',
    isin: 'IE00BKM4GZ66',
    name: 'iShares Core MSCI EM IMI UCITS ETF (Acc)',
    issuer: 'iShares (BlackRock)',
    assetClass: 'azionario_emergenti',
    ter: 0.18,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana / XETRA',
    notes: 'Mercati emergenti globali (Cina, India, Taiwan, Brasile, ecc.)'
  },
  {
    ticker: 'AGGH',
    isin: 'IE00BDBRDM35',
    name: 'iShares Core Global Aggregate Bond UCITS ETF EUR Hedged (Acc)',
    issuer: 'iShares (BlackRock)',
    assetClass: 'obbligazionario_globale',
    ter: 0.10,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana',
    notes: 'Obbligazionario mondiale con copertura valutaria in Euro'
  },
  {
    ticker: 'VAGF',
    isin: 'IE00BG47KH54',
    name: 'Vanguard Global Aggregate Bond UCITS ETF EUR Hedged (Acc)',
    issuer: 'Vanguard',
    assetClass: 'obbligazionario_globale',
    ter: 0.10,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana',
    notes: 'Obbligazioni globali governative e societarie coperto in EUR'
  },
  {
    ticker: 'XG7S',
    isin: 'LU1681045370',
    name: 'Xtrackers Eurozone Government Bond 1-3 UCITS ETF 1C',
    issuer: 'DWS (Xtrackers)',
    assetClass: 'obbligazionario_gov',
    ter: 0.07,
    distribution: 'Accumulazione',
    exchange: 'XETRA / Borsa Italiana',
    notes: 'Titoli di stato Eurozona a breve termine (1-3 anni) a basso rischio'
  },
  {
    ticker: 'SGLD',
    isin: 'IE00B579F325',
    name: 'Invesco Physical Gold ETC',
    issuer: 'Invesco',
    assetClass: 'oro_commodities',
    ter: 0.12,
    distribution: 'N/A',
    exchange: 'Borsa Italiana / XETRA',
    notes: 'Oro fisico con lingotti allocati nei caveau di Londra'
  },
  {
    ticker: 'IGLN',
    isin: 'IE00B4ND3602',
    name: 'iShares Physical Gold ETC',
    issuer: 'iShares (BlackRock)',
    assetClass: 'oro_commodities',
    ter: 0.12,
    distribution: 'N/A',
    exchange: 'Borsa Italiana',
    notes: 'ETC oro fisico con replica diretta'
  },
  {
    ticker: 'LCWD',
    isin: 'LU1781541179',
    name: 'Amundi Core MSCI World (DR) UCITS ETF',
    issuer: 'Amundi',
    assetClass: 'azionario_sviluppati',
    ter: 0.12,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana',
    notes: 'ETF MSCI World a basso costo (TER 0.12%)'
  },
  {
    ticker: 'MEUD',
    isin: 'LU0908500753',
    name: 'Amundi STOXX Europe 600 UCITS ETF (Acc)',
    issuer: 'Amundi',
    assetClass: 'azionario_sviluppati',
    ter: 0.07,
    distribution: 'Accumulazione',
    exchange: 'Borsa Italiana',
    notes: 'Azionario europeo ad altissima diversificazione'
  },
  {
    ticker: 'BTP',
    isin: 'IT0005000000',
    name: 'Buoni del Tesoro Poliennali (Titoli di Stato)',
    issuer: 'Repubblica Italiana (MEF)',
    assetClass: 'obbligazionario_gov',
    ter: 0.00,
    distribution: 'Cedola Semestrale',
    exchange: 'MOT / Borsa Italiana',
    notes: 'Obbligazioni sovrane emesse dallo Stato Italiano'
  },
  {
    ticker: 'BOT',
    isin: 'IT0006000000',
    name: 'Buoni Ordinari del Tesoro (Monetario Italia)',
    issuer: 'Repubblica Italiana (MEF)',
    assetClass: 'monetario',
    ter: 0.00,
    distribution: 'Scarto di emissione',
    exchange: 'MOT / Borsa Italiana',
    notes: 'Titoli di stato italiani a breve scadenza (3, 6, 12 mesi)'
  }
];

export const AssetCatalogService = {
  /**
   * Cerca uno strumento nel catalogo JustETF per Ticker, ISIN o Nome
   */
  lookupAsset(query) {
    if (!query) return null;
    const q = String(query).trim().toUpperCase();

    // 1. Cerca nel catalogo integrato
    let match = POPULAR_ASSETS.find(a => 
      a.ticker.toUpperCase() === q || 
      a.isin.toUpperCase() === q
    );

    if (!match) {
      match = POPULAR_ASSETS.find(a => 
        a.ticker.toUpperCase().includes(q) || 
        a.isin.toUpperCase().includes(q) ||
        a.name.toUpperCase().includes(q)
      );
    }

    // 2. Cerca negli asset personalizzati dell'utente
    if (!match) {
      const customAssets = this.getCustomAssets();
      match = customAssets.find(a => 
        (a.ticker && a.ticker.toUpperCase() === q) || 
        (a.isin && a.isin.toUpperCase() === q)
      );
    }

    if (match) {
      const classMeta = ASSET_CLASSES[match.assetClass] || ASSET_CLASSES.monetario;
      return {
        ...match,
        classLabel: classMeta.label,
        color: classMeta.color,
        riskLevel: classMeta.riskLevel,
        isRecognized: true
      };
    }

    return null;
  },

  /**
   * Restituisce tutti gli asset personalizzati salvati dall'utente
   */
  getCustomAssets() {
    try {
      const saved = localStorage.getItem('finanze_custom_assets');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  },

  /**
   * Salva o aggiorna un asset personalizzato inserito dall'utente
   */
  saveCustomAsset(asset) {
    if (!asset || (!asset.ticker && !asset.isin)) return false;
    const list = this.getCustomAssets();
    const cleanTicker = (asset.ticker || '').trim().toUpperCase();
    const cleanIsin = (asset.isin || '').trim().toUpperCase();

    const idx = list.findIndex(a => 
      (cleanTicker && a.ticker === cleanTicker) || 
      (cleanIsin && a.isin === cleanIsin)
    );

    const newObj = {
      ticker: cleanTicker || 'ASSET',
      isin: cleanIsin || 'ND',
      name: (asset.name || cleanTicker || 'Strumento Finanziario').trim(),
      issuer: (asset.issuer || 'Custom').trim(),
      assetClass: asset.assetClass || 'azionario_globale',
      ter: parseFloat(asset.ter) || 0,
      distribution: asset.distribution || 'Accumulazione'
    };

    if (idx >= 0) {
      list[idx] = newObj;
    } else {
      list.push(newObj);
    }

    try {
      localStorage.setItem('finanze_custom_assets', JSON.stringify(list));
      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Restituisce l'elenco di tutte le macro-classi di investimento con label e colori
   */
  getAllAssetClasses() {
    return Object.values(ASSET_CLASSES);
  },

  /**
   * Restituisce i dettagli di una specifica asset class
   */
  getAssetClassMeta(classId) {
    return ASSET_CLASSES[classId] || ASSET_CLASSES.monetario;
  }
};

if (typeof window !== 'undefined') {
  window.AssetCatalogService = AssetCatalogService;
}
