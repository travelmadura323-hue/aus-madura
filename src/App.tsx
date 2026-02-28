  /**
   * @license
   * SPDX-License-Identifier: Apache-2.0
   */

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
  import India  from "./pages/india";

  export default function App() {
    return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/destinations/:country" element={<DestinationDetail />} />
              <Route path="/categories/:category" element={<CategoryDetail />} />
              <Route path="/mice" element={<MICE />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/company/our-story" element={<OurStory />} />
              {/* Fallback routes for demo */}
              <Route path="/company/*" element={<OurStory />} />
              <Route path="/india" element={<India />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
