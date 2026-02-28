export const destinations = [
  {
    id: 'kerala',
    name: 'Kerala',
    type: 'domestic',
    image: 'https://picsum.photos/seed/kerala/800/600',
    description: 'Experience the serene backwaters and lush greenery of Gods Own Country.',
    region: 'South India'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    type: 'domestic',
    image: 'https://picsum.photos/seed/rajasthan/800/600',
    description: 'Discover the royal heritage and majestic forts of the Land of Kings.',
    region: 'North India'
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    type: 'international',
    image: 'https://picsum.photos/seed/vietnam/800/600',
    description: 'A land of staggering natural beauty and cultural complexities.',
    region: 'Southeast Asia'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    type: 'international',
    image: 'https://picsum.photos/seed/singapore/800/600',
    description: 'A global hub of culture, finance, and entertainment.',
    region: 'Southeast Asia'
  }
];

export const tours = [
  {
    id: 'kerala-backwaters',
    slug: '7-days-kerala-backwaters',
    title: '7 Days Kerala Backwaters',
    location: 'Kerala, India',
    duration: '7 Days / 6 Nights',
    price: 850,
    image: 'https://picsum.photos/seed/kbw/600/400',
    category: 'Family Tourism',
    description: 'A journey through the tranquil backwaters of Alleppey and the hills of Munnar.',
    plan: [
      { day: 1, title: 'Arrival in Kochi', description: 'Welcome to Kochi. Transfer to hotel and evening harbor cruise.' },
      { day: 2, title: 'Munnar Sightseeing', description: 'Drive to Munnar, visit tea plantations and Eravikulam National Park.' },
      { day: 3, title: 'Thekkady Wildlife', description: 'Boating in Periyar Lake and spice plantation tour.' },
      { day: 4, title: 'Alleppey Houseboat', description: 'Check-in to a traditional houseboat for an overnight stay.' }
    ]
  },
  {
    id: 'rajasthan-heritage',
    slug: 'rajasthan-royal-heritage',
    title: 'Rajasthan Royal Heritage Tour',
    location: 'Rajasthan, India',
    duration: '10 Days / 9 Nights',
    price: 1250,
    image: 'https://picsum.photos/seed/raj/600/400',
    category: 'Cultural Tourism',
    description: 'Explore the pink city of Jaipur, the blue city of Jodhpur, and the golden sands of Jaisalmer.'
  },
  {
    id: 'vietnam-escape',
    slug: 'vietnam-6-days-escape',
    title: 'Vietnam 6 Days Escape',
    location: 'Vietnam',
    duration: '6 Days / 5 Nights',
    price: 1650,
    image: 'https://picsum.photos/seed/vtn/600/400',
    category: 'International',
    description: 'From the bustling streets of Hanoi to the emerald waters of Ha Long Bay.'
  }
];

export const categories = [
  { id: 'medical', name: 'Medical Tourism', slug: 'medical-tourism' },
  { id: 'spiritual', name: 'Spiritual Tourism', slug: 'spiritual-tourism' },
  { id: 'wellness', name: 'Wellness Tourism', slug: 'wellness-tourism' },
  { id: 'family', name: 'Family Tourism', slug: 'family-tourism' },
  { id: 'honeymoon', name: 'Honeymoon Tourism', slug: 'honeymoon-tourism' },
  { id: 'sports', name: 'Sports Tourism', slug: 'sports-tourism' }
];
