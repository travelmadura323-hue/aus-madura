// App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Home from './pages/Home';
import TourDetail from './pages/TourDetail';
import DestinationDetail from './pages/DestinationDetail';
import CategoryDetail from './pages/CategoryDetail';
import MICE from './pages/MICE';
import Contact from './pages/Contact';
import AdminLogin from "./pages/admin/Adminpage";
import OurStory from './pages/OurStory';
import MediaPage from './pages/media';
import Testimonial from './pages/Testimonial';
import PackageDetails from './components/PackageDetails';
import Privacy from "./components/privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer"
import ComplaintPolicy from "./pages/complaint-policy";
import CareersPage from "./pages/CareersPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ToursDashboard from "./pages/admin/ToursDashboard";
import DestinationsDashboard from "./pages/admin/DestinationsDashboard";

import ToursPage from "./pages/ToursPage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import Dashboard from "./pages/dashboard";

import RequireAuth from "./components/admin/RequireAuth";
import { AdminProvider } from "./pages/admin/admincontext";

export default function App() {

  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* ================== Admin Routes ================== */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin/*" element={
              <RequireAuth>
                <AdminDashboard /> {/* must include <Outlet /> in AdminDashboard */}
              </RequireAuth>
            }>
              {/* Redirect /admin to /admin/tours */}
              <Route index element={<Navigate to="tours" replace />} />

              {/* Nested admin pages */}
              <Route path="tours" element={<ToursDashboard />} />
              <Route path="destinations" element={<DestinationsDashboard />} />
            </Route>

            {/* ================== Public Routes ================== */}
            <Route path="*" element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tours" element={<ToursPage />} />
                    <Route path="/tours/:slug" element={<TourDetail />} />
                    <Route path="/destinations" element={<DestinationsPage />} />
                    <Route path="/destinations/:id" element={<DestinationDetailPage />} />
                    <Route path="/pages/:country" element={<DestinationDetail />} />
                    <Route path="/categories/:category" element={<CategoryDetail />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/mice" element={<MICE />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/company/our-story" element={<OurStory />} />
                    <Route path="/package/:id" element={<PackageDetails />} />
                    <Route path="/company/careers" element={<CareersPage />} />
                    <Route path="/company/media" element={<MediaPage />} />
                    <Route path="/company/testimonials" element={<Testimonial />} />
                    <Route path="/privacy-policy" element={<Privacy />} />
                    <Route path="/terms-conditions" element={<Terms />} />
                    <Route path="/disclaimer" element={<Disclaimer />} />
                    <Route path="/complaint-policy" element={<ComplaintPolicy />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }/>
          </Routes>
        </div>
      </Router>
    </AdminProvider>
  );
}