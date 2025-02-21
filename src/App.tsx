import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import Peer from "peerjs";

import { HUD } from "./components/HUD";
import { Mecha } from "./components/Mecha";
import { Map } from "./components/Map";

import "./App.css";

export default function App() {
  const peerRef = useRef<Peer | null>(null);

  const [spotLightColor, setSpotLightColor] = useState<
    "white" | "yellow" | "blue" | "green"
  >("white");
  const [orbitalControls, setOrbitalControls] = useState(false);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);

  const connectToPeer = () => {
    if (peerRef.current && remotePeerId) {
      console.log("Connecting to remote peer ID: " + remotePeerId);

      const conn = peerRef.current.connect(remotePeerId);
      setConnectedPeers((prevPeers) => [...prevPeers, remotePeerId]);

      conn.on("close", () => {
        setConnectedPeers((prevPeers) =>
          prevPeers.filter((peerId) => peerId !== remotePeerId)
        );
      });
    }
  };

  useEffect(() => {
    // Initialize PeerJS with the local PeerJS server
    const peer = new Peer({
      host: "192.168.0.100",
      port: 9000,
      path: "/",
    });

    peerRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(id);
      console.log("My peer ID is: " + id);
    });

    peer.on("connection", (conn) => {
      setConnectedPeers((prevPeers) => [...prevPeers, conn.peer]);

      conn.on("close", () => {
        setConnectedPeers((prevPeers) =>
          prevPeers.filter((peerId) => peerId !== conn.peer)
        );
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);

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
        setSpotLightColor={setSpotLightColor}
        orbitalControls={orbitalControls}
        setOrbitalControls={setOrbitalControls}
        peerId={peerId}
        remotePeerId={remotePeerId}
        connectedPeers={connectedPeers}
        setRemotePeerId={setRemotePeerId}
        connectToPeer={connectToPeer}
      />

      {orbitalControls && <DreiOrbitControls />}
    </Canvas>
  );
}
