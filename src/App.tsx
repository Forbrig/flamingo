import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";

import { HUD } from "./components/HUD";
import { FlamingoMecha } from "./components/FlamingoMecha";

import "./App.css";

export default function App() {
  const [spotLightColor, setSpotLightColor] = useState<
    "white" | "yellow" | "blue" | "green"
  >("yellow");
  const [orbitalControls, setOrbitalControls] = useState(false);

  return (
    <Canvas shadows camera={{ position: [2, 2, 5] }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        castShadow
        color={spotLightColor}
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* <pointLight
        castShadow
        color={"red"}
        position={[-10, -10, -10]}
        decay={0}
        intensity={Math.PI}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      /> */}

      <FlamingoMecha
        castShadow
        receiveShadow
        // scale={[0.1, 0.1, 0.1]} // Adjust scale as needed
        position={[0, -1.5, 0]} // Adjust position as needed
      />

      {/* Floor */}
      <mesh
        receiveShadow
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Ceiling */}
      <mesh receiveShadow position={[0, 3.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Back Wall */}
      <mesh receiveShadow position={[0, 1, -5]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Left Wall */}
      <mesh receiveShadow position={[-5, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Right Wall */}
      <mesh receiveShadow position={[5, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      <HUD
        setSpotLightColor={setSpotLightColor}
        orbitalControls={orbitalControls}
        setOrbitalControls={setOrbitalControls}
      />

      {orbitalControls && <DreiOrbitControls />}
    </Canvas>
  );
}
