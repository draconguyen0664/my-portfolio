import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function SlideSlider({ slides, onChange, onHoverChange }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStart = useRef(0);
  const dragDelta = useRef(0);
  const isDragging = useRef(false);

  const slideWidth = 0.813;
  const slideHeight = 0.47;

  const textures = useLoader(
    THREE.TextureLoader,
    slides.map((s) => s.img),
  );
  const meshesRef = useRef([]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const updateIndex = (newIndex) => {
    setCurrentIndex(newIndex);
    onChange?.(newIndex);
  };

  const startDrag = (x) => {
    dragStart.current = x;
    dragDelta.current = 0;
    isDragging.current = true;
    document.body.style.cursor = "grabbing";

    window.addEventListener("pointermove", handleWindowMove);
    window.addEventListener("pointerup", handleWindowUp);
    window.addEventListener("touchmove", handleWindowMove, { passive: true });
    window.addEventListener("touchend", handleWindowUp);
  };

  const handleWindowMove = (e) => {
    if (!isDragging.current) return;
    const clientX = getClientX(e);
    dragDelta.current = clientX - dragStart.current;
  };

  const handleWindowUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const delta = dragDelta.current;
    if (delta < -40 && currentIndex < slides.length - 1)
      updateIndex(currentIndex + 1);
    else if (delta > 40 && currentIndex > 0) updateIndex(currentIndex - 1);

    dragDelta.current = 0;
    document.body.style.cursor = "grab";

    window.removeEventListener("pointermove", handleWindowMove);
    window.removeEventListener("pointerup", handleWindowUp);
    window.removeEventListener("touchmove", handleWindowMove);
    window.removeEventListener("touchend", handleWindowUp);
  };

  useFrame(() => {
    meshesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const targetOpacity = i === currentIndex ? 1 : 0;
      mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.15;
    });
  });

  return (
    <group>
      <mesh
        position={[0, 0, -0.69]}
        onPointerEnter={() => {
          onHoverChange?.(true);
          document.body.style.cursor = "grab";
        }}
        onPointerLeave={() => {
          onHoverChange?.(false);
          document.body.style.cursor = "default";
        }}
        onPointerDown={(e) => startDrag(getClientX(e))}
        onTouchStart={(e) => startDrag(getClientX(e))}>
        <planeGeometry args={[slideWidth, slideHeight]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {textures.map((texture, i) => (
        <mesh
          key={i}
          ref={(el) => (meshesRef.current[i] = el)}
          position={[0.004, 0.001, -0.72]}>
          <planeGeometry args={[slideWidth, slideHeight]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={i === currentIndex ? 1 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}
