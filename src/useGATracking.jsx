import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = "G-D0822F4WJ2"; // твой ID

let initialized = false;

export default function useGATracking() {
  const location = useLocation();

  useEffect(() => {
    if (initialized) return;
    initialized = true;

    if (
      !document.querySelector(
        `script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`,
      )
    ) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function () {
        window.dataLayer.push(arguments);
      };

    window.gtag("js", new Date());

    window.gtag("config", GA_ID, { send_page_view: false });
  }, []);

  useEffect(() => {
    if (!window.gtag) return;
    const path = location.pathname + location.search + location.hash;

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
}
