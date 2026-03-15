import ReactLenis from "lenis/react";
import React, { useEffect, useRef, useState } from "react";
import Loader from "./Components/Loader/Loader";
import { BrowserRouter } from "react-router-dom";
import { CopyProvider } from "./Components/Animation/CopyContext";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import CopyTooltip from "./Components/Animation/CopyTooltip";
import AnimatedRoutes from "./AnimatedRoutes";
import RouteScrollTop from "./RouteScrollTop";

function App() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const scrollerRef = useRef(null);

  const handleLoaderExit = () => {
    document.body.classList.add("loaded");
    setHeroVisible(true);
    setHasLoaded(true);
  };

  useEffect(() => {
    document.body.classList.remove("loaded");
    setHeroVisible(false);
    setHasLoaded(false);
  }, []);

  return (
    <ReactLenis root>
      <div>
        <div className="scroll-container" ref={scrollerRef}>
          {!hasLoaded && <Loader onExit={handleLoaderExit} />}
          <CopyProvider>
            <BrowserRouter>
              <Header />
              <RouteScrollTop />
              <AnimatedRoutes
                heroVisible={heroVisible}
                setHeroVisible={setHeroVisible}
                scrollerRef={scrollerRef}
              />
              <Footer />
            </BrowserRouter>
            {window.innerWidth > 1100 ? <CopyTooltip /> : null}
          </CopyProvider>
        </div>
      </div>
    </ReactLenis>
  );
}

export default App;
