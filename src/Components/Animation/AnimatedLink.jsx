import { useEffect, useRef } from "react";
import gsap from "gsap";
import { NavLink } from "react-router-dom";

const AnimatedLink = ({ text, to = "/", className = "", onClick, target }) => {
  const linkRef = useRef(null);

  useEffect(() => {
    const el = linkRef.current;
    if (!el) return;

    const topSpans = el.querySelectorAll(".original span");
    const bottomSpans = el.querySelectorAll(".clone span");
    const isLargeScreen = () => window.innerWidth > 1100;

    const enter = () => {
      if (!isLargeScreen()) return;
      gsap.to(topSpans, {
        yPercent: -100,
        stagger: { each: 0.02, from: "end" },
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(bottomSpans, {
        yPercent: -100,
        stagger: { each: 0.02, from: "end" },
        duration: 0.5,
        ease: "power3.out",
      });
    };
    const leave = () => {
      if (!isLargeScreen()) return;
      gsap.to(topSpans, {
        yPercent: 0,
        stagger: { each: 0.02, from: "end" },
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(bottomSpans, {
        yPercent: 100,
        stagger: { each: 0.02, from: "end" },
        duration: 0.5,
        ease: "power3.out",
      });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  const letters = text.split("");

  const content = (
    <>
      <span className="original">
        {letters.map((c, i) => (
          <span key={`t-${i}`}>{c === " " ? "\u00A0" : c}</span>
        ))}
      </span>
      <span className="clone" aria-hidden="true">
        {letters.map((c, i) => (
          <span key={`b-${i}`}>{c === " " ? "\u00A0" : c}</span>
        ))}
      </span>
    </>
  );

  if (target) {
    return (
      <a
        href={to}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={`link ${className}`}
        ref={linkRef}
        onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <NavLink
      to={to}
      className={`link ${className}`}
      ref={linkRef}
      onClick={onClick}>
      {content}
    </NavLink>
  );
};

export default AnimatedLink;
