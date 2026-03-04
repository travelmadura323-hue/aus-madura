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
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&h=800&q=80',
    description: 'A land of staggering natural beauty and cultural complexities.',
    region: 'Southeast Asia'
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&w=600&h=800&q=80',
    description: 'A vibrant mix of cultures, modern cities, and lush rainforests.',
    region: 'Southeast Asia'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&w=600&h=800&q=80',
    description: 'A global hub of culture, finance, and entertainment.',
    region: 'Southeast Asia'
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=600&h=800&q=80',
    description: 'The Pearl of the Indian Ocean, rich in history and nature.',
    region: 'South Asia'
  },
  {
    id: 'india',
    name: 'India',
    type: 'domestic',
    image: 'https://images.unsplash.com/photo-1524492707947-2f85a1a24d3c?auto=format&fit=crop&w=600&h=800&q=80',
    description: 'A land of diverse landscapes, ancient history, and vibrant traditions.',
    region: 'South Asia'
  },
  {
    id: 'australia',
    name: 'Australia',
    type: 'international',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&h=600&q=80',
    description: 'From iconic landmarks to stunning beaches and wildlife encounters.',
    region: 'Oceania'
  }
];

export const tours = [
  {
    id: "australia-explorer-7d",
    slug: "australia-explorer-7d",
    title: "Australia Explorer - 7 Days",
    location: {
      country: "Australia",
      cities: ["Sydney", "Melbourne", "Gold Coast"]
    },
    overview: "Discover the best of Australia with iconic landmarks, stunning beaches, wildlife encounters and vibrant city life.",
    duration: {
      days: 7,
      nights: 6
    },
    price: {
      startingFrom: 1750,
      currency: "USD",
      perPerson: true
    },
    travelers: {
      adults: 2,
      children: 1,
      infants: 0
    },
    minimumAge: 5,
    startingPlace: "Chennai, India",
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&h=600&q=80',
    description: "Discover the best of Australia with iconic landmarks, stunning beaches, and vibrant city life.",
    category: 'International',
    rating: 4.8,
    reviews: 124,
    highlights: [
      "Visit the iconic Sydney Opera House",
      "Explore the Great Barrier Reef",
      "Drive along the Great Ocean Road",
      "Meet unique wildlife at Kangaroo Island"
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524820197278-540916411e20?auto=format&fit=crop&w=800&q=80'
    ],

    tourPlan: [
      {
        day: 1,
        title: "Arrival in Sydney",
        description: "Arrive at Sydney Airport, transfer to hotel. Evening at leisure."
      },
      {
        day: 2,
        title: "Sydney City Tour",
        description: "Visit Opera House, Harbour Bridge, Bondi Beach and Darling Harbour."
      },
      {
        day: 3,
        title: "Blue Mountains Excursion",
        description: "Full day trip to Blue Mountains with Scenic World rides."
      },
      {
        day: 4,
        title: "Transfer to Gold Coast",
        description: "Flight to Gold Coast and evening free for shopping."
      },
      {
        day: 5,
        title: "Theme Park Visit",
        description: "Visit Movie World or Sea World."
      },
      {
        day: 6,
        title: "Transfer to Melbourne",
        description: "Flight to Melbourne. Leisure time."
      },
      {
        day: 7,
        title: "Departure",
        description: "Airport transfer and departure."
      }
    ],

    included: [
      "6 Nights Hotel Accommodation",
      "Daily Breakfast",
      "Airport Transfers",
      "Sightseeing Tours",
      "Internal Flights",
      "Travel Insurance"
    ],

    excluded: [
      "International Airfare",
      "Visa Charges",
      "Personal Expenses",
      "Meals Not Mentioned",
      "Optional Tours"
    ],

    relatedPackages: [
      {
        id: "australia-honeymoon-6d",
        title: "Romantic Australia - 6 Days"
      },
      {
        id: "new-zealand-combo-10d",
        title: "Australia + New Zealand Combo"
      }
    ],

    faqs: [
      {
        question: "Do Indian citizens need a visa for Australia?",
        answer: "Yes, Indian passport holders must apply for an Australian tourist visa."
      },
      {
        question: "Best time to visit Australia?",
        answer: "September to November and March to May are ideal seasons."
      },
      {
        question: "Is travel insurance mandatory?",
        answer: "It is highly recommended for international travel."
      }
    ]
  },
  {
    id: "australia-honeymoon-6d",
    slug: "australia-honeymoon-6d",
    title: "Romantic Australia - 6 Days",
    location: {
      country: "Australia",
      cities: ["Sydney", "Hamilton Island"]
    },
    overview: "A romantic getaway featuring the iconic Sydney Harbour and the breathtaking beaches of the Whitsundays.",
    duration: { days: 6, nights: 5 },
    price: { startingFrom: 2200, currency: "USD", perPerson: true },
    image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&w=800&h=600&q=80',
    category: 'Honeymoon Tourism',
    tourPlan: [
      { day: 1, title: "Arrival in Sydney", description: "Romantic dinner overlooking the Opera House." },
      { day: 2, title: "Sydney Harbour Seaplane", description: "Scenic flight and gourmet lunch at a secluded beach." },
      { day: 3, title: "Flight to Hamilton Island", description: "Check-in to a luxury beachfront resort." },
      { day: 4, title: "Great Barrier Reef Cruise", description: "Full day snorkeling and helicopter tour over Heart Reef." },
      { day: 5, title: "Whitehaven Beach Relax", description: "Private picnic on the world's most beautiful beach." },
      { day: 6, title: "Departure", description: "Transfer to airport for departure." }
    ]
  },
  {
    id: "australia-adventure-8d",
    slug: "australia-adventure-8d",
    title: "Outback Adventure - 8 Days",
    location: {
      country: "Australia",
      cities: ["Alice Springs", "Uluru", "Kings Canyon"]
    },
    overview: "Explore the red heart of Australia with desert treks, stargazing, and cultural encounters.",
    duration: { days: 8, nights: 7 },
    price: { startingFrom: 1950, currency: "USD", perPerson: true },
    image: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&w=800&h=600&q=80',
    category: 'Sports Tourism',
    tourPlan: [
      { day: 1, title: "Arrive Alice Springs", description: "Welcome dinner and orientation." },
      { day: 2, title: "West MacDonnell Ranges", description: "Hike through stunning gorges and swim in permanent waterholes." }
    ]
  },
  {
    id: "australia-reef-rainforest-9d",
    slug: "australia-reef-rainforest-9d",
    title: "Reef & Rainforest - 9 Days",
    location: {
      country: "Australia",
      cities: ["Cairns", "Port Douglas", "Daintree"]
    },
    overview: "Dive into the Great Barrier Reef and wander through the world's oldest living rainforest.",
    duration: { days: 9, nights: 8 },
    price: { startingFrom: 2100, currency: "USD", perPerson: true },
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&h=600&q=80',
    category: 'Family Tourism'
  },
  {
    id: "australia-tasmania-wild-7d",
    slug: "australia-tasmania-wild-7d",
    title: "Wild Tasmania - 7 Days",
    location: {
      country: "Australia",
      cities: ["Hobart", "Wineglass Bay", "Cradle Mountain"]
    },
    overview: "Experience the rugged beauty and unique wildlife of Australia's island state.",
    duration: { days: 7, nights: 6 },
    price: { startingFrom: 1800, currency: "USD", perPerson: true },
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&h=600&q=80',
    category: 'International'
  },
  {
    id: 'kerala-backwaters',
    slug: '7-days-kerala-backwaters',
    title: '7 Days Kerala Backwaters',
    location: {
      country: 'India',
      cities: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey']
    },
    duration: {
      days: 7,
      nights: 6
    },
    price: {
      startingFrom: 850,
      currency: "USD",
      perPerson: true
    },
    image: 'https://picsum.photos/seed/kbw/600/400',
    category: 'Family Tourism',
    overview: 'A journey through the tranquil backwaters of Alleppey and the hills of Munnar.',
    tourPlan: [
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
    location: {
      country: 'India',
      cities: ['Jaipur', 'Jodhpur', 'Jaisalmer']
    },
    duration: {
      days: 10,
      nights: 9
    },
    price: {
      startingFrom: 1250,
      currency: "USD",
      perPerson: true
    },
    image: 'https://picsum.photos/seed/raj/600/400',
    category: 'Cultural Tourism',
    overview: 'Explore the pink city of Jaipur, the blue city of Jodhpur, and the golden sands of Jaisalmer.'
  },
  {
    id: 'vietnam-essence',
    slug: 'essential-vietnam-10d',
    title: 'Essential Vietnam - 10 Days',
    location: { country: 'Vietnam', cities: ['Hanoi', 'Halong Bay', 'Hoi An', 'Ho Chi Minh City'] },
    duration: { days: 10, nights: 9 },
    price: { startingFrom: 1450, currency: 'USD', perPerson: true },
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&h=800&q=80',
    category: 'International'
  },
  {
    id: 'malaysia-modern-wild',
    slug: 'malaysia-modern-wild-8d',
    title: 'Modern & Wild Malaysia',
    location: { country: 'Malaysia', cities: ['Kuala Lumpur', 'Langkawi', 'Taman Negara'] },
    duration: { days: 8, nights: 7 },
    price: { startingFrom: 1100, currency: 'USD', perPerson: true },
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&w=600&h=800&q=80',
    category: 'Family Tourism'
  },
  {
    id: 'singapore-luxury-escape',
    slug: 'singapore-luxury-escape-5d',
    title: 'Singapore Luxury Escape',
    location: { country: 'Singapore', cities: ['Sentosa', 'Marina Bay', 'Orchard Road'] },
    duration: { days: 5, nights: 4 },
    price: { startingFrom: 1350, currency: 'USD', perPerson: true },
    image: 'https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&w=600&h=800&q=80',
    category: 'Luxury Tourism'
  },
  {
    id: 'sri-lanka-classical',
    slug: 'classical-sri-lanka-9d',
    title: 'Classical Sri Lanka',
    location: { country: 'Sri Lanka', cities: ['Colombo', 'Kandy', 'Sigiriya', 'Ella'] },
    duration: { days: 9, nights: 8 },
    price: { startingFrom: 950, currency: 'USD', perPerson: true },
    image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=600&h=800&q=80',
    category: 'Cultural Tourism'
  },
  {
    id: 'india-golden-triangle',
    slug: 'golden-triangle-luxury',
    title: 'Golden Triangle Luxury Tour',
    location: { country: 'India', cities: ['Delhi', 'Agra', 'Jaipur'] },
    duration: { days: 6, nights: 5 },
    price: { startingFrom: 1100, currency: 'USD', perPerson: true },
    image: 'https://images.unsplash.com/photo-1524492707947-2f85a1a24d3c?auto=format&fit=crop&w=800&q=80',
    description: "Explore the historic cities of Delhi, Agra, and Jaipur in ultimate luxury and style.",
    category: 'Luxury Tourism'
  },
  {
    id: 'vietnam-adventure',
    slug: 'vietnam-adventure-8d',
    title: 'Northern Vietnam Adventure',
    location: { country: 'Vietnam', cities: ['Hanoi', 'Sapa', 'Ninh Binh'] },
    duration: { days: 8, nights: 7 },
    price: { startingFrom: 1250, currency: 'USD', perPerson: true },
    image: 'https://images.unsplash.com/photo-1509030450996-939983783ee8?auto=format&fit=crop&w=800&q=80',
    description: "Trek through the stepped rice fields of Sapa and explore the unique karst landscapes of Northern Vietnam.",
    category: 'Sports Tourism'
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

