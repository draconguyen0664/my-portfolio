import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useMemo } from "react";

export default function BeamCone({
  texture = "/img/beam_linear_1024x2048.png",
  color = "white",
  length = 2.2,
  radius = 0.45,
  segments = 32,
  additive = true,
  ...props
}) {
  const tex = useLoader(TextureLoader, texture);

  useMemo(() => {
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.encoding = THREE.sRGBEncoding;
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.anisotropy = 8;
  }, [tex]);

  return (
    <mesh renderOrder={10} {...props}>
      <coneGeometry args={[radius, length, segments, 1, true]} />
      <meshBasicMaterial
        map={tex}
        color={color}
        transparent
        depthWrite={false}
        depthTest
        side={THREE.DoubleSide}
        blending={additive ? THREE.AdditiveBlending : THREE.NormalBlending}
        opacity={0.1}
      />
    </mesh>
  );
}
