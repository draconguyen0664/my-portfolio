import { useState, useEffect, useRef } from "react";
import Time from "../../Time";
import AnimatedLink from "../Animation/AnimatedLink";
import "./style.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const toggleBurger = () => setIsBurgerActive((p) => !p);

  const location = useLocation();
  const navigate = useNavigate();

  const headerTriggersRef = useRef([]);

  const smoothScrollToId = (id) => {
    const scroller =
      window.innerWidth < 1100
        ? document.querySelector(".scroll-container")
        : window;

    const target = document.getElementById(id);
    if (!target) return;

    const headerEl = document.querySelector(".header");
    const offsetY = headerEl ? headerEl.offsetHeight : 0;

    gsap.to(scroller, {
      duration: 0.8,
      ease: "power3.out",
      scrollTo: { y: target, offsetY, autoKill: true },
      overwrite: "auto",
    });
  };

  const handleAnchor = (e, id) => {
    e.preventDefault();
    if (window.innerWidth < 768 && isBurgerActive) setIsBurgerActive(false);

    if (location.pathname === "/") {
      smoothScrollToId(id);
    } else {
      sessionStorage.setItem("pendingAnchor", id);
      navigate(`/#${id}`);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (window.innerWidth < 768 && isBurgerActive) setIsBurgerActive(false);
    smoothScrollToId("footer");
  };

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const ST =
      window.innerWidth < 1100 ? { scroller: ".scroll-container" } : {};
    const setColor = (color) =>
      gsap.to([".header-logo", ".burger"], {
        color,
        duration: 0.3,
        overwrite: "auto",
      });

    const killOwn = () => {
      headerTriggersRef.current.forEach((t) => t.kill());
      headerTriggersRef.current = [];
    };

    const create = () => {
      const zones = document.querySelectorAll(".dark-zone");
      if (!zones.length) return false;

      setColor("#000");
      killOwn();

      zones.forEach((zone) => {
        const t = ScrollTrigger.create({
          trigger: zone,
          start: "top 5%",
          end: "bottom top",
          onEnter: () => {
            if (!isBurgerActive) setColor("#fff");
          },
          onEnterBack: () => {
            if (!isBurgerActive) setColor("#fff");
          },
          onLeave: () => {
            if (!isBurgerActive) setColor("#000");
          },
          onLeaveBack: () => {
            if (!isBurgerActive) setColor("#000");
          },
          ...ST,
        });
        headerTriggersRef.current.push(t);
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return true;
    };

    let ok = create();

    const onReady = () => {
      create();
    };
    window.addEventListener("darkzones-ready", onReady);

    if (!ok) {
      requestAnimationFrame(() => {
        if (!create()) setTimeout(create, 60);
      });
    }

    return () => {
      window.removeEventListener("darkzones-ready", onReady);
      killOwn();
    };
  }, [location.pathname, isBurgerActive]);

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    if (isBurgerActive) {
      gsap.to([".header-logo", ".burger"], {
        color: "#000",
        duration: 0.2,
        overwrite: "auto",
      });
    }
  }, [isBurgerActive]);

  return (
    <header className={`header ${isBurgerActive ? "burger-active" : ""}`}>
      <div className="container">
        <div className="header__wrapper">
          <NavLink to="/" className="header-logo">
            Draco Nguyen
          </NavLink>

          <nav className="header__menu">
            <ul>
              <li>
                <AnimatedLink
                  text="about me"
                  onClick={(e) => handleAnchor(e, "about")}
                  to="/"
                />
              </li>
              <li>
                <AnimatedLink
                  text="works"
                  onClick={(e) => handleAnchor(e, "works")}
                  to="/"
                />
              </li>
              <li>
                <AnimatedLink
                  text="services"
                  onClick={(e) => handleAnchor(e, "services")}
                  to="/"
                />
              </li>
              <li>
                <AnimatedLink
                  text="connect"
                  onClick={(e) => handleAnchor(e, "connect")}
                  to="/"
                />
              </li>
            </ul>

            <div className="header__menu-mobile">
              {window.innerWidth < 768 ? <Time /> : null}
              <div className="header__menu-behance">
                <a href="#" className="link">
                  dribble
                </a>
                <a href="#" className="link">
                  behance
                </a>
                <a href="#" className="link">
                  linkedin
                </a>
              </div>
              <a href="tel:+84703786003" className="header__menu-phone">
                +84 703 786 003
              </a>
              <a
                href="mailto:draconguyen0664@gmail.com"
                className="header__menu-mail"
              >
                draconguyen0664@gmail.com
              </a>
              <div className="header__menu-socials">
                <a
                  href="https://www.instagram.com/olha.lazarieva?igsh=MXMzYTM4azFvd3gwNA%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  instagram
                </a>
                <a
                  href="https://t.me/ola_la0304"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  telegram
                </a>
                <a
                  href="https://www.facebook.com/olha.lazarieva"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  facebook
                </a>
              </div>
              <div className="header__menu-reserved">
                <p>
                  © All right reserved.
                  <br />
                  2026 DracoNguyen
                </p>
                <a
                  href="https://maxmilkin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dev - MM
                </a>
              </div>
            </div>
          </nav>

          <div className="burger" onClick={toggleBurger}>
            <span>menu</span>
            <span className="close">
              <span>close</span>
            </span>
          </div>

          <a
            href="#footer"
            onClick={handleContactClick}
            className="header-contact link-line"
          >
            contact me
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104"
                stroke="rgb(239, 239, 239)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
