import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";

import { HUD } from "./components/HUD";
import { Scenario } from "./components/Scenario";
import { CharacterCarousel } from "./components/CharacterCarousel";

import "./App.css";

const characters = [
  {
    id: 'flamingo',
    name: 'Flamingo Mecha',
    source: '/FlamingoMecha/FlamingoMecha.glb',
    color: '#ff6b9d'
  },
  {
    id: 'fox',
    name: 'Fox Mecha',
    source: '/FoxMecha/FoxMecha.glb',
    color: '#ff8c42'
  },
  {
    id: 'bee',
    name: 'Bee Mecha',
    source: '/BeeMecha/BeeMecha.glb',
    color: '#ffd23f'
  }
];

export default function App() {
  const [spotLightColor, setSpotLightColor] = useState<
    "white" | "yellow" | "blue" | "green"
  >("white");
  const [orbitalControls, setOrbitalControls] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
        <ambientLight intensity={Math.PI / 4} />
        <spotLight
          castShadow
          color={spotLightColor}
          position={[0, 15, 10]}
          angle={0.3}
          penumbra={1}
          decay={0}
          intensity={Math.PI * 2}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        {/* Rim lighting */}
        <directionalLight
          position={[-10, 5, -10]}
          intensity={0.5}
          color="#4a90e2"
        />
        <directionalLight
          position={[10, 5, -10]}
          intensity={0.5}
          color="#e24a90"
        />

        <CharacterCarousel 
          characters={characters}
          selectedIndex={selectedCharacter}
          onSelect={setSelectedCharacter}
        />

        <Scenario />

        {orbitalControls && <DreiOrbitControls />}
      </Canvas>

      <HUD
        characters={characters}
        selectedCharacter={selectedCharacter}
        setSelectedCharacter={setSelectedCharacter}
        setSpotLightColor={setSpotLightColor}
        orbitalControls={orbitalControls}
        setOrbitalControls={setOrbitalControls}
      />
    </>
  );
}