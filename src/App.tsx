import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LeadersPage } from './pages/LeadersPage';
import { ContactPage } from './pages/ContactPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { SiteFooter } from './components/layout/SiteFooter';

function HashScroller() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    window.setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [location.pathname, location.hash]);

  return null;
}

export function App() {
  return <ErrorBoundary><QueryClientProvider client={queryClient}><BrowserRouter><Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/home" element={<Navigate to="/" replace/>}/>
    <Route path="/about-us" element={<Navigate to="/about" replace/>}/>
    <Route path="/properties" element={<Navigate to="/#plots" replace/>}/>
    <Route path="/plots" element={<Navigate to="/#plots" replace/>}/>
    <Route path="/faq" element={<Navigate to="/#faq" replace/>}/>
    <Route path="/frequently-asked-questions" element={<Navigate to="/#faq" replace/>}/>
    <Route path="/enquiries" element={<Navigate to="/#contact" replace/>}/>
    <Route path="/visit" element={<Navigate to="/#contact" replace/>}/>
    <Route path="/site-visit" element={<Navigate to="/#contact" replace/>}/>
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/leaders" element={<LeadersPage/>}/>
    <Route path="/contact" element={<ContactPage/>}/>
    <Route path="/portfolio/:category" element={<PortfolioPage/>}/>
    <Route path="/plots/:slug" element={<HomePage/>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes><HashScroller/><SiteFooter/></BrowserRouter></QueryClientProvider></ErrorBoundary>;
}
