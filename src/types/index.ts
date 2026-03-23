export interface Tour {
  id?: string;
  title: string;
  slug: string;
  startingPlace: string;
  location: { country: string; cities: string[] };
  duration: { days: number; nights: number };
  price: { startingFrom: number; currency: string; perPerson: boolean };
  description?: string;
  image?: string;
  overview?: string;
  category?: string[]; // Legacy field
  categories?: string[]; // ✅ NEW: Firestore field (multi-select categories)
  rating?: number;
  reviews?: number;
  highlights: string[];
  tourPlan: { day: number; title: string; description: string }[];
  included: string[];
  excluded: string[];
  faqs: { question: string; answer: string }[];
  gallery?: string[];
  travelers?: { adults: number; children: number; infants: number };
  minimumAge?: number;
}

export const defaultTour: Tour = {
  title: "",
  slug: "",
  startingPlace: "",
  location: { country: "", cities: [] },
  duration: { days: 0, nights: 0 },
  price: { startingFrom: 0, currency: "AUD", perPerson: true },
  description: "",
  highlights: [],
  tourPlan: [],
  included: [],
  excluded: [],
  faqs: [],
  minimumAge: undefined,
  rating: undefined,
};

export interface Destination {
  id?: string;
  name: string;
  slug: string;
  country?: string;
  cities: string[];
  description: string;
  images: string[];
  type?: "domestic" | "international";
  region?: string;
  price?: string;
  status?: "Published" | "Draft";
  header?: string; // ✅ NEW: Destination header (e.g. "Mainland Europe", "Southeast Asia")
  countriesIncluded?: string[]; // ✅ NEW: Countries mapped to this destination for filtering
}

export const defaultDestination: Destination = {
  name: "",
  slug: "",
  country: "",
  cities: [],
  description: "",
  images: [],
  status: "Published",
  header: "",
  countriesIncluded: [],
};
