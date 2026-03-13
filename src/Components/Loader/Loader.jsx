import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import CameraOrbit from "./CameraOrbit";
import TexturedSphere from "./TexturedSphere";
import gsap from "gsap";
import "./style.scss";

function ReadyPing({ onReady }) {
  const { active } = useProgress();
  const fired = useRef(false);

  useFrame(() => {
    if (!fired.current && !active) {
      fired.current = true;
      onReady?.();
    }
  });

  return null;
}

const Loader = ({ onExit }) => {
  const counterRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [exitTrigger, setExitTrigger] = useState(false);
  const [canvasState, setCanvasState] = useState(true);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) return;

    const tl = gsap.timeline();

    tl.to(counterRef.current, { opacity: 1, duration: 0.6, delay: 2.3 });

    tl.to(
      { value: 0 },
      {
        value: 100,
        duration: 4,
        delay: 0.5,
        ease: "power3.out",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].value));
        },
      },
      "-=0.3",
    );

    tl.to(counterRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setExitTrigger(true);
        setTimeout(() => {
          setCanvasState(false);
        }, 3000);
      },
    });

    return () => tl.kill();
  }, [isReady]);

  return (
    <div className="loader">
      {canvasState && (
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <color attach="background" args={["#f7f7f7"]} />
          <Suspense fallback={null}>
            <ReadyPing onReady={() => setIsReady(true)} />

            {window.innerWidth > 1100 ? <CameraOrbit /> : null}
            <TexturedSphere exitTrigger={exitTrigger} onExitComplete={onExit} />
          </Suspense>
        </Canvas>
      )}

      <div className="loader-counter" ref={counterRef}>
        {progress}%
      </div>
    </div>
  );
};

export default Loader;
