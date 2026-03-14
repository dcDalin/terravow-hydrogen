export interface ComparisonRow {
  feature: string;
  terravow: string;
  generic: string;
  highlight?: boolean; // Optional flag to highlight important differences
}

export interface ProductComparison {
  title: string;
  subtitle: string;
  rows: ComparisonRow[];
}

// Comparison database organized by product handle
export const comparisonsByProduct: Record<string, ProductComparison> = {
  default: {
    title: 'TerraVow vs. Generic Supplements',
    subtitle: 'See how TerraVow stands out from the competition',
    rows: [
      {
        feature: 'Ingredient Quality',
        terravow: 'Premium, third-party tested ingredients',
        generic: 'Standard quality ingredients',
        highlight: true,
      },
      {
        feature: 'Formulation',
        terravow: 'Science-backed, synergistic blends',
        generic: 'Single-ingredient formulas',
      },
      {
        feature: 'Bioavailability',
        terravow: 'Enhanced absorption technology',
        generic: 'Standard absorption',
        highlight: true,
      },
      {
        feature: 'Manufacturing',
        terravow: 'GMP-certified facilities in USA',
        generic: 'Varies by brand',
      },
      {
        feature: 'Testing',
        terravow: 'Third-party lab tested for purity',
        generic: 'Limited or no testing',
        highlight: true,
      },
      {
        feature: 'Price Point',
        terravow: 'Premium value for quality',
        generic: 'Budget-friendly',
      },
    ],
  },

  'terravow-neuro-support': {
    title: 'TerraVow Neuro Support vs. Generic Nerve Supplements',
    subtitle: 'Why TerraVow is the superior choice for nerve health',
    rows: [
      {
        feature: 'Alpha-Lipoic Acid',
        terravow: '600mg R-ALA (bioactive form)',
        generic: '300mg standard ALA',
        highlight: true,
      },
      {
        feature: 'Vitamin B12',
        terravow: 'Methylcobalamin (active form)',
        generic: 'Cyanocobalamin (synthetic)',
        highlight: true,
      },
      {
        feature: 'Acetyl-L-Carnitine',
        terravow: '500mg for nerve repair',
        generic: 'Often not included',
      },
      {
        feature: 'B-Vitamin Complex',
        terravow: 'Full spectrum B-complex with active forms',
        generic: 'Basic B1, B6, B12 only',
      },
      {
        feature: 'Benfotiamine',
        terravow: '150mg fat-soluble B1',
        generic: 'Water-soluble thiamine',
        highlight: true,
      },
      {
        feature: 'Daily Serving',
        terravow: '2 capsules - complete daily support',
        generic: '1-4 capsules varies',
      },
    ],
  },

  'terravow-nad-cellular-renewal': {
    title: 'TerraVow NAD+ vs. Generic NAD Boosters',
    subtitle: 'Advanced cellular renewal technology that works',
    rows: [
      {
        feature: 'NMN Dosage',
        terravow: '500mg pharmaceutical-grade NMN',
        generic: '250mg or less',
        highlight: true,
      },
      {
        feature: 'Resveratrol',
        terravow: 'Trans-resveratrol 200mg (active form)',
        generic: 'Mixed resveratrol or none',
        highlight: true,
      },
      {
        feature: 'TMG (Betaine)',
        terravow: '500mg for methylation support',
        generic: 'Often not included',
      },
      {
        feature: 'Pterostilbene',
        terravow: '50mg for enhanced bioavailability',
        generic: 'Rarely included',
      },
      {
        feature: 'Absorption',
        terravow: 'Liposomal delivery system',
        generic: 'Standard capsule',
        highlight: true,
      },
      {
        feature: 'Testing',
        terravow: '99%+ purity verified by third-party labs',
        generic: 'Purity not disclosed',
      },
    ],
  },

  'terravow-magnesium-restore': {
    title: 'TerraVow Magnesium Restore vs. Generic Magnesium',
    subtitle: 'Multiple forms for maximum effectiveness',
    rows: [
      {
        feature: 'Magnesium Forms',
        terravow: '4 bioavailable forms (Glycinate, Malate, Taurate, L-Threonate)',
        generic: 'Single form (usually oxide)',
        highlight: true,
      },
      {
        feature: 'Elemental Magnesium',
        terravow: '400mg from chelated sources',
        generic: '200-250mg often poorly absorbed',
      },
      {
        feature: 'Absorption Rate',
        terravow: 'Up to 90% absorption',
        generic: '10-20% (oxide form)',
        highlight: true,
      },
      {
        feature: 'Brain Support',
        terravow: 'Magnesium L-Threonate crosses blood-brain barrier',
        generic: 'No brain-specific form',
        highlight: true,
      },
      {
        feature: 'Digestive Comfort',
        terravow: 'Gentle on stomach (glycinate)',
        generic: 'May cause digestive issues',
      },
      {
        feature: 'Sleep & Relaxation',
        terravow: 'Taurate & Glycinate for calm',
        generic: 'Limited relaxation benefits',
      },
    ],
  },

  'terravow-turmeric-defense': {
    title: 'TerraVow Turmeric Defense vs. Generic Turmeric',
    subtitle: 'Superior curcumin with enhanced absorption',
    rows: [
      {
        feature: 'Curcumin Concentration',
        terravow: '95% curcuminoids (1500mg)',
        generic: 'Low concentration or unstandardized',
        highlight: true,
      },
      {
        feature: 'BioPerine® (Black Pepper)',
        terravow: '15mg for 2000% better absorption',
        generic: 'No absorption enhancer',
        highlight: true,
      },
      {
        feature: 'Ginger Root',
        terravow: '200mg for synergistic anti-inflammatory effect',
        generic: 'Turmeric only',
      },
      {
        feature: 'Turmeric Source',
        terravow: 'Organic, non-GMO turmeric root',
        generic: 'Standard turmeric powder',
      },
      {
        feature: 'Joint Support',
        terravow: 'Clinically effective dosages',
        generic: 'Underdosed formulas',
        highlight: true,
      },
      {
        feature: 'Additives',
        terravow: 'No fillers, artificial colors, or preservatives',
        generic: 'May contain unnecessary additives',
      },
    ],
  },
};
