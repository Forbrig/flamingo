import { useState } from "react";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls as DreiOrbitControls } from "@react-three/drei";

import { HUD } from "./components/HUD";
import { Scenario } from "./components/Scenario";
import { Character, CharacterCarousel } from "./components/CharacterCarousel";

import "./App.css";

export type SpotLightColor = "white" | "yellow" | "blue" | "green";

export default function App() {
  const [spotLightColor, setSpotLightColor] = useState<SpotLightColor>("white");
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const [randomAnimations, setRandomAnimations] = useState(false);
  // const [orbitalControls, setOrbitalControls] = useState(false);

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
    <Canvas shadows camera={{ position: [0, 4, 8], fov: 60 }}>
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
        randomAnimations={randomAnimations}
      />

      <Scenario />

      <HUD
        setSpotLightColor={setSpotLightColor}
        spotLightColor={spotLightColor}
        setSelectedCharacter={setSelectedCharacter}
        selectedCharacter={selectedCharacter}
        setRandomAnimations={setRandomAnimations}
        randomAnimations={randomAnimations}
        // orbitalControls={orbitalControls}
        // setOrbitalControls={setOrbitalControls}
      />

      {/* {orbitalControls && <DreiOrbitControls />} */}
    </Canvas>
  );
}
