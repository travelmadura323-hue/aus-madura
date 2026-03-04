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
import India from "./pages/India";
import MediaPage from './pages/media';
import Testimonial from './pages/Testimonial';
import PackageDetails from './components/PackageDetails';
import Singapore from "./pages/singapore";
import Malaysia from "./pages/Malaysia";
import Vietnam from "./pages/vietnam";
import SriLanka from "./pages/sri-lanka";
import Australia from "./pages/australia";
import Privacy from "./components/privacy";
import Terms from "./pages/Terms";


export default function App() {
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
            <Route path="/mice" element={<MICE />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/company/our-story" element={<OurStory />} />
            <Route path="/pages/india" element={<India />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/pages/vietnam" element={<Vietnam />} />
            <Route path="/pages/sri-lanka" element={<SriLanka />} />
            {/* Fallback routes for demo */}
            {/* <Route path="/:country" element={<CountryPage />} /> */}
            <Route path="/pages/singapore" element={<Singapore />} />
            <Route path="/pages/australia" element={<Australia />} />
            <Route path="/company/media" element={<MediaPage />} />
            <Route path="/company/testimonials" element={<Testimonial />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-conditions" element={<Terms />} />

            <Route path="/pages/malaysia" element={<Malaysia />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


