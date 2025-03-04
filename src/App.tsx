import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";

import { HUD } from "./components/HUD";
import { FlamingoMecha } from "./components/FlamingoMecha";
import { Map } from "./components/Map";

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

      <FlamingoMecha
        castShadow
        receiveShadow
        // scale={[0.1, 0.1, 0.1]} // Adjust scale as needed
        position={[0, -1.5, 0]} // Adjust position as needed
      />

      <Map />

      <HUD
        setSpotLightColor={setSpotLightColor}
        orbitalControls={orbitalControls}
        setOrbitalControls={setOrbitalControls}
      />

      {orbitalControls && <DreiOrbitControls />}
    </Canvas>
  );
}
