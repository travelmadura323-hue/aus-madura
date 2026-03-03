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
  import India  from "./pages/India";
  import Careers from './pages/CareersPage';
  import MediaPage from './pages/media';
  import Testimonial from './pages/Testimonial';
// import CareersPage from './pages/CareersPage';
   import PackageDetails from './pages/packageDetails';
     import Singapore from "./pages/singapore";
     import Malaysia from "./pages/Malaysia";

  export default function App() {
    return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
             <ScrollToTop /> 
            <Routes>
             
              <Route path="/" element={<Home />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/destinations/:country" element={<DestinationDetail />} />
              <Route path="/categories/:category" element={<CategoryDetail />} />
              <Route path="/mice" element={<MICE />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/company/our-story" element={<OurStory />} />
              <Route path="/destinations/india" element={<India />} />
        <Route path="/package/:id" element={<PackageDetails />} />
              {/* Fallback routes for demo */}
            

<Route path="/destinations/singapore" element={<Singapore />} />
             
              {/* <Route path="/india" element=
              {<India />} /> */}
              {/* <Route path="/company/careers" element={<CareersPage />} />  */}
              <Route path="/company/media" element={<MediaPage />} /> 
              <Route path="/company/testimonials" element={<Testimonial />} />


<Route path="/destinations/malaysia" element={<Malaysia />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }


