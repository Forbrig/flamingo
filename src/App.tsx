import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";

import { HUD } from "./components/HUD";
import { Mecha } from "./components/Mecha";
import { Scenario } from "./components/Scenario";

import "./App.css";

export default function App() {
  const [spotLightColor, setSpotLightColor] = useState<
    "white" | "yellow" | "blue" | "green"
  >("white");
  const [orbitalControls, setOrbitalControls] = useState(false);

  return (
    <Canvas shadows camera={{ position: [2, 2, 5] }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        castShadow
        color={spotLightColor}
        position={[10, 20, 20]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <Mecha
        source="/FlamingoMecha/FlamingoMecha.glb"
        castShadow
        receiveShadow
        // scale={[0.1, 0.1, 0.1]} // Adjust scale as needed
        position={[0, -1.5, 0]} // Adjust position as needed
      />

      <Mecha
        source="/FoxMecha/FoxMecha.glb"
        castShadow
        receiveShadow
        // scale={[0.1, 0.1, 0.1]} // Adjust scale as needed
        position={[-2.5, -1.5, -2.5]} // Adjust position as needed
      />

      <Mecha
        source="/BeeMecha/BeeMecha.glb"
        castShadow
        receiveShadow
        // scale={[0.1, 0.1, 0.1]} // Adjust scale as needed
        position={[2.5, -1.5, -2.5]} // Adjust position as needed
      />

      <Scenario />

      <HUD
        setSpotLightColor={setSpotLightColor}
        orbitalControls={orbitalControls}
        setOrbitalControls={setOrbitalControls}
      />

      {orbitalControls && <DreiOrbitControls />}
    </Canvas>
  );
}
