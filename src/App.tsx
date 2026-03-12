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
// import Dashboard from "./pages/admin/dashboard";
// import Login from "./pages/admin/Login";
// import AddTour from "./pages/admin/AddTourPage";
// import DeleteTour from "./pages/admin/DeleteTourPage";
// import AddDestination from "./pages/admin/DestinationsAddPage";
// import DeleteDestination from "./pages/admin/DestinationsDeletePage";
// import EditDestination from "./pages/admin/DestinationsEditPage";
// import EditTour from "./pages/admin/EditTourPage";
// import Tours from "./pages/admin/TourPage";

export default function App() {

  const docRef = doc(db, "users", "UhHXaXitavSsa9w37RFl")
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
            {/* <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/destinations" element={<Destinations />} />

<Route path="/admin/destinations/add" element={<AddDestination />} />

<Route path="/admin/destinations/edit/:id" element={<EditDestination />} />

<Route path="/admin/destinations/delete/:id" element={<DeleteDestination />} />

<Route path="/admin/tours" element={<Tours />} />

<Route path="/admin/tours/add" element={<AddTour />} />

<Route path="/admin/tours/edit/:id" element={<EditTour />} />

<Route path="/admin/tours/delete/:id" element={<DeleteTour />} />
 */}

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}


