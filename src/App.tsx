/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

/**
 * Helper component to scroll window to top upon navigation
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Animated Routes Component to handle page transitions
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="*" element={
            <div className="max-w-7xl mx-auto px-10 py-20">
              <h1 className="type-display mb-8">404</h1>
              <p className="type-label mb-12">Architecture not found. Entry does not exist.</p>
              <a href="/" className="swiss-button">Return to Index</a>
            </div>
          } />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Main App Component with Routing
 */
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col lg:flex-row min-h-screen selection:bg-swiss-red selection:text-white">
        {/* Sidebar */}
        <aside className="w-full lg:w-[320px] lg:h-screen lg:sticky lg:top-0 border-b lg:border-b-0 lg:border-r-2 border-slate-900 bg-white p-10 flex flex-col justify-between z-50">
          <div>
            <div className="type-label mb-8">Book / Archive</div>
            <a href="/" className="type-display block mb-12">
              BOOK<br />DISCO<br />VERY.
            </a>
            
            <div className="mt-16 hidden lg:block">
              <p className="type-label mb-4 opacity-50">Navigation</p>
              <nav className="flex flex-col gap-4 font-bold text-sm uppercase tracking-tighter">
                <a href="/" className="hover:text-swiss-blue transition-colors w-fit underline underline-offset-4 decoration-2">Gallery View</a>
                <span className="opacity-30 cursor-not-allowed">Visual Index</span>
                <span className="opacity-30 cursor-not-allowed">Cartography</span>
              </nav>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <div className="border-t border-slate-200 pt-6">
              <p className="type-label mb-2">Project Status</p>
              <p className="text-[10px] font-mono font-bold tracking-widest">v1.0. Beta</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-swiss-paper">
          <AnimatedRoutes />
          
          <footer className="border-t border-slate-200 py-10 px-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-white">
            <div className="type-label text-[9px]">
              Muhammad Daffa Syammary © 2026
            </div>
          </footer>
        </main>
      </div>
    </Router>
  );
}

