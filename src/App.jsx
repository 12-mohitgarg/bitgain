import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { DemoProvider } from './components/DemoModal';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Games from './pages/Games';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import Help from './pages/Help';
import Contact from './pages/Contact';
import GameDetail from './pages/GameDetail';

function PageWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.985, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -14, scale: 0.992, filter: 'blur(6px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <DemoProvider>
      <ScrollToTop />
      <NavBar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrap><Home /></PageWrap>} />
            <Route path="/games" element={<PageWrap><Games /></PageWrap>} />
            <Route path="/game/:id" element={<PageWrap><GameDetail /></PageWrap>} />
            <Route path="/leaderboard" element={<PageWrap><Leaderboard /></PageWrap>} />
            <Route path="/about" element={<PageWrap><About /></PageWrap>} />
            <Route path="/help" element={<PageWrap><Help /></PageWrap>} />
            <Route path="/contact" element={<PageWrap><Contact /></PageWrap>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </DemoProvider>
  );
}
