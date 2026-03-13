import gsap from "gsap";
import { useCopy } from "./CopyContext";
import "./style.scss";
import { useEffect, useRef } from "react";

const CopyTooltip = () => {
  const tooltipRef = useRef();
  const { isActive, cursor } = useCopy();
  const animRef = useRef(null);

  useEffect(() => {
    if (!cursor) return;

    gsap.set(tooltipRef.current, {
      x: cursor.x + 40,
      y: cursor.y,
    });

    const moveTooltip = (e) => {
      gsap.to(tooltipRef.current, {
        x: e.clientX + 40,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveTooltip);
    return () => window.removeEventListener("mousemove", moveTooltip);
  }, [cursor]);

  useEffect(() => {
    if (!tooltipRef.current) return;
    animRef.current?.kill();

    if (isActive) {
      animRef.current = gsap.fromTo(
        tooltipRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.5,
          ease: "power3.out",
        },
      );
    } else {
      animRef.current = gsap.to(tooltipRef.current, {
        clipPath: "inset(0 0 0 100%)",
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [isActive]);

  return (
    <div
      ref={tooltipRef}
      className="copy-tooltip"
      style={{
        clipPath: "inset(0 0 0 100%)",
      }}>
      <span>Copied</span>
    </div>
  );
};

export default CopyTooltip;
