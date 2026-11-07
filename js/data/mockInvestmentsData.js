/**
 * Mock Data Store - Sezione Investimenti & Simulator
 */

export const mockInvestmentsData = {
  // Metriche di Sintesi Portafoglio
  portfolioSummary: {
    totalInvested: 42500.00,
    currentValue: 48920.50,
    totalProfitLoss: 6420.50,
    totalProfitLossPercent: 15.11,
    annualizedReturn: 8.4,
    monthlyPacContribution: 600.00
  },

  // Asset Allocation
  allocation: [
    { category: 'Azionario Globale (All-World ETF)', amount: 26906.28, percentage: 55, color: '#0071E3' }, // Apple Blue
    { category: 'Obbligazionario Governativo & Corporate', amount: 9784.10, percentage: 20, color: '#34C759' }, // Apple Green
    { category: 'Mercati Emergenti (Emerging Markets)', amount: 4892.05, percentage: 10, color: '#FF9500' }, // Apple Orange
    { category: 'Oro & Materie Prime (ETC)', amount: 3913.64, percentage: 8, color: '#AF52DE' }, // Apple Purple
    { category: 'Liquidità Remunerata / Cash', amount: 3424.43, percentage: 7, color: '#5856D6' } // Apple Indigo
  ],

  // Strumenti & Posizioni Aperte
  holdings: [
    {
      id: 'inv_01',
      ticker: 'VWCE',
      name: 'Vanguard FTSE All-World UCITS ETF',
      isin: 'IE00BK5BQT80',
      type: 'ETF Azionario',
      shares: 185,
      pmc: 105.40,
      currentPrice: 124.60,
      investedAmount: 19499.00,
      currentValue: 23051.00,
      pnl: 3552.00,
      pnlPercent: 18.22,
      isPac: true,
      pacMonthly: 350.00
    },
    {
      id: 'inv_02',
      ticker: 'VAGF',
      name: 'Vanguard Global Aggregate Bond UCITS ETF',
      isin: 'IE00BG47KH54',
      type: 'ETF Obbligazionario',
      shares: 380,
      pmc: 24.80,
      currentPrice: 25.75,
      investedAmount: 9424.00,
      currentValue: 9785.00,
      pnl: 361.00,
      pnlPercent: 3.83,
      isPac: true,
      pacMonthly: 150.00
    },
    {
      id: 'inv_03',
      ticker: 'EIMI',
      name: 'iShares Core MSCI EM IMI UCITS ETF',
      isin: 'IE00BKM4GZ66',
      type: 'ETF Azionario Emergenti',
      shares: 145,
      pmc: 29.50,
      currentPrice: 33.74,
      investedAmount: 4277.50,
      currentValue: 4892.30,
      pnl: 614.80,
      pnlPercent: 14.37,
      isPac: true,
      pacMonthly: 100.00
    },
    {
      id: 'inv_04',
      ticker: 'SGLD',
      name: 'Invesco Physical Gold ETC',
      isin: 'IE00B579F325',
      type: 'Materie Prime / Oro',
      shares: 20,
      pmc: 165.00,
      currentPrice: 195.68,
      investedAmount: 3300.00,
      currentValue: 3913.60,
      pnl: 613.60,
      pnlPercent: 18.59,
      isPac: false,
      pacMonthly: 0
    },
    {
      id: 'inv_05',
      ticker: 'CASH',
      name: 'Conto Deposito Libero 3.5%',
      isin: 'MONEY-MKT',
      type: 'Liquidità Remunerata',
      shares: 1,
      pmc: 3200.00,
      currentPrice: 3424.43,
      investedAmount: 3200.00,
      currentValue: 3424.43,
      pnl: 224.43,
      pnlPercent: 7.01,
      isPac: false,
      pacMonthly: 0
    }
  ],

  // Pillole di Educazione Finanziaria & Investimento
  financialPills: [
    {
      id: 'pill_01',
      tag: 'Strategia',
      title: 'La Magia dell\'Interesse Composto',
      snippet: 'Albert Einstein la definiva l\'ottava meraviglia del mondo: reinvestire gli interessi generati produce rendimenti esponenziali nel tempo.',
      details: 'Quando i tuoi investimenti maturano interessi, questi ultimi iniziano a generare ulteriori rendimenti. Su un orizzonte temporale di 15-20 anni, la quota generata dall\'interesse composto supera spesso il capitale effettivamente versato.',
      readTime: '2 min',
      icon: 'sparkles'
    },
    {
      id: 'pill_02',
      tag: 'PAC & Metodo',
      title: 'Dollar-Cost Averaging (PAC)',
      snippet: 'Investire una somma fissa a intervalli regolari riduce drasticamente l\'impatto della volatilità e l\'ansia del "timing" di mercato.',
      details: 'Con il Piano di Accumulo del Capitale acquisti più quote quando i mercati scendono (a sconto) e meno quote quando salgono. Questo meccanismo abbatte il prezzo medio di carico (PMC) e annulla l\'errore psicologico di voler indovinare il momento perfetto per comprare.',
      readTime: '3 min',
      icon: 'repeat'
    },
    {
      id: 'pill_03',
      tag: 'Gestione Rischio',
      title: 'Diversificazione Globale e Asset Allocation',
      snippet: 'Non mettere tutte le uova nello stesso paniere: l\'allocazione tra asset diversi è responsabile di oltre il 90% della variabilità dei rendimenti.',
      details: 'Distribuire il capitale su migliaia di aziende globali tramite ETF diversificati riduce a zero il rischio specifico di fallimento della singola società. L\'obbligazionario e l\'oro agiscono da cuscinetto protettivo nelle fasi di correzione dell\'azionario.',
      readTime: '3 min',
      icon: 'shield'
    },
    {
      id: 'pill_04',
      tag: 'Psicologia',
      title: 'Il Rumore di Breve Termine vs Trend Secolare',
      snippet: 'I mercati azionari nel breve termine sono una macchina elettorale guidata dalle emozioni; nel lungo termine sono una bilancia guidata dalla crescita degli utili.',
      details: 'Le correzioni di mercato del 10-15% sono fisiologiche e si verificano statisticamente quasi ogni anno. I migliori rendimenti storici appartengono a chi mantiene la rotta e non vende durante i cali temporanei.',
      readTime: '2 min',
      icon: 'trending'
    }
  ]
};
