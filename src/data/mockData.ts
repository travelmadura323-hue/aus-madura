const gallery = import.meta.glob('../../images/**/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
  import: 'default',
});

export const destinations = [
  {
    id: 'kerala',
    name: 'Kerala',
    type: 'domestic',
    image: gallery['../../images/3.png'] as string,
    description: 'Experience the serene backwaters and lush greenery of Gods Own Country.',
    region: 'South India'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    type: 'domestic',
    image: gallery['../../images/4.png'] as string,
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
    category: ['Group Tourism', 'Honeymoon Tourism'],
    rating: 4.8,
    reviews: 124,
    highlights: [
      "Visit the iconic Sydney Opera House",
      "Explore the Great Barrier Reef",
      "Drive along the Great Ocean Road",
      "Meet unique wildlife at Kangaroo Island"
    ],
    gallery: [
      gallery['../../images/Tours/quuensland1.png'] as string,
      gallery['../../images/Tours/queensland2.png'] as string,
      gallery['../../images/Tours/queensland3.png'] as string,
      gallery['../../images/Tours/queensland4.webp'] as string,
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
    id: 'kerala-Scenic 06 Days Best Of Kerala Tour Package',
    numericId: 1,
    slug: '6-days-kerala',
    title: 'Scenic 06 Days Best Of Kerala Tour Package',
    location: { country: 'India', cities: ['Kochi', 'Munnar', 'Thekkady', 'Alleppey'] },
    duration: { days: 6, nights: 5 },
    price: { startingFrom: 850, currency: "USD", perPerson: true },
    travelers: { adults: 9, children: 0, infants: 0 },
    minimumAge: 1,
    startingPlace: "Kochi",
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    description: "A serene journey through God’s Own Country.",
    category: ['Family Tourism', "Group Tourism"],
    rating: 4.9,
    reviews: 210,
    highlights: ["Munnar Tea Gardens", "Periyar Wildlife Sanctuary", "Overnight Houseboat stay", "Traditional Kerala Cuisine"],
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"

    ],
    overview: 'Kerala, known as “God’s Own Country,” is a picturesque state in southern India, celebrated for its serene backwaters, lush greenery, tranquil beaches, and vibrant culture. Explore historic landmarks, indulge in Ayurvedic treatments, savor delicious cuisine, and experience warm hospitality, making Kerala a must-visit destination for unforgettable tourism experiences.We offer Best Kerala Tour Packages.',
    tourPlan: [
      { day: 1, title: ' City Arrival', description: 'Arrive at Kochi Airport and proceed for Munnar.Visit to Abhayaranyam, a place where rehabilitating elephants are taken care.Overnight stay in Munnar.' },
      { day: 2, title: 'Munnar Sightseeing', description: 'After having a sumptuous breakfast,Explore Eravikulam National Park and Tea Museum.Later visit Mattupetty Dam, Eco Point and Flower Garden.Overnight in Munnar..' },
      { day: 3, title: ' Munnar – Thekkady', description: 'After having a sumptuous breakfast, drive to Thekkady (Periyar).Post check-in, proceed for sightseeing tour of Periyar. Set high in the ranges of the Western Ghats in Kerala, is the Periyar National Park and Tiger Reserve. Periyar wildlife sanctuary has apicturesque lake at the heart of the sanctuary. Enjoy a boat ride on the lake to view the wildlife at close quarters.Overnight in Thekkady.' },
      { day: 4, title: 'Thekkady – Kumarakom', description: 'After having a sumptuous breakfast,get transferred to Kumarakom.The fresh water of the lake flows into the mainland, making a labyrinth of lagoons, canals and waterways. Spend the rest of the day exploring your beautiful resort of Kumarakom.Overnight at Kumarakom.' },
      { day: 5, title: ' Kumarakom – Kochi', description: 'After having a sumptuous breakfast,drive to Cochin.Upon arrival, check-in at the hotel. Later, Enjoy city tour covering Mattancherry Palace,about 500 year old Jewish Synagogue, Chinese fishing nets, local spices market followed by colorful performing art –Kathakali Dance.Overnight in Kochi' },
      { day: 6, title: 'Departure', description: 'After having a sumptuous breakfast.You will be transferred to Cochin airport for a return flight back home.' },

    ],
    included: ["Accommodation in well-appointed rooms as mentioned in the above hotels or equivalent", "Driver allowances, toll taxes", "Sightseeing as per itinerary by private tourist vehicle"],
    excluded: ["Air tickets and airport taxe", "Entry Fee at the Monuments", "Items of personal nature like laundry, phone calls, tips to guides/drivers, etc", "Camera / Video camera fees applicable at monuments"],
    relatedPackages: [],
    faqs: [
      { question: "What is the physical intensity of this tour?", answer: "Very low, strictly leisure." },
      { question: "Are infant meals provided?", answer: "You must request these ahead of time during booking." }
    ]
  },
  {
    id: 'thiruvannamalai-girivalam-tour-01-day',
    numericId: 1,
    slug: 'thiruvannamalai-girivalam-tour-01-day',
    title: 'Thiruvannamalai Girivalam Tour 01 Day',
    location: { country: 'India', cities: ['thiruvanamalai', 'chennai'] },
    duration: { days: 1, nights: 0 },
    price: { startingFrom: 850, currency: "USD", perPerson: true },
    travelers: { adults: 9, children: 0, infants: 0 },
    minimumAge: 1,
    startingPlace: "Chennai",
    image: gallery['../../images/thiruvannamalai1.webp'] as string,
    description: "Experience the profound spiritual journey of Girivalam around the sacred Annamalai Hill.",
    category: ['Family Tourism', "Group Tourism"],
    rating: 4.9,
    reviews: 210,
    highlights: ["Arunachaleswarar Temple Visit", "Sacred 14-km Girivalam Trek", "Spiritual Annamalai Hill Experience", "Temple Architecture & Heritage"],
    gallery: [
      gallery['../../images/thiruvannamalai 2.webp'] as string,
      gallery['../../images/thiruvannamalai3.webp'] as string,
      gallery['../../images/thiruvannamalai4.webp'] as string,
    ],
    overview: 'Experience the profound spiritual journey of Girivalam with Madura Travel Service Pvt Ltd in Chennai. The term Girivalam is a combination of the Tamil words giri (hill) and valam (coming around), signifying the devotional ritual of circling Annamalai Hill. Every full moon, thousands of pilgrims assemble at the Arunachaleswarar Temple in Thiruvannamalai to undertake the sacred 14-kilometer trek around the hill. Madura Travel Service offers seamless and comfortable travel packages from Chennai, ensuring you can focus entirely on this deeply spiritual experience. Book your Girivalam pilgrimage with us and connect with this ancient tradition.',
    tourPlan: [
      { day: 1, title: 'Chennai to Tiruvannamalai', description: 'Its a one-day tour that starts early in the morning.01:30 PM Travel from the Chennai to the Thiruvannamalai 06:00 AM Return to Chennai' }

    ],
    included: ["Guide services from day one meeting point till the dropping point", "Tourists can relax and refresh at Hotel Tamil Nadu", "Friendly guest services by hotel staffs, coach drivers and assistants"],
    excluded: ["Cost of insurance & medical expenses, if any", "Cost of pre/ post tour hotel accommodation", "Coach driver will follow the travel route as directed by the tour manager"],
    faqs: [
      { question: "What is the physical intensity of this tour?", answer: "Very low, strictly leisure." },
      { question: "Are infant meals provided?", answer: "You must request these ahead of time during booking." }
    ]
  },
  {
    id: 'tamilnadu-heritage-tour',
    numericId: 2,
    slug: 'tamilnadu-heritage-tour',
    title: 'Spellbinding of Tamil Nadu 06 Days Group Tour',
    location: { country: 'India', cities: ['Chennai', 'pondicherry'] },
    duration: { days: 6, nights: 5 },
    price: { startingFrom: 1250, currency: "USD", perPerson: true },
    travelers: { adults: 9, children: 0, infants: 0 },
    minimumAge: 1,
    startingPlace: "Chennai",
    image: gallery['../../images/pondicherry.png'] as string,
    description: "Immerse yourself in the rich culture and regal traditions of Tamil Nadu.",
    category: ['Spiritual Tourism', 'Family Tourism'],
    rating: 4.8,
    reviews: 185,
    highlights: ["hirukadalmallai", "Aurobindo ashramr", "Kapeeleshwara Temple"],
    gallery: [
      gallery['../../images/pondicherry.png'] as string,
      gallery['../../images/mahbalipuram.png'] as string,
    ],
    overview: 'Tamil Nadu tourism beckons with a rich tapestry of cultural heritage, vibrant traditions, and stunning landscapes. Explore ancient temples in Madurai, serene hill stations like Ooty, and picturesque beaches in Chennai. Indulge in aromatic cuisine, classical dance performances, and intricately woven silk sarees. Embark on an enchanting journey through Tamil Nadu’s timeless charm..We Offer Best Kashir Tour Packages.',
    tourPlan: [
      { day: 1, title: ' City Arrival', description: 'On Arrival at Chennai Airport and drive to Mahabalipuram.Upon arrival, check-in at the hotel. Later take excursion to Kancheepuram.Overnight stay in Mahabalipuram..' },
      { day: 2, title: ' Mahabalipuram Sightseeing', description: 'After having a sumptuous breakfast.Visit the proceed for the Mahabalipuram sightseeing which includes the Thirukadalmallai, Shore Temple,Pancha Pandava Rathas, Arjuna’s Penance, Caves, and Krishna’s Butterball return back to the hotel.Overnight stay in Mahabalipuram' },
      { day: 3, title: 'Mahabalipuram – Pondicherry', description: 'After having a sumptuous breakfast, drive to Pondicherry.Arrive and check-in at your hotel. Later, proceed for half day sightseeing of Pondicherry, starting with Aurobindo ashram, cover church of sacred hearts of Jesus and a must-visit attraction of Pondicherry – Auroville.Overnight stay in Pondicherry.' },
      { day: 4, title: 'Pondicherry Sightseeing', description: 'After having a sumptuous breakfast.Rest of the day leisure. Alternatively, you can explore the Local streets, Markets and French colonies of Pondicherry.Overnight at Pondicherry.' },
      { day: 5, title: 'Pondicherry – Chennai', description: 'After having a sumptuous breakfast.Check-out from the hotel and proceed to Chennai. Upon arrival check in to the hotel.Later explore Chennai- Visit Fort St George, St. Marys Church and a museum, Kapeeleshwara Temple, San Thome Cathedral,Government State Museum & National Art Gallery. Drive past Marina Beach, the second longest beach in the world.Overnight Stay in Chennai..' },
      { day: 6, title: ' Departure', description: 'After having a sumptuous breakfast.You will be transferred to Chennai airport for return flight back home' },

    ],
    included: ["Accommodation in well-appointed rooms as mentioned in the above hotels or equivalent", "Assistance at the airport", "Sightseeing as per itinerary by private tourist vehicle", "Driver allowances, toll taxes, Road Taxes and Parking charges"],
    excluded: ["Air tickets and airport taxes", "Entry Fee at the Monuments", "Items of personal nature like laundry, phone calls, tips to guides/drivers", "Camera / Video camera fees applicable at monuments"],
    relatedPackages: [],
    faqs: [
      { question: "When is the best time to visit Tamil Nadu?", answer: "October to March when the weather is cool." },
      { question: "Is English widely spoken?", answer: "Yes, at all tourist locations." }
    ]
  },
  {
    id: 'vietnam-culture of 7 days',
    numericId: 5,
    slug: 'culture-vietnam-7d',
    title: 'Vibrant culture of Vietnam 07 days Tour Package',
    location: { country: 'Vietnam', cities: ['Hanoi', 'Halong Bay', 'Hoi An', 'Ho Chi Minh City'] },
    duration: { days: 7, nights: 6 },
    price: { startingFrom: 1450, currency: 'USD', perPerson: true },
    travelers: { adults: 10, children: 0, infants: 0 },
    minimumAge: 1,
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
    overview: 'Vietnam is a vibrant Southeast Asian country known for its rich history, diverse culture, and breathtaking landscapes. From the bustling streets of Hanoi and Ho Chi Minh City (Saigon) to the serene beauty of Ha Long Bay and the Mekong Delta, Vietnam offers a mix of urban excitement and natural wonders. The country is famous for its delicious cuisine, including pho, banh mi, and fresh seafood. Visitors can explore ancient temples, colonial architecture, and beautiful beaches, while experiencing the warmth of its people. Vietnam is also a destination for adventure lovers, offering trekking, motorbiking, and water sports.',
    tourPlan: [
      { day: 1, title: 'Arrival in Hanoi', description: 'Welcome to Vietnam!Arrive at Hanois Noi Bai International Airport and enjoy a seamless transfer to your 4-star hotel.Evening Free: Relax after your journey or explore Hanois lively Old Quarter on your own.Overnight stay in Hanoi.' },
      { day: 2, title: 'Guided City Tour of Hanoi & Transfer to Ha Long Bay', description: 'Morning: Begin your day with a delicious breakfast at the hotel. Enjoy a guided half-day city tour of Hanoi, covering iconic landmarks like Hoan Kiem Lake, the Temple of Literature, and the Hanoi Opera House.Afternoon: Head to Ha Long Bay and check into your luxury 4-star cruise.Evening: Savor a sumptuous dinner aboard the cruise as you admire the majestic limestone karsts.Overnight stay on the Ha Long Bay cruise.' },
      { day: 3, title: ' Explore Ha Long Bay & Transfer to Da Nang', description: 'Morning: Enjoy a relaxing breakfast and brunch while cruising through the stunning Ha Long Bay. Participate in optional activities like kayaking or simply unwind on deck.Afternoon: Disembark from the cruise and transfer to Hanoi Airport for your flight to Da Nang.Evening: Arrive in Da Nang, where a private transfer takes you to your 4-star hotel.Overnight stay in Da Nang.' },
      { day: 4, title: 'Visit Ba Na Hills and the Golden Bridge', description: 'Morning: After breakfast, embark on a guided tour to Ba Na Hills, one of Vietnam\'s top attractions. Walk along the Golden Bridge, a stunning architectural marvel offering breathtaking views.Afternoon: Enjoy the attractions of Ba Na Hills, from scenic cable cars to French-inspired gardens.Overnight stay in Da Nang.' },
      { day: 5, title: ' Transfer to Ho Chi Minh City (Saigon)', description: 'Morning: Have breakfast at your hotel before transferring to Da Nang Airport for your flight to Ho Chi Minh City.Afternoon: Check into your 4-star hotel in Ho Chi Minh City. The rest of the day is free for you to explore Saigon’s vibrant streets or indulge in local delicacies.Overnight stay in Ho Chi Minh City.' },
      { day: 6, title: 'Cu Chi Tunnels Guided Tour', description: 'Morning: After breakfast, embark on a guided city tour of the Cu Chi Tunnels, a fascinating historical site showcasing Vietnam\'s wartime ingenuity.Afternoon: Return to Ho Chi Minh City and explore the local markets or landmarks like the Notre Dame Cathedral and Ben Thanh Market.Overnight stay in Ho Chi Minh City.' },
      { day: 7, title: ' Departure', description: 'Morning: Enjoy a final breakfast at your hotel before checking out.Airport Transfer: Private transfer to Tan Son Nhat International Airport for your onward journey back to India..' },

    ],
    included: ["Accommodation: 6 nights at premium 4-star hotels and a luxury Ha Long Bay cruise.", "Meals: Daily breakfast included at all accommodations; dinner included on the Ha Long Bay cruise.", "Airport Transfers: Private transfers upon arrival in Hanoi and for departure from Ho Chi Minh City.", "City Tours: Guided half-day Hanoi city tour covering key landmarks like Hoan Kiem Lake, the Temple of Literature, and Hanoi Opera House.", "Luxury Amenities: Access to premium cruise facilities and 4-star hotel services."],
    excluded: ["Inbound and domestic Flights and flight details ", "Entry tickets which are not mention in inclusion Personal expenses such as meals, tips, and gratuities not specified in the package. Insurance coverage and any unforeseen additional costs.", "Tipping", "Any additional hotel nights or room services beyond the package inclusions.", "Any items not explicitly mentioned in the inclusions."],
    relatedPackages: [],
    faqs: [
      { question: "Do I need a visa?", answer: "Most travelers require a visa arranged prior to arrival or via E-Visa." }
    ]
  },
  {
    id: 'malaysia-tour',
    slug: 'malaysia-tour',
    title: 'Malaysia Tour Package For 05 Nights and 06 Days',
    location: { country: 'malaysia', cities: ['Kuala Lumpur', 'Langkawi', 'Taman Negara'] },
    duration: { days: 6, nights: 5 },
    price: { startingFrom: 1100, currency: 'USD', perPerson: true },
    travelers: { adults: 1, children: 0, infants: 0 },
    minimumAge: 1,
    startingPlace: "Penangr",
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
    overview: 'Embark on an unforgettable journey to Malaysia with Madura Travel Service, the best travel company in Chennai and South India. Our exclusive Malaysia tour packages are designed to give you the perfect mix of culture, adventure, and relaxation. From the dazzling skyline of Kuala Lumpur and the iconic Petronas Twin Towers to the serene beaches of Langkawi and the lush rainforests of Cameron Highlands, every itinerary is crafted for a world-class travel experience. Whether you’re planning a family vacation, a honeymoon escape, or a corporate trip, Madura Travel Service ensures seamless arrangements — including flights, visa assistance, hotels, and guided tours — so you can enjoy a stress-free holiday. Book your Malaysia tour package from Chennai today and discover why Madura Travel Service is the most trusted name for international travel across South India.',
    tourPlan: [
      { day: 1, title: ' Arrive Penang- Island Heritage and Scenic Views', description: 'Arrive at Penang International Airport and meet our representative for a warm welcome.Transfer to your hotel in either Batu Ferringhi Beach or George Town. Check in and relax after your journey. Visit Penang Hill and enjoy the panoramic views of the island via the funicular train. Continue to Kek Lok Si Temple, one of Southeast Asia’s largest and most beautiful Buddhist temples.Explore the lively Gurney Drive Hawker Centre and sample authentic local delicacies such as Char Kway Teow, Satay, and Ice Kacang. Take a leisurely walk through the heritage streets of George Town, discovering its famous murals and cultural charm.Overnight in Penang.' },
      { day: 2, title: ' Discover Penang’s Culture, Cuisine and Family Attractions', description: 'Visit Entopia Butterfly Farm for an interactive experience surrounded by tropical butterflies and flora. Continue to the Tropical Spice Garden to learn about Malaysia’s spices and herbal heritage.Enjoy lunch at a local Nyonya restaurant on own for an authentic Peranakan culinary experience. Later, visit the Top Komtar Tower with its glass walkway, offering a touch of adventure and stunning city views. Spend some leisure time at Batu Ferringhi Beach or shop at Gurney Plaza.Optionally, visit The Habitat on Penang Hill for an enchanting canopy walk at sunset on own.Overnight in Penang.' },
      { day: 3, title: ' Kuala Lumpur Arrival- City Highlights', description: 'Check out and transfer to Penang Airport for your flight to Kuala Lumpur. (Alternatively, opt for a scenic road journey across the Penang Bridge.)Check in to your hotel in the Bukit Bintang area. Visit the KL Tower Observation Deck forpanoramic city views, followed by a photo stop at the iconic Petronas Twin Towers. Explore KLCC Park and the Suria Mall, or enjoy the vibrant food scene at Jalan Alor Night on own.  Market, known for its wide variety of local specialties.Overnight in Kuala LumpurTravel to the world’s oldest rainforest. Evening jungle walk.' },
      { day: 4, title: ' Excursion to Genting Highlands', description: 'After breakfast, drive to Genting Highlands (approximately 1.5 hours). Experience the Awana SkyWay Cable Car ride with an optional glass-floor cabin. Optionally, spend the day at Genting SkyWorlds Outdoor Theme Park, offering rides and attractions suitable for all ages.Visit the Chin Swee Caves Temple, a serene hilltop site with panoramic views. Enjoy lunch at one of Genting’s restaurants before descending on own. Return to Kuala Lumpur and enjoy free time for shopping at Pavilion Mall or Berjaya Times Square, home to an indoor amusement park.Overnight in Kuala Lumpur.' },
      { day: 5, title: 'Kuala Lumpur to Johor Bahru via Melaka', description: 'Check out and drive to Melaka (approximately 2 hours). Visit Dutch Square, St. Paul’s Hill, and A Famosa Fort – a UNESCO World Heritage Site rich in colonial history. Enjoy a Melaka River Cruise to experience the city’s colorful architecture and murals. Lunch at a local restaurant featuring the famous Melaka Chicken Rice Balls on own. Continue your journey to Johor Bahru (approximately 2.5–3 hours).Check in to your hotel in Johor Bahru and unwind. You may visit Johor Bahru City Square or R&F Mall for shopping and dining on own.Overnight in Johor Bahru.' },
      { day: 6, title: ' Departure', description: 'Morning breakfast and then check out from the hotel.Depending on your departure time, transfer to Senai International Airport in Johor, or continue to Singapore or Kuala Lumpur for your onward journey.End of Tour.End of services' },
      { day: 7, title: 'Langkawi Cable Car', description: 'Gain stunning aerial views of the Andaman Sea.' },
      { day: 8, title: 'Departure', description: 'Transfer to the Langkawi airport for your flight home.' }
    ],
    included: ["Accomodation with breakfast", "Arrival and Departure transfer", "Sightseeing as per itinerary", "Orientation tour of George Town", "Visit to Entopia Butterfly Farm", "Visit to Tropical Spice garden", "Orientation tour Kuala Lumpur City", "Genting skyway cable car ride"],
    excluded: ["International and domestic flights", "Visa and Travel Insurance service", "Lunches and Dinners on tour", "Entry fees for optional attractions or activities", "Personal expenses ( tips, beverages, laundry,, etc.,)"],

    relatedPackages: [],
    faqs: [
      { question: "Is Malaysia safe for tourists?", answer: "Yes, it is generally very safe and welcoming." }
    ]
  },
  {
    id: 'singapore-budget',
    numericId: 10,
    slug: 'singapore-budget-tour-4d',
    title: 'Budget Singapore 4 Days tour package',
    location: { country: 'Singapore', cities: ['Sentosa', 'Marina Bay', 'Orchard Road'] },
    duration: { days: 4, nights: 3 },
    price: { startingFrom: 1350, currency: 'USD', perPerson: true },
    travelers: { adults: 9, children: 0, infants: 0 },
    minimumAge: 1,
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
    overview: 'Embark on a memorable 4-day adventure in Singapore, where modern marvels blend seamlessly with cultural charm. This thoughtfully crafted itinerary ensures you experience the best of Singapore’s iconic landmarks, vibrant culture, and thrilling attractions. From a comprehensive city tour to an exciting day of self-exploration at Sentosa Island, this trip offers the perfect mix of guided activities and leisure time. Comfortable airport transfers and well-planned logistics make your journey hassle-free and enjoyable..',
    tourPlan: [
      { day: 1, title: 'Singapore Changi Arrival', description: 'Early Check-In at the hotel (subject to availability).Arrival & Airport Transfer: Welcome to Singapore! Upon your arrival at Changi Airport, our representative will greet you and arrange a hassle-free transfer to your hotel. Check-In: Settle into your comfortable accommodation and relax after your journey. Evening at Leisure: Explore nearby attractions or indulge in some local cuisine at the many food courts and hawker centers. Overnight Stay: At your hotel in Singapore.' },
      { day: 2, title: ' Explore Singapore’s Landmarks', description: 'Half-Day City Tour: Visit iconic landmarks like Merlion Park, Marina Bay Sands, and Esplanade Theatre. Stop by the Singapore Flyer (optional ride). Explore Gardens by the Bay, featuring the futuristic Supertree Grove (entry optional). Discover the cultural richness of Chinatown, Little India, and Kampong Glam.Lunch: Free time to explore local dining options (at your own expense).Evening: Optional activity like a Night Safari or a river cruise at Clarke Quay (additional cost). Overnight Stay: At your hotel in Singapore.' },
      { day: 3, title: ' Sentosa Island Exploration', description: 'This is an exclusive crafter self exploratory tour of Sentosa where you will have the greatest time of your life ever. Walk along Siloso Beach or enjoy thrilling adventures at Adventure Cove Waterpark (optional, additional ticket). Experience the panoramic views from the Skyline Luge & Skyride(optional, additional ticket). End the day with the Wings of Time show (optional, additional ticket).Evening Return: Head back to the hotel after a memorable day.Overnight Stay: At your hotel in Singapore.' },
      { day: 4, title: 'Departure from Singapore', description: 'Check-Out & Airport Transfer: Depending on your flight timing, our representative will assist you with a smooth transfer to Changi Airport. Goodbye Singapore: Depart with unforgettable memories and a promise to return!' },

    ],
    included: ["Airport Transfers between the airport and hotel for arrival and departure.", "Vortex Fountain at Jewel Changi", "City Tour: Guided city exploration, including key landmarks and a 3-hour experience", "Self explorational Sentosa Tour plan", "Professional Guide: Services of an English-speaking guide for all tours and transfers.", "Comprehensive Tour Coverage: All activities and attractions are arranged on a private basis for enhanced comfort and personalization."],
    excluded: ["Inbound and domestic Flights and flight details (to be arranged separately).", "Entry tickets which are not mention in inclusion", "Any additional hotel nights or room services beyond the package inclusions", "Personal expenses such as meals, tips, and gratuities not specified in the package.", "GST (5%) and TCS (5%) included in the overall invoice"],
    relatedPackages: [],
    faqs: [
      { question: "Is the Michelin dinner vegetarian friendly?", answer: "Yes, dietary restrictions can be accommodated with advance notice." }
    ]
  },
  {
    id: 'sri-lanka-classical',
    numericId: 4,
    slug: 'classical-sri-lanka-5d',
    title: 'Explore the Island of Wonders Srilanka 05 Days Tour',
    location: { country: 'Sri Lanka', cities: ['Colombo', 'Kandy', 'Sigiriya', 'Ella'] },
    duration: { days: 5, nights: 4 },
    price: { startingFrom: 950, currency: 'USD', perPerson: true },
    travelers: { adults: 10, children: 0, infants: 0 },
    minimumAge: 5,
    startingPlace: "Kandy",
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
    overview: 'Sri Lanka is a tropical paradise offering diverse tourism experiences, from pristine beaches to lush rainforests and ancient temples. Known for its rich cultural heritage, the island boasts UNESCO World Heritage Sites like Sigiriya, Dambulla, and Anuradhapura. Visitors can explore the stunning tea plantations in the hill country, go on safaris in Yala National Park, and visit sacred places like the Temple of the Tooth in Kandy. Sri Lanka’s vibrant wildlife, picturesque beaches, and mouthwatering cuisine, such as rice and curry, make it an unforgettable destination for adventure, culture, and relaxation.',
    tourPlan: [
      { day: 1, title: ' Airport / Kandy', description: 'Arrival at Colombo Airport: Meet & greet by our representative.Pinnawala Elephant Orphanage: Visit the home to over 100 elephant orphans, a unique experience.Temple of the Tooth (Dalada Maligawa): A sacred temple housing the Buddhas tooth relic.Kandy City Tour: Explore the citys highlights, including the lake drive, Gem Museum, silk shops, and batik markets.Dinner & Overnight Stay at Hotel in Kandy.' },
      { day: 2, title: ' Kandy / Nuwara Eliya', description: 'Transfer to Nuwara Eliya: A scenic drive through lush green landscapes.Nuwara Eliya Sightseeing: Visit gardens, waterfalls, tea plantations, and the famous Gregory Lake.Leisure at Gregory Lake: Enjoy a peaceful time by the lake.Dinner & Overnight Stay at Hotel in Nuwara Eliya.' },
      { day: 3, title: ' Nuwara Eliya / Ella', description: 'Train Ride to Ella: A breathtaking train journey through hills, tea fields, and local villages.Ravana Ella Cave & Falls: Visit the cave where Ravana is said to have hidden Sita and enjoy the stunning waterfall.Nine Arch Bridge: A historical railway bridge with panoramic views.Flying Ravana Zip Line: Experience the thrill of zip-lining with a spectacular view of the hills.Dinner & Overnight Stay at Bentota.' },
      { day: 4, title: ' Bentota', description: 'Madu River Cruise: Explore the serene Madu River with its 64 small islands and mangroves.Leisure Activities: Enjoy the natural beauty and unwind in Bentota.Nightlife in Colombo: Optionally explore Colombos lively nightlife.Dinner & Overnight Stay at Hotel in Bentota.' },
      { day: 5, title: ' Colombo / Airport', description: 'Colombo City Tour: Explore the mix of old and modern architecture, including Dutch, British, and colonial buildings, along with vibrant markets.Transfer to Colombo Airport for Departure.' },

    ],
    included: ["Meet and Greet at Colombo Airport by our representative.", "Accommodation in 3-star hotels or similar with comfortable amenities.", "Breakfasts, 4 Dinners at the hotel, and 4 Lunches at reputed Indian restaurants.", "All transfers during the tour in A/C private vehicles.", "Services of an English-Speaking National Guide.", "Sightseeing as per the itinerary, including historical sites, temples, waterfalls, and more.", "Scenic train journey from Nuwara Eliya to Ella.", "Madu River cruise across 64 small islands showcasing nature."],
    excluded: ["Entry tickets which are not mention in inclusion", "Inbound and domestic Flights and flight details (to be arranged separately).", "Personal expenses such as meals, tips, and gratuities not specified in the package.", "Insurance coverage and any unforeseen additional costs.", "Any items not explicitly mentioned in the inclusions."],
    relatedPackages: [],
    faqs: [
      { question: "Is the train ride guaranteed?", answer: "We purchase tickets in advance but it is always subject to government railway availability." }
    ]
  },
  {
    id: 'india-golden-triangle',
    slug: 'golden-triangle',
    title: 'Golden Triangle 05 Days Tour Package',
    location: { country: 'India', cities: ['Delhi', 'Agra', 'Jaipur'] },
    duration: { days: 5, nights: 4 },
    price: { startingFrom: 1100, currency: 'USD', perPerson: true },
    travelers: { adults: 10, children: 0, infants: 0 },
    minimumAge: 1,
    startingPlace: "New Delhi",
    image: gallery['../../images/jaipur.png'] as string,
    description: "Explore the historic cities of Delhi, Agra, and Jaipur in ultimate luxury and style.",
    category: 'Group Tourism,Family Tourism',
    rating: 4.8,
    reviews: 290,
    highlights: ["Sunrise at the Taj Mahal", "Rickshaw ride in Old Delhi", "Amber Fort visit in Jaipur"],
    gallery: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      gallery['../../images/Delhi.png'] as string,
      gallery['../../images/jaipur.png'] as string
    ],
    overview: 'The Golden Triangle of India, consisting of Delhi, Agra, and Jaipur, is a popular tourist route known for its rich history and vibrant culture. In Delhi, visitors can explore landmarks like India Gate, Humayun’s Tomb, and the Red Fort. Agra is home to the majestic Taj Mahal, a symbol of eternal love, and other Mughal architecture like the Agra Fort. Jaipur, also known as the Pink City, boasts stunning palaces, forts, and temples, including the Amber Fort and City Palace. The Golden Triangle offers an unforgettable journey through India’s royal heritage, architecture, and traditions, attracting travelers worldwide.',
    tourPlan: [
      { day: 1, title: 'Arrival in Delhi', description: 'Arrive at New Delhi Airport and you would be transferred to your hotel. On arrival, check-in at the hotel.Overnight at the hotel.' },
      { day: 2, title: ' In Delhi', description: 'After breakfast, enjoy a comprehensive tour of Delhi. Begin by visiting Jama Masjid.Immerse yourself in the lively atmosphere of Chandni Chowk. Visit the iconic Red Fort, and drive past the impressive government buildings in Edwin Lutyens Delhi, including the Presidents House. Pay homage to Mahatma Gandhi at Rajghat, his memorial site. Explore Humayuns Tomb, an exquisite garden tomb constructed with red sandstone.Conclude the day with a visit to Qutab Minar. Overnight in Delhi.' },
      { day: 3, title: ' Delhi - Agra', description: 'After breakfast, drive to Agra. Check in at your hotel and proceed for a half-day city tour. Begin by exploring the majestic Red Fort. Next, visit the iconic Taj Mahal.After a day of exploration, relax and unwind at your hotel in Agra.Overnight in Agra.' },
      { day: 4, title: ' Agra - Jaipur', description: 'Embark on a full-day sightseeing trip of Jaipur.Visit the majestic Amber Fort, where you can ride up to the fort on an elephant. Capture the beauty of Hawa Mahal, the City Palace and Jantar Mantar Observatory.Overnight in Jaipur' },
      { day: 5, title: ' Jaipur - Delhi', description: 'After breakfast, drive back to Delhi. You will be transferred to Delhi airport/railway station for a return flight back home.' },

    ],
    included: ["Accommodation in well-appointed rooms as mentioned in the above hotels or equivalent", "Elephant / Jeep ride at Amer fort", "Assistance at the airport", "Sightseeing as per itinerary by private tourist vehicle", "Driver allowances, toll taxes, and Govt. Service Tax"],
    excluded: ["Air tickets and airport taxes", "Entry Fee at the Monuments", "Camera / Video camera fees applicable at monuments"],
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
