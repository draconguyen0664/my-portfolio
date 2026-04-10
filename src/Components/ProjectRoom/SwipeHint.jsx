import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function SwipeHint({ show }) {
  const hintRef = useRef(null);
  const quickX = useRef(null);
  const quickY = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!hintRef.current) return;

    quickX.current = gsap.quickTo(hintRef.current, "left", {
      duration: 0.5,
      ease: "power3.out",
    });
    quickY.current = gsap.quickTo(hintRef.current, "top", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMove = (e) => {
      quickX.current(e.clientX + 16);
      quickY.current(e.clientY + 16);
    };

    if (show) {
      window.addEventListener("mousemove", handleMove);
    } else {
      window.removeEventListener("mousemove", handleMove);
    }

    return () => window.removeEventListener("mousemove", handleMove);
  }, [show]);

  useEffect(() => {
    if (!hintRef.current) return;

    animRef.current?.kill();

    if (show) {
      animRef.current = gsap.fromTo(
        hintRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.5,
          delay: 0.2,
          ease: "power3.out",
        },
      );
    } else {
      animRef.current = gsap.to(hintRef.current, {
        clipPath: "inset(0 0 0 100%)",
        duration: 0.5,
        delay: 0.2,
        ease: "power3.in",
      });
    }
  }, [show]);

  return (
    <div
      ref={hintRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        background: "#101010",
        color: "#fff",
        padding: "4rem 20rem",
        borderRadius: "3rem",
        fontSize: "12rem",
        whiteSpace: "nowrap",
        zIndex: 9999,
        clipPath: "inset(0 100% 0 0)",
      }}>
      Swipe
    </div>
  );
}
