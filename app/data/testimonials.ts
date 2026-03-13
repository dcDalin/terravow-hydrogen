export interface Testimonial {
  imageUrl: string;
  name: string;
  starRating: number;
  review: string;
}

// Testimonial database organized by product handle
export const testimonialsByProduct: Record<string, Testimonial[]> = {
  default: [
    {
      imageUrl: 'https://i.pravatar.cc/150?img=47',
      name: 'Sarah Mitchell',
      starRating: 5.0,
      review:
        'This product exceeded all my expectations. The quality is outstanding and I have already recommended it to all my friends!',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=32',
      name: 'Emily Rodriguez',
      starRating: 4.5,
      review:
        'Amazing results! I noticed a difference within the first week. Highly recommend to anyone looking for quality.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=65',
      name: 'Jessica Chen',
      starRating: 5.0,
      review:
        'Absolutely love this! The packaging is beautiful and the product itself is top-notch. Worth every penny.',
    },
  ],

  'terravow-neuro-support': [
    {
      imageUrl: 'https://i.pravatar.cc/150?img=21',
      name: 'Robert Hayes',
      starRating: 5.0,
      review:
        'I started taking Neuro Support because of constant tingling and burning in my feet at night. After about 3 weeks the sensation calmed down significantly. The alpha-lipoic acid and B12 combo seems to really work.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=31',
      name: 'Deborah Collins',
      starRating: 4.5,
      review:
        'My hands used to go numb when typing for long periods. Since starting TerraVow Neuro Support the numbness is far less frequent. I like that it includes acetyl-L-carnitine for nerve repair.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=52',
      name: 'Anthony Walker',
      starRating: 5.0,
      review:
        'I’ve tried multiple nerve supplements but this is the first one where I actually felt a difference. The burning sensation in my legs has improved and I’m sleeping better.',
    },
  ],

  'terravow-nad-cellular-renewal': [
    {
      imageUrl: 'https://i.pravatar.cc/150?img=45',
      name: 'Olivia Bennett',
      starRating: 5.0,
      review:
        'I started NAD+ Cellular Renewal mainly for energy. Around week two I noticed my afternoon crash basically disappeared. The NMN and resveratrol combo feels like it actually boosts my energy production.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=34',
      name: 'Jason Liu',
      starRating: 4.5,
      review:
        'After about a month on this supplement I feel sharper mentally and much less fatigued during long work days. Definitely one of the better NAD formulas I’ve tried.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=56',
      name: 'Natalie Brooks',
      starRating: 5.0,
      review:
        'I bought this for anti-aging support but what surprised me most was the increase in daily energy. I wake up feeling much more refreshed.',
    },
  ],

  'terravow-magnesium-restore': [
    {
      imageUrl: 'https://i.pravatar.cc/150?img=26',
      name: 'Ashley Parker',
      starRating: 5.0,
      review:
        'I used to wake up multiple times a night. After taking Magnesium Restore for about a week I started sleeping through the night. The glycinate form really helps with relaxation.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=18',
      name: 'Brian Walsh',
      starRating: 4.5,
      review:
        'I train 5 days a week and muscle cramps were becoming an issue. Since adding this magnesium complex the cramps have almost completely stopped.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=63',
      name: 'Nicole Adams',
      starRating: 5.0,
      review:
        'The blend of different magnesium types makes a huge difference. I feel calmer in the evenings and my sleep quality has improved a lot.',
    },
  ],

  'terravow-turmeric-defense': [
    {
      imageUrl: 'https://i.pravatar.cc/150?img=39',
      name: 'David Morales',
      starRating: 5.0,
      review:
        'My knees used to feel stiff every morning. After about two weeks of Turmeric Defense the stiffness started improving noticeably. The curcumin with black pepper really works.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=49',
      name: 'Karen Phillips',
      starRating: 4.5,
      review:
        'I take this after workouts to help with inflammation. The ginger and turmeric combination helps my joints recover faster.',
    },
    {
      imageUrl: 'https://i.pravatar.cc/150?img=16',
      name: 'Anthony Russo',
      starRating: 5.0,
      review:
        'Great turmeric supplement. Within a few weeks my shoulder discomfort from old injuries improved significantly.',
    },
  ],
};
