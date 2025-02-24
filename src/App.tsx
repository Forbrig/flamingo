import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import { SpotLightColor, usePeerConnection } from "./hooks/usePeerConnection";

import { HUD } from "./components/HUD";
import { Mecha } from "./components/Mecha";
import { Map } from "./components/Map";

import "./App.css";

export default function App() {
  const {
    connectToPeer,
    connectedPeers,
    peerId,
    sendSpotLightColor,
    spotLightColor,
    setSpotLightColor,
  } = usePeerConnection();
  const [remotePeerId, setRemotePeerId] = useState<string>("");

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

      <Map />

      <HUD
        setSpotLightColor={(spotLightColor: SpotLightColor) => {
          setSpotLightColor(spotLightColor);
          sendSpotLightColor(spotLightColor);
        }}
        peerId={peerId}
        remotePeerId={remotePeerId}
        connectedPeers={connectedPeers}
        setRemotePeerId={setRemotePeerId}
        connectToPeer={(_remotePeerId: string) => connectToPeer(_remotePeerId)}
      />
    </Canvas>
  );
}
