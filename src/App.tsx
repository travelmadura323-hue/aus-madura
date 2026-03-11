/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';


import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import DestinationDetail from './pages/DestinationDetail';
import CategoryDetail from './pages/CategoryDetail';
import MICE from './pages/MICE';
import Contact from './pages/Contact';
import OurStory from './pages/OurStory';
import India from "./components/destinations/India";
import MediaPage from './pages/media';
import Testimonial from './pages/Testimonial';
import PackageDetails from './components/PackageDetails';
import Singapore from "./components/destinations/singapore";
import Malaysia from "./components/destinations/Malaysia";
import Vietnam from "./components/destinations/vietnam";
import SriLanka from "./components/destinations/sri-lanka";
import Australia from "./components/destinations/australia";
import Privacy from "./components/privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer"
import ComplaintPolicy from "./pages/complaint-policy";
import CareersPage from "./pages/CareersPage";
import { doc } from "firebase/firestore";
import { db } from "./firebase-config";
import { useEffect } from "react";    
import { collection, getDocs } from "firebase/firestore";
import Destinations from "./pages/TourPackage";

export default function App() {

  const docRef = doc(db, "users","UhHXaXitavSsa9w37RFl")
  const getData = async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));

    snapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });

  } catch (error) {
    console.error("Firestore error:", error);
  }
};
  useEffect(() => {
    getData()
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/tours/:slug" element={<TourDetail />} />
            <Route path="/pages/:country" element={<DestinationDetail />} />
            <Route path="/categories/:category" element={<CategoryDetail />} />
            <Route path="/destinations" element={<Destinations />} />

<Route
  path="/destinations/:id"
  element={<Destinations />}
/>
            <Route path="/mice" element={<MICE />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company/our-story" element={<OurStory />} />
            <Route path="/destinations/india" element={<India />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/destinations/vietnam" element={<Vietnam />} />
            <Route path="/destinations/sri-lanka" element={<SriLanka />} />
            <Route path="/company/careers" element={<CareersPage />} />
            {/* Fallback routes for demo */}
            {/* <Route path="/:country" element={<CountryPage />} /> */}
            <Route path="/destinations/singapore" element={<Singapore />} />
            <Route path="/destinations/australia" element={<Australia />} />
            <Route path="/company/media" element={<MediaPage />} />
            <Route path="/company/testimonials" element={<Testimonial />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-conditions" element={<Terms />} />
            <Route path="/destinations/malaysia" element={<Malaysia />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/complaint-policy" element={<ComplaintPolicy />} />
          </Routes>
        </main>
       
        <Footer />
      </div>
    </Router>
  );
}


