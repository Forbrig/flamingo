import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import Peer, { DataConnection } from "peerjs";

import { HUD } from "./components/HUD";
import { Mecha } from "./components/Mecha";
import { Map } from "./components/Map";

import "./App.css";

export type SpotLightColor = "white" | "yellow" | "blue" | "green";

export default function App() {
  const peerRef = useRef<Peer | null>(null);

  const [spotLightColor, setSpotLightColor] =
    useState<SpotLightColor>("yellow");
  const [orbitalControls, setOrbitalControls] = useState(false);
  const [peerId, setPeerId] = useState<string | null>(null);
  const [remotePeerId, setRemotePeerId] = useState<string>("");
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);
  const [connection, setConnection] = useState<DataConnection | null>(null);

  useEffect(() => {
    // Initialize PeerJS with the local PeerJS server
    const peer = new Peer({
      host: "192.168.0.100", // Replace with your local machine's IP address that is running the server
      port: 9000, // Replace with the port that the server is running on
      path: "/",
      // debug: 3,
      secure: false,
    });

    peerRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("connection", (conn) => {
      handleConnection(conn);
    });

    return () => {
      peer.destroy();
    };
  }, []);

  const handleConnection = (conn: DataConnection) => {
    setConnection(conn);
    setConnectedPeers((prevPeers) => [...prevPeers, conn.peer]);

    conn.on("open", () => {
      console.log("Connection opened with peer: " + conn.peer);
    });

    conn.on("data", (data) => {
      const receivedData = data as { type: string; payload: any };

      if (receivedData.type === "spotLightColor") {
        setSpotLightColor(receivedData.payload);
      }
    });

    conn.on("close", () => {
      setConnectedPeers((prevPeers) =>
        prevPeers.filter((peerId) => peerId !== conn.peer)
      );
    });
  };

  const connectToPeer = (remotePeerId: string) => {
    if (peerRef.current) {
      const conn = peerRef.current.connect(remotePeerId);

      conn.on("open", () => {
        setConnection(conn);
        setConnectedPeers((prevPeers) => [...prevPeers, remotePeerId]);
      });

      conn.on("data", (data) => {
        const receivedData = data as { type: string; payload: any };

        if (receivedData.type === "spotLightColor") {
          setSpotLightColor(receivedData.payload);
        }
      });

      conn.on("close", () => {
        setConnectedPeers((prevPeers) =>
          prevPeers.filter((peerId) => peerId !== remotePeerId)
        );
      });
    }
  };

  const sendSpotLightColor = (spotLightColor: SpotLightColor) => {
    if (connection && connection.open) {
      console.log("Sending spotLightColor: ", spotLightColor);
      connection.send({ type: "spotLightColor", payload: spotLightColor });
    } else {
      console.log("Connection is not open. Cannot send spotLightColor.");
    }
  };

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
        orbitalControls={orbitalControls}
        setOrbitalControls={setOrbitalControls}
        peerId={peerId}
        remotePeerId={remotePeerId}
        connectedPeers={connectedPeers}
        setRemotePeerId={setRemotePeerId}
        connectToPeer={(_remotePeerId: string) => connectToPeer(_remotePeerId)}
      />

      {orbitalControls && <DreiOrbitControls />}
    </Canvas>
  );
}
