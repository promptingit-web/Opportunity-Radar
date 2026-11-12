import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { Discover } from './pages/Discover';
import { Explore } from './pages/Explore';
import { OpportunityDetails } from './pages/OpportunityDetails';
import { ForYou } from './pages/ForYou';
import { MyOpportunities } from './pages/MyOpportunities';
import { DeadlineCalendar } from './pages/DeadlineCalendar';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F7F7F4] text-[#202B3C]">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/opportunity/:id" element={<OpportunityDetails />} />
              <Route path="/for-you" element={<ForYou />} />
              <Route path="/my-opportunities" element={<MyOpportunities />} />
              <Route path="/calendar" element={<DeadlineCalendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              {/* Fallback to Discover */}
              <Route path="*" element={<Discover />} />
            </Routes>
          </main>

          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;

