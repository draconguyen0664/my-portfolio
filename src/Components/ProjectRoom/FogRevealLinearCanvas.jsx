import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FogRevealLinearCanvas({
  color = "#101010",

  startNear = 0.1,
  startFar = 0.1,

  endNear = 0.01,
  endFar = 3.0,

  sectionSelector,
  start = "top top",
  end = "+=50%",
} = {}) {
  const { scene, gl } = useThree();
  const prevFogRef = useRef(null);

  useEffect(() => {
    let triggerEl = null;
    if (sectionSelector) triggerEl = document.querySelector(sectionSelector);
    if (!triggerEl) {
      const canvasEl = gl?.domElement;
      triggerEl =
        canvasEl?.closest(".projects") ||
        canvasEl?.closest(".projects-canvas") ||
        canvasEl?.parentElement ||
        document.body;
    }

    prevFogRef.current = scene.fog;

    const fog = new THREE.Fog(color, startNear, startFar);
    scene.fog = fog;

    const tween = gsap.to(fog, {
      near: endNear,
      far: endFar,
      ease: "none",
      scrollTrigger: {
        trigger: triggerEl,
        start,
        end,
        scrub: 2,
        invalidateOnRefresh: true,
        scroller: window.innerWidth < 1100 ? ".scroll-container" : null,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      scene.fog = prevFogRef.current || null;
    };
  }, [
    scene,
    gl,
    color,
    startNear,
    startFar,
    endNear,
    endFar,
    sectionSelector,
    start,
    end,
  ]);

  return null;
}
