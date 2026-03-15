import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import useGATracking from './useGATracking';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainPage from './Components/MainPage/MainPage';
import NotFound from './Components/NotFound/NotFound';
import Layouts from './Components/Layouts/Layouts';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const AnimatedRoutes = ({ heroVisible, setHeroVisible }) => {
  const location = useLocation();

  useGATracking();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const onExitComplete = () => {
    const useCustom = window.innerWidth < 1100;
    const scroller = useCustom
      ? document.querySelector('.scroll-container')
      : window;

    gsap.set(scroller, { scrollTo: 0 });
  };

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname]);

  return (
    <AnimatePresence
      mode='wait'
      initial={false}
      onExitComplete={onExitComplete}>
      <Routes
        location={location}
        key={location.pathname}>
        <Route
          path='/'
          element={<Layouts />}>
          <Route
            index
            element={
              <MainPage
                heroVisible={heroVisible}
                setHeroVisible={setHeroVisible}
              />
            }
          />
          {/* <Route
            path='raine'
            element={<Raine />}
          />
          <Route
            path='max-milkin'
            element={<MaxMilkin />}
          />
          <Route
            path='fashion-week'
            element={<Fashion />}
          />
          <Route
            path='alex-monroe'
            element={<AlexMonroe />}
          />
          <Route
            path='press-play'
            element={<PressPlay />}
          />
          <Route
            path='outside'
            element={<Outside />}
          />
          <Route
            path='sent'
            element={<Sent />}
          />
          <Route
            path='easter-egg'
            element={<Secret />}
          /> */}
          <Route
            path='*'
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
