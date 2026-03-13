export interface FAQ {
  question: string;
  answer: string;
}

// FAQ database organized by product handle
export const faqsByProduct: Record<string, FAQ[]> = {
  // Default FAQs for all products
  default: [
    {
      question: 'How long does shipping take?',
      answer:
        'We offer free standard shipping on orders over $75, which typically takes 5-7 business days. Expedited shipping options are available at checkout for faster delivery.',
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 90-day money-back guarantee. If you\'re not completely satisfied with your purchase, you can return it for a full refund within 90 days of delivery.',
    },
    {
      question: 'How should I take this supplement?',
      answer:
        'Take as directed on the product label, typically with food and water. For best results, maintain consistency by taking at the same time each day. Consult with your healthcare provider before starting any new supplement regimen.',
    },
    {
      question: 'Are there any side effects?',
      answer:
        'Our products are made with high-quality, natural ingredients and are generally well-tolerated. However, individual reactions may vary. If you experience any adverse effects, discontinue use and consult your healthcare provider.',
    },
  ],

  'terravow-neuro-support': [
    {
      question: 'How long until I notice results?',
      answer:
        'Most users report noticing improvements in nerve comfort and tingling sensations within 2-4 weeks of consistent use. For optimal results, we recommend taking Neuro Support for at least 90 days as nerve health improvements are gradual.',
    },
    {
      question: 'What makes this different from other nerve supplements?',
      answer:
        'TerraVow Neuro Support combines premium forms of alpha-lipoic acid, acetyl-L-carnitine, and methylcobalamin (B12) in clinically-studied doses. We use superior ingredient forms for better absorption and effectiveness compared to standard nerve formulas.',
    },
    {
      question: 'Can I take this with my diabetes medication?',
      answer:
        'While our ingredients are generally safe, alpha-lipoic acid may affect blood sugar levels. We strongly recommend consulting with your healthcare provider before combining this supplement with diabetes medications to ensure proper monitoring.',
    },
    {
      question: 'Is this safe for long-term use?',
      answer:
        'Yes, Neuro Support is formulated for ongoing daily use. The ingredients have extensive safety profiles when taken as directed. Many customers take this product continuously to maintain nerve health and comfort.',
    },
  ],

  'terravow-nad-cellular-renewal': [
    {
      question: 'What time of day should I take NAD+ Cellular Renewal?',
      answer:
        'We recommend taking it in the morning with breakfast. NAD+ supports energy production, so morning intake helps you maximize daytime energy levels. Avoid taking it late in the evening as it may interfere with sleep.',
    },
    {
      question: 'How is NMN different from NR?',
      answer:
        'Both NMN (nicotinamide mononucleotide) and NR (nicotinamide riboside) are NAD+ precursors, but NMN is one step closer to NAD+ in the conversion pathway, potentially offering faster absorption and conversion. Our formula uses premium NMN for optimal effectiveness.',
    },
    {
      question: 'Will this help with my energy levels?',
      answer:
        'Yes! NAD+ is essential for cellular energy production. Most users report noticeable improvements in daily energy and reduction in afternoon fatigue within 2-4 weeks of consistent use.',
    },
    {
      question: 'Can I take this if I\'m under 30?',
      answer:
        'While NAD+ Cellular Renewal is primarily designed for adults 30+ experiencing age-related energy decline, it\'s safe for younger adults. However, younger individuals with adequate NAD+ levels may experience less dramatic effects.',
    },
  ],

  'terravow-magnesium-restore': [
    {
      question: 'Why use multiple forms of magnesium?',
      answer:
        'Different magnesium forms have unique benefits and absorption rates. Our complex includes glycinate for relaxation and sleep, malate for energy, and taurate for cardiovascular support, providing comprehensive benefits you can\'t get from single-form supplements.',
    },
    {
      question: 'Will this help me sleep better?',
      answer:
        'Yes! Magnesium glycinate is known for promoting relaxation and improving sleep quality. Most users report falling asleep faster and experiencing deeper, more restful sleep within 1-2 weeks of nightly use.',
    },
    {
      question: 'Can this help with muscle cramps?',
      answer:
        'Absolutely. Magnesium deficiency is a common cause of muscle cramps and spasms. Our formula provides highly absorbable forms that help maintain proper muscle function. Most athletes and active individuals notice reduced cramping within 2-3 weeks.',
    },
    {
      question: 'Should I take this on an empty stomach?',
      answer:
        'We recommend taking Magnesium Restore with food to enhance absorption and minimize any potential digestive sensitivity. Taking it with your evening meal is ideal for promoting nighttime relaxation.',
    },
  ],

  'terravow-turmeric-defense': [
    {
      question: 'Why is black pepper included?',
      answer:
        'Black pepper extract (piperine) increases curcumin absorption by up to 2000%. Without it, most curcumin passes through the body unused. This combination ensures you get the maximum anti-inflammatory benefits from the turmeric.',
    },
    {
      question: 'How long before I feel less joint discomfort?',
      answer:
        'Many users notice reduced morning stiffness and improved joint comfort within 2-3 weeks. For more significant improvements in chronic joint issues, consistent use for 6-8 weeks is recommended as turmeric\'s benefits are cumulative.',
    },
    {
      question: 'Is this safe to take daily?',
      answer:
        'Yes, our Turmeric Defense formula is designed for daily use. Turmeric has been safely consumed for thousands of years, and the added ginger provides additional digestive support. Take as directed for ongoing anti-inflammatory benefits.',
    },
    {
      question: 'Can I take this with fish oil or other supplements?',
      answer:
        'Yes, turmeric actually works synergistically with omega-3s from fish oil for enhanced anti-inflammatory effects. Always space supplements 30 minutes apart if taking multiple products, and consult your healthcare provider about your specific supplement regimen.',
    },
  ],
};
