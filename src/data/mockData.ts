const gallery = import.meta.glob('/images/**/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
});

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
    id: "australia-queensland",
    slug: "australia-queensland",
    title: "Queensland Coastal Experience 07 Days Tour Package",
    location: {
      country: "Australia",
      cities: ["Sydney", "Melbourne", "Gold Coast"]
    },
    overview: "Gold Coast and Cairns showcase Australia’s coastal beauty. Gold Coast is known for golden beaches, vibrant city life, theme parks, and surfing culture, while Cairns is the gateway to the Great Barrier Reef, tropical rainforests, crystal-clear waters, and unforgettable nature-based adventures.",
    duration: { days: 7, nights: 6 },
    price: { startingFrom: 1750, currency: "USD", perPerson: true },
    travelers: { adults: 2, children: 1, infants: 0 },
    minimumAge: 5,
    startingPlace: "Gold Coast",
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&h=600&q=80',
    description: "Discover the best of Australia with iconic landmarks, stunning beaches, and vibrant city life.",
    category: 'Group Tourism',
    rating: 4.8,
    reviews: 124,
    highlights: [
      "Visit the iconic Sydney Opera House",
      "Explore the Great Barrier Reef",
      "Drive along the Great Ocean Road",
      "Meet unique wildlife at Kangaroo Island"
    ],
    gallery: [
      gallery['/images/queensland/1.png'] as string,
      gallery['/images/queensland/2.png'] as string,
      gallery['/images/queensland/3.png'] as string,
      gallery['/images/queensland/4.webp'] as string,
    ],
    tourPlan: [
      { day: 1, title: "Gold Coast Arrival", description: "G'day! Welcome to Australia- Arrive at Brisbane Airport and enjoy a comfortable private transfer to your hotel in Gold Coast. After check-in, the rest of the day is free to relax, explore nearby beaches, or unwind after your journey." },
      { day: 2, title: "A Day in Movie World", description: "Morning Breakfast and then enjoy a full-day visit to Warner Bros. Movie World with SIC transfers. Features thrilling rides, live shows, and attractions based on famous movies and superheroes." },
      { day: 3, title: "A Day in Sea World", description: "Morning Breakfast, Today, proceed on a full-day Sea World tour. Explore marine life, enjoy dolphin and seal performances, experience thrilling attractions." },
      { day: 4, title: "Gold Coast Departure - Cairns Arrival", description: "Morning Breakfast, check out from the hotel, transfer to Brisbane/Gold Coast Airport for your flight to Cairns. Upon arrival, private transfer to your Cairns hotel." },
      { day: 5, title: "Full Day Bigcat Green Island Tour", description: "Morning breakfast, Set out on a full-day Big Cat Green Island tour. Snorkel among vibrant marine life, relax on pristine beaches." },
      { day: 6, title: "Full Day at Kurunda Rainforest tour", description: "Explore the lush tropical paradise of Kuranda Rainforest. Travel by scenic Railway, enjoy the Army Duck Rainforest Tour, Tropical Fruit Orchard, Aboriginal Experience, and Koala Park." },
      { day: 7, title: "Departure", description: "Morning breakfast, check out before 1000 hrs. Proceed with a one-way airport transfer to depart from Cairns." }
    ],
    included: [
      "Accommodation with breakfast",
      "Arrival and departure transfer",
      "Visa services",
      "Sightseeing as per the itinerary",
      "Admission to Movie World on SIC basis",
      "Admission to Sea World in SIC basis"
    ],
    excluded: [
      "International Airfare",
      "Visa Charges",
      "Personal Expenses",
      "Meals Not Mentioned",
      "Optional Tours"
    ],
    relatedPackages: [],
    faqs: [
      { question: "Do Indian citizens need a visa for Australia?", answer: "Yes, Indian passport holders must apply for an Australian tourist visa." },
      { question: "Best time to visit Australia?", answer: "September to November and March to May are ideal seasons." },
      { question: "Is travel insurance mandatory?", answer: "It is highly recommended for international travel." }
    ]
  },
  {
    id: 'kerala-backwaters',
    numericId: 1,
    slug: '7-days-kerala-backwaters',
    title: '7 Days Kerala Backwaters',
    location: { country: 'India', cities: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey'] },
    duration: { days: 7, nights: 6 },
    price: { startingFrom: 850, currency: "USD", perPerson: true },
    travelers: { adults: 2, children: 1, infants: 0 },
    minimumAge: 3,
    startingPlace: "Kochi",
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: "A serene journey through God’s Own Country.",
    category: 'Family Tourism',
    rating: 4.9,
    reviews: 210,
    highlights: ["Munnar Tea Gardens", "Periyar Wildlife Sanctuary", "Overnight Houseboat stay", "Traditional Kerala Cuisine"],
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1620005720188-75cbaae741aa?auto=format&fit=crop&w=800&q=80"
    ],
    overview: 'A journey through the tranquil backwaters of Alleppey and the hills of Munnar.',
    tourPlan: [
      { day: 1, title: 'Arrival in Kochi', description: 'Welcome to Kochi. Transfer to hotel and evening harbor cruise.' },
      { day: 2, title: 'Munnar Sightseeing', description: 'Drive to Munnar, visit tea plantations and Eravikulam National Park.' },
      { day: 3, title: 'Thekkady Wildlife', description: 'Boating in Periyar Lake and spice plantation tour.' },
      { day: 4, title: 'Alleppey Houseboat', description: 'Check-in to a traditional houseboat for an overnight stay.' },
      { day: 5, title: 'Kumarakom Relaxation', description: 'Relax by the tranquil Vembanad Lake.' },
      { day: 6, title: 'Kovalam Beach', description: 'Enjoy the sandy shores of Kovalam.' },
      { day: 7, title: 'Departure from Trivandrum', description: 'Transfer to the Trivandrum airport for your onward journey.' }
    ],
    included: ["AC Accommodation", "Daily Breakfast", "Private AC Vehicle", "Houseboat Stay with all meals"],
    excluded: ["Flight Tickets", "Entry Feeds", "Personal Expenses", "Camera Fees"],
    relatedPackages: [],
    faqs: [
      { question: "What is the physical intensity of this tour?", answer: "Very low, strictly leisure." },
      { question: "Are infant meals provided?", answer: "You must request these ahead of time during booking." }
    ]
  },
  {
    id: 'rajasthan-heritage',
    numericId: 2,
    slug: 'rajasthan-royal-heritage',
    title: 'Rajasthan Royal Heritage Tour',
    location: { country: 'India', cities: ['Jaipur', 'Jodhpur', 'Jaisalmer'] },
    duration: { days: 10, nights: 9 },
    price: { startingFrom: 1250, currency: "USD", perPerson: true },
    travelers: { adults: 2, children: 0, infants: 0 },
    minimumAge: 5,
    startingPlace: "Jaipur",
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80',
    description: "Immerse yourself in the rich culture and regal traditions of Rajasthan.",
    category: 'Cultural Tourism',
    rating: 4.8,
    reviews: 185,
    highlights: ["Elephant ride at Amber Fort", "Desert Safari in Jaisalmer", "Mehrangarh Fort Tour", "Traditional Rajasthani Folk Dance"],
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846140?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559828552-32deeeaf5ea3?auto=format&fit=crop&w=800&q=80"
    ],
    overview: 'Explore the pink city of Jaipur, the blue city of Jodhpur, and the golden sands of Jaisalmer.',
    tourPlan: [
      { day: 1, title: 'Arrival in Jaipur', description: 'Welcome to the Pink City. Transfer to your heritage hotel.' },
      { day: 2, title: 'Jaipur Sightseeing', description: 'Explore Amber Fort, Hawa Mahal, and City Palace.' },
      { day: 3, title: 'Drive to Pushkar', description: 'Visit the Brahma Temple and the holy Pushkar Lake.' },
      { day: 4, title: 'Drive to Jodhpur', description: 'Arrive in the Blue City and relax.' },
      { day: 5, title: 'Jodhpur Sightseeing', description: 'Tour the grand Mehrangarh Fort and Jaswant Thada.' },
      { day: 6, title: 'Drive to Jaisalmer', description: 'Travel to the Golden City deep in the Thar Desert.' },
      { day: 7, title: 'Jaisalmer Fort & Desert Safari', description: 'Explore the living fort and enjoy an evening camel safari.' },
      { day: 8, title: 'Drive to Bikaner', description: 'Visit the Junagarh Fort.' },
      { day: 9, title: 'Drive to Mandawa', description: 'Wander through incredible painted havelis.' },
      { day: 10, title: 'Return & Departure', description: 'Drive back to Jaipur or Delhi for your departure flight.' }
    ],
    included: ["Heritage Hotel Accommodation", "Daily Breakfast", "Camel Safari", "Private Driver"],
    excluded: ["Flights/Train Tickets", "Monument Entry Fees", "Lunches/Dinners"],
    relatedPackages: [],
    faqs: [
      { question: "When is the best time to visit Rajasthan?", answer: "October to March when the weather is cool." },
      { question: "Is English widely spoken?", answer: "Yes, at all tourist locations." }
    ]
  },
  {
    id: 'vietnam-essence',
    numericId: 5,
    slug: 'essential-vietnam-10d',
    title: 'Essential Vietnam - 10 Days',
    location: { country: 'Vietnam', cities: ['Hanoi', 'Halong Bay', 'Hoi An', 'Ho Chi Minh City'] },
    duration: { days: 10, nights: 9 },
    price: { startingFrom: 1450, currency: 'USD', perPerson: true },
    travelers: { adults: 2, children: 0, infants: 0 },
    minimumAge: 5,
    startingPlace: "Hanoi",
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&h=800&q=80',
    description: "A complete journey through the highlights of Vietnam.",
    category: 'Group Tourism',
    rating: 4.7,
    reviews: 132,
    highlights: ["Cruise through Halong Bay", "Explore the vibrant streets of Hanoi", "Wander ancient Hoi An", "Discover the Cu Chi Tunnels"],
    gallery: [
      "https://images.unsplash.com/photo-1559592413-7ec4f0511874?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509030450996-939983783ee8?auto=format&fit=crop&w=800&q=80"
    ],
    overview: 'A 10-day immersive exploration of Vietnam’s stunning landscapes and captivating cities.',
    tourPlan: [
      { day: 1, title: 'Hanoi Arrival', description: 'Arrive in the bustling capital and enjoy a cyclo tour of the Old Quarter.' },
      { day: 2, title: 'Hanoi City Tour', description: 'Visit the Ho Chi Minh Mausoleum and Temple of Literature.' },
      { day: 3, title: 'Halong Bay Cruise', description: 'Set sail among the limestone karsts, enjoy fresh seafood, and sleep on a traditional junk boat.' },
      { day: 4, title: 'Halong to Hoi An', description: 'Morning cruise, then fly to Danang and transfer to Hoi An.' },
      { day: 5, title: 'Hoi An Walking Tour', description: 'Explore the lantern-lit streets of this ancient trading port.' },
      { day: 6, title: 'Hoi An Free Day', description: 'Relax at the beach or get custom clothes tailored.' },
      { day: 7, title: 'Fly to Ho Chi Minh City', description: 'Transfer and fly south to dynamic Ho Chi Minh City.' },
      { day: 8, title: 'Cu Chi Tunnels', description: 'Explore the fascinating underground network used during the war.' },
      { day: 9, title: 'Mekong Delta Day Trip', description: 'Cruise the delta and visit local workshops.' },
      { day: 10, title: 'Departure', description: 'Free time until your airport transfer.' }
    ],
    included: ["Domestic Flights", "Halong Bay Cruise", "Tours with English Speaking Guide", "Accommodation with Breakfast"],
    excluded: ["International Flights", "Visa Fees", "Tipping"],
    relatedPackages: [],
    faqs: [
      { question: "Do I need a visa?", answer: "Most travelers require a visa arranged prior to arrival or via E-Visa." }
    ]
  },
  {
    id: 'malaysia-modern-wild',
    slug: 'malaysia-modern-wild-8d',
    title: 'Modern & Wild Malaysia',
    location: { country: 'Malaysia', cities: ['Kuala Lumpur', 'Langkawi', 'Taman Negara'] },
    duration: { days: 8, nights: 7 },
    price: { startingFrom: 1100, currency: 'USD', perPerson: true },
    travelers: { adults: 2, children: 1, infants: 0 },
    minimumAge: 5,
    startingPlace: "Kuala Lumpur",
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&w=600&h=800&q=80',
    description: "Experience the bustling modern metropolis before diving into pristine nature.",
    category: 'Family Tourism',
    rating: 4.8,
    reviews: 79,
    highlights: ["Petronas Twin Towers", "Batu Caves", "Jungle trekking in Taman Negara", "Langkawi Cable Car"],
    gallery: [
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1601004186595-dfde3d517904?auto=format&fit=crop&w=800&q=80"
    ],
    overview: 'A vibrant mix of cultures, modern cities, and lush rainforests across 8 thrilling days.',
    tourPlan: [
      { day: 1, title: 'Kuala Lumpur Arrival', description: 'Welcome to KL! Check into your hotel.' },
      { day: 2, title: 'KL City Tour', description: 'Visit Petronas Towers, Batu Caves, and Merdeka Square.' },
      { day: 3, title: 'Transfer to Taman Negara', description: 'Travel to the world’s oldest rainforest. Evening jungle walk.' },
      { day: 4, title: 'Canopy Walk & River Cruise', description: 'Walk high among the trees and cruise the Tembeling River.' },
      { day: 5, title: 'Fly to Langkawi', description: 'Transfer back to KL and fly straight to the island paradise of Langkawi.' },
      { day: 6, title: 'Island Hopping Tour', description: 'Explore standard island hopping routes including the Lake of the Pregnant Maiden.' },
      { day: 7, title: 'Langkawi Cable Car', description: 'Gain stunning aerial views of the Andaman Sea.' },
      { day: 8, title: 'Departure', description: 'Transfer to the Langkawi airport for your flight home.' }
    ],
    included: ["Domestic Flights", "4-Star Accommodations", "Daily Breakfast", "All Guided Tours"],
    excluded: ["International Airfare", "Tourism Tax", "Meals aside from breakfast"],
    relatedPackages: [],
    faqs: [
      { question: "Is Malaysia safe for tourists?", answer: "Yes, it is generally very safe and welcoming." }
    ]
  },
  {
    id: 'singapore-luxury-escape',
    numericId: 10,
    slug: 'singapore-luxury-escape-5d',
    title: 'Singapore Luxury Escape',
    location: { country: 'Singapore', cities: ['Sentosa', 'Marina Bay', 'Orchard Road'] },
    duration: { days: 5, nights: 4 },
    price: { startingFrom: 1350, currency: 'USD', perPerson: true },
    travelers: { adults: 2, children: 0, infants: 0 },
    minimumAge: 5,
    startingPlace: "Singapore Changi Airport",
    image: 'https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?auto=format&fit=crop&w=600&h=800&q=80',
    description: "An elite getaway designed for the discerning traveler.",
    category: 'Luxury Tourism',
    rating: 4.9,
    reviews: 310,
    highlights: ["Stay at Marina Bay Sands", "Gardens by the Bay", "VIP Universal Studios Pass", "Luxury Shopping on Orchard Road"],
    gallery: [
      "https://images.unsplash.com/photo-1505995433366-e12047f3f144?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565191845112-9bdc8c11aa50?auto=format&fit=crop&w=800&q=80"
    ],
    overview: 'Experience the glitz and glamour of Singapore in full luxury.',
    tourPlan: [
      { day: 1, title: 'VIP Arrival', description: 'Private transfer to Marina Bay Sands.' },
      { day: 2, title: 'Gardens & City', description: 'Private guide through Gardens by the Bay and the Cloud Forest.' },
      { day: 3, title: 'Sentosa Island VIP', description: 'Enjoy priority access to Universal Studios and sea aquarium.' },
      { day: 4, title: 'Shopping & Dining Tour', description: 'Personal shopper on Orchard Road and Michelin Star dinner.' },
      { day: 5, title: 'Departure', description: 'Relax before your private limo transfer to Changi Airport.' }
    ],
    included: ["5-Star Luxury Accommodation", "Private Limousine Transfers", "VIP Attraction Passes", "Michelin Dinner"],
    excluded: ["Flights", "Visa", "Personal Shopping Expenses"],
    relatedPackages: [],
    faqs: [
      { question: "Is the Michelin dinner vegetarian friendly?", answer: "Yes, dietary restrictions can be accommodated with advance notice." }
    ]
  },
  {
    id: 'sri-lanka-classical',
    numericId: 4,
    slug: 'classical-sri-lanka-9d',
    title: 'Classical Sri Lanka',
    location: { country: 'Sri Lanka', cities: ['Colombo', 'Kandy', 'Sigiriya', 'Ella'] },
    duration: { days: 9, nights: 8 },
    price: { startingFrom: 950, currency: 'USD', perPerson: true },
    travelers: { adults: 2, children: 1, infants: 0 },
    minimumAge: 5,
    startingPlace: "Colombo",
    image: 'https://images.unsplash.com/photo-1586611292717-f828b167408c?auto=format&fit=crop&w=600&h=800&q=80',
    description: "Trace the cultural and historic spine of the incredibly diverse tear-drop island.",
    category: 'Cultural Tourism',
    rating: 4.8,
    reviews: 145,
    highlights: ["Climb Sigiriya Rock Fortress", "Temple of the Sacred Tooth Relic", "Scenic train ride to Ella", "Yala National Park Safari"],
    gallery: [
      "https://images.unsplash.com/photo-1596422846543-75c6fc18a593?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550228445-56b539e0ebc5?auto=format&fit=crop&w=800&q=80"
    ],
    overview: 'A majestic journey deep into the cultural triangle, highlands, and wild plains of Sri Lanka.',
    tourPlan: [
      { day: 1, title: 'Arrival in Colombo', description: 'Transfer to hotel and rest.' },
      { day: 2, title: 'Drive to Cultural Triangle', description: 'Visit the Dambulla Cave Temples.' },
      { day: 3, title: 'Sigiriya & Polonnaruwa', description: 'Climb the Lion Rock and explore the ancient capital.' },
      { day: 4, title: 'Drive to Kandy', description: 'Stop at a spice garden and visit the Temple of the Tooth.' },
      { day: 5, title: 'Kandy & Nuwara Eliya', description: 'Explore a tea factory and drive into the misty highlands.' },
      { day: 6, title: 'Train to Ella', description: 'Enjoy the world famous scenic train ride.' },
      { day: 7, title: 'Yala Safari', description: 'Drive south and enjoy a jeep safari to spot elusive leopards.' },
      { day: 8, title: 'Beach relaxation in Galle', description: 'Explore Galle Fort and relax by the coast.' },
      { day: 9, title: 'Departure', description: 'Transfer along the coast back to Colombo airport.' }
    ],
    included: ["3 or 4-Star Acconmodation", "Breakfast", "Air-conditioned Vehicle", "English Speaking Chauffeur Guide"],
    excluded: ["Entrance Fees", "Lunches and Dinners", "Tips"],
    relatedPackages: [],
    faqs: [
      { question: "Is the train ride guaranteed?", answer: "We purchase tickets in advance but it is always subject to government railway availability." }
    ]
  },
  {
    id: 'india-golden-triangle',
    slug: 'golden-triangle-luxury',
    title: 'Golden Triangle',
    location: { country: 'India', cities: ['Delhi', 'Agra', 'Jaipur'] },
    duration: { days: 6, nights: 5 },
    price: { startingFrom: 1100, currency: 'USD', perPerson: true },
    travelers: { adults: 2, children: 0, infants: 0 },
    minimumAge: 5,
    startingPlace: "New Delhi",
    image: 'https://images.unsplash.com/photo-1524492707947-2f85a1a24d3c?auto=format&fit=crop&w=800&q=80',
    description: "Explore the historic cities of Delhi, Agra, and Jaipur in ultimate luxury and style.",
    category: 'Luxury Tourism',
    rating: 4.8,
    reviews: 290,
    highlights: ["Sunrise at the Taj Mahal", "Rickshaw ride in Old Delhi", "Amber Fort visit in Jaipur"],
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622308643194-e0eb2c3faea1?auto=format&fit=crop&w=800&q=80"
    ],
    overview: 'A premium, whirlwind tour of India’s most iconic northern triangle.',
    tourPlan: [
      { day: 1, title: 'Arrival in Delhi', description: 'VIP Airport pickup and check-in to a 5-star hotel.' },
      { day: 2, title: 'Old and New Delhi City Tour', description: 'Visit Jama Masjid, Red Fort, and India Gate.' },
      { day: 3, title: 'Drive to Agra', description: 'Visit Agra Fort and sunset view of the Taj Mahal from Mehtab Bagh.' },
      { day: 4, title: 'Taj Mahal Sunrise & Drive to Jaipur', description: 'Early morning visit to the Taj Mahal. Stop at Fatehpur Sikri.' },
      { day: 5, title: 'Jaipur Sightseeing', description: 'Visit the Amber Fort, City Palace, and Jantar Mantar.' },
      { day: 6, title: 'Drive back to Delhi', description: 'Transfer straight to the airport for your onward flight.' }
    ],
    included: ["5-Star Luxury Hotels", "Private Air-Conditioned Vehicle", "Expert Local Guides", "Breakfast"],
    excluded: ["International Airfare", "Monument Entry Fees", "Meals besides breakfast"],
    relatedPackages: [],
    faqs: [
      { question: "Is this tour customizable?", answer: "Yes, you can add extra days in each city if preferred." }
    ]
  }
];

export const categories = [
  { id: 'spiritual', name: 'Spiritual Tourism', slug: 'spiritual-tourism' },
  { id: 'family', name: 'Family Tourism', slug: 'family-tourism' },
  { id: 'honeymoon', name: 'Honeymoon Tourism', slug: 'honeymoon-tourism' },
  { id: 'group', name: 'Group Tourism', slug: 'group-tourism' }
];
