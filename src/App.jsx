import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage       from './pages/HomePage';
import CommunityPage  from './pages/CommunityPage';
import ProjectsPage   from './pages/ProjectsPage';
import EventsPage     from './pages/EventsPage';
import ResourcesPage  from './pages/ResourcesPage';
import LoginPage      from './pages/LoginPage';
import ThankYouPage   from './pages/ThankYouPage';
import CMSApp         from './pages/CMS/App';
import BlogPage       from './pages/BlogPage';

/* Routes that should NOT show the global Navbar/Footer
   (full-screen auth/thank-you experience and Blog Admin) */
const BARE_ROUTES = ['/github-login', '/discord-login', '/thank-you', '/admin'];

function Layout() {
  const location = useLocation();
  const isBare = BARE_ROUTES.includes(location.pathname);

  return (
    <>
      {!isBare && <Navbar />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/community"      element={<CommunityPage />} />
          <Route path="/projects"       element={<ProjectsPage />} />
          <Route path="/events"         element={<EventsPage />} />
          <Route path="/resources"      element={<ResourcesPage />} />

          {/* Auth flow pages */}
          <Route path="/github-login"   element={<LoginPage platform="github" />} />
          <Route path="/discord-login"  element={<LoginPage platform="discord" />} />
          <Route path="/thank-you"      element={<ThankYouPage />} />
          
          {/* Blog Routes */}
          <Route path="/blog"           element={<BlogPage />} />
          <Route path="/admin"          element={<CMSApp />} />
        </Routes>
      </AnimatePresence>

      {!isBare && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-gray-100 selection:bg-primary selection:text-black">
        <Layout />
      </div>
    </BrowserRouter>
  );
}
