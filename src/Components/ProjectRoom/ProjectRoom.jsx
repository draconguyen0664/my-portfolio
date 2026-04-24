import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, AdaptiveEvents } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./style.scss";
import SlideSlider from "./Slides";
import SwipeHint from "./SwipeHint";
import AnimatedLink from "../Animation/AnimatedLink";
import FogRevealLinearCanvas from "./FogRevealLinearCanvas";
import BeamCone from "./BeamCone";

gsap.registerPlugin(ScrollTrigger);

function SimplePlaybackGate() {
  const set = useThree((s) => s.set);

  useEffect(() => {
    set({ frameloop: "demand" });

    const scroller =
      window.innerWidth < 1100
        ? document.querySelector(".scroll-container")
        : undefined;

    const about = document.querySelector(".about");
    const services = document.querySelector(".services");
    const triggerEl = about || document.querySelector(".projects");
    const endEl = services || triggerEl;

    if (!triggerEl) return;

    const enable = () => set({ frameloop: "always" });
    const disable = () => set({ frameloop: "demand" });

    const st = ScrollTrigger.create({
      trigger: triggerEl,
      start: about ? "center center" : "top bottom",
      endTrigger: endEl,
      end: services ? "center top" : "center top",
      scroller,
      onEnter: enable,
      onEnterBack: enable,
      onLeave: disable,
      onLeaveBack: disable,
    });

    gsap.delayedCall(0, () => (st.isActive ? enable() : disable()));

    return () => {
      st.kill();
      disable();
    };
  }, [set]);

  return null;
}

function Scene() {
  const { scene } = useGLTF("./models/final-scene.glb");
  const { gl } = useThree();

  useEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) return;

      const oldMat = child.material;
      const map = oldMat?.map ?? null;

      if (map) {
        map.encoding = THREE.sRGBEncoding;
        map.flipY = false;
      }

      const mat = new THREE.MeshStandardMaterial({
        map: map || null,
        emissiveMap: map || null,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 1.0,
        roughness: 1.0,
        metalness: 0.0,
      });

      if (oldMat?.normalMap) mat.normalMap = oldMat.normalMap;
      if (oldMat?.aoMap) mat.aoMap = oldMat.aoMap;
      if (oldMat?.roughnessMap) mat.roughnessMap = oldMat.roughnessMap;

      oldMat?.dispose?.();
      child.material = mat;
      child.material.needsUpdate = true;
    });
  }, [scene, gl]);

  return (
    <group position={[0, -0.25, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.1 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.1 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function IntroRise({ sectionRef, children }) {
  const stageRef = useRef();
  const { invalidate } = useThree();

  useEffect(() => {
    if (!stageRef.current || !sectionRef?.current) return;

    const link = document.querySelector(".projects-canvas .link");

    gsap.fromTo(
      link,
      { opacity: 0, pointerEvents: "none" },
      {
        opacity: 1,
        pointerEvents: "auto",
        scrollTrigger: {
          trigger: ".projects",
          start: "top -100%",
          end: "bottom 100%",
          scrub: true,
          scroller: window.innerWidth < 1100 ? ".scroll-container" : null,
        },
      },
    );

    if (window.innerWidth < 1100) {
      const swipeText = document.querySelector(".projects-canvas__swipe");
      gsap.fromTo(
        swipeText,
        { opacity: 0, pointerEvents: "none" },
        {
          opacity: 1,
          pointerEvents: "auto",
          scrollTrigger: {
            trigger: ".projects",
            start: "top -100%",
            end: "bottom 100%",
            scrub: true,
            scroller: window.innerWidth < 1100 ? ".scroll-container" : null,
          },
        },
      );
    }

    const startX = 1.5;
    const endX = 0;

    stageRef.current.rotation.set(startX, 0, 0);

    const enterTween = gsap.to(stageRef.current.rotation, {
      x: endX,
      ease: "none",
      onUpdate: invalidate,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 40%",
        end: "+=200%",
        scrub: 2,
        invalidateOnRefresh: true,
        scroller: window.innerWidth < 1100 ? ".scroll-container" : null,
      },
    });

    return () => {
      enterTween.scrollTrigger?.kill();
      enterTween.kill();
    };
  }, [sectionRef, invalidate]);

  return (
    <group ref={stageRef}>
      {children}
      <BeamCone
        position={[0.029, 0.177, 0.37]}
        rotaion={[0.5, 0, 0]}
        scale={[0.1, 0.03, 0.1]}
        rotation={[Math.PI / 2, 0, 0]}
        length={2}
        radius={0.45}
        texture="/beam_linear_1024x2048.png"
        additive
      />
    </group>
  );
}

export default function ProjectRoom() {
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [exposure] = useState(0.92);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth > 1100 : true,
  );
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth > 1100);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const slides = [
    { img: "./projects/art6.jpg", link: "/max-milkin" },
    { img: "./projects/art4.jpg", link: "/fashion-week" },
    { img: "./projects/art1.jpg", link: "/press-play" },
    { img: "./projects/art5.jpg", link: "/raine" },
    { img: "./projects/art2.jpg", link: "/alex-monroe" },
    { img: "./projects/art3.jpg", link: "/outside" },
  ];

  return (
    <section className="projects" id="works" ref={sectionRef}>
      <h2 className="projects__title title animation-title">recent works</h2>
      <div className="projects-canvas">
        <Canvas
          dpr={[
            1,
            Math.min(
              2,
              typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
            ),
          ]}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            outputEncoding: THREE.sRGBEncoding,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: exposure,
          }}
          camera={{ position: [0, 0, 1.5], fov: 45 }}>
          <color attach="background" args={["#101010"]} />
          <Environment preset="night" />

          <Suspense fallback={null}>
            <FogRevealLinearCanvas
              color="#101010"
              startNear={0.01}
              startFar={2.7}
              endNear={2.5}
              endFar={3}
              sectionSelector=".projects"
              start="top top"
              end="+=200%"
            />

            <IntroRise sectionRef={sectionRef}>
              <Scene />
              <SlideSlider
                slides={slides}
                onChange={setCurrentSlide}
                onHoverChange={setHovering}
              />
            </IntroRise>

            <SimplePlaybackGate />
          </Suspense>

          {isDesktop ? <CameraRig /> : null}

          <AdaptiveEvents />
        </Canvas>

        {isDesktop ? <SwipeHint show={hovering} /> : null}

        <div className="projects-canvas__swipe">Swipe slider</div>

        <AnimatedLink text="view case" to={slides[currentSlide].link} />
      </div>
    </section>
  );
}
