import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";

import { HUD } from "./components/HUD";
import { Scenario } from "./components/Scenario";
import { Character, CharacterCarousel } from "./components/CharacterCarousel";

import "./App.css";

export default function App() {
  const [spotLightColor, setSpotLightColor] = useState<
    "white" | "yellow" | "blue" | "green"
  >("white");
  const [orbitalControls, setOrbitalControls] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(0);

  const characters: Character[] = [
    {
      id: 1,
      name: "Flamingo Mecha",
      source: "/FlamingoMecha/FlamingoMecha.glb",
    },
    { id: 2, name: "Fox Mecha", source: "/FoxMecha/FoxMecha.glb" },
    { id: 3, name: "Bee Mecha", source: "/BeeMecha/BeeMecha.glb" },
  ];

  return (
    <Canvas shadows camera={{ position: [0, 3, 8] }}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        castShadow
        color={spotLightColor}
        position={[10, 20, 20]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI * 2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <CharacterCarousel
        characters={characters}
        selectedCharacter={selectedCharacter}
      />

      <Scenario />

      <HUD
        setSpotLightColor={setSpotLightColor}
        orbitalControls={orbitalControls}
        setOrbitalControls={setOrbitalControls}
        setSelectedCharacter={setSelectedCharacter}
      />

      {orbitalControls && <DreiOrbitControls />}
    </Canvas>
  );
}
