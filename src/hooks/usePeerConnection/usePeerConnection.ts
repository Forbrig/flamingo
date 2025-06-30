import Peer, { DataConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";

export type SpotLightColor = "white" | "yellow" | "blue" | "green";

export const usePeerConnection = () => {
  const peerRef = useRef<Peer | null>(null);
  const peerConnectionsRef = useRef<Map<string, DataConnection>>(new Map());
  const [peerId, setPeerId] = useState<string | undefined>(undefined);
  const [connectedPeerIds, setConnectedPeerIds] = useState<string[]>([]);

  const [spotLightColor, setSpotLightColor] =
    useState<SpotLightColor>("yellow");

  // Update connected peers state whenever connections change
  const updateConnectedPeers = () => {
    setConnectedPeerIds(Array.from(peerConnectionsRef.current?.keys() || []));
  };

  useEffect(() => {
    // Initialize PeerJS with the local PeerJS server
    const peer = new Peer({
      host: "localhost", // Replace with your local machine's IP address that is running the server
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

  // someone connects to us
  const handleConnection = (conn: DataConnection) => {
    if (peerConnectionsRef.current?.has(conn.peer)) return;

    conn.on("open", () => {
      peerConnectionsRef.current?.set(conn.peer, conn);
      updateConnectedPeers(); // Update state when connection opens

      // Send only the current peer list instead of broadcasting
      conn.send({
        type: "peersList",
        payload: Array.from(peerConnectionsRef.current?.keys()),
      });
    });

    conn.on("data", (data) => {
      const receivedData = data as { type: string; payload: any };

      if (receivedData.type === "peersList") {
        for (const receivedPeerId of receivedData.payload) {
          if (
            receivedPeerId !== peerRef.current?.id &&
            !peerConnectionsRef.current?.has(receivedPeerId)
          ) {
            connectToPeer(receivedPeerId);
          }
        }
      }

      if (receivedData.type === "spotLightColor") {
        setSpotLightColor(receivedData.payload);
      }
    });

    conn.on("close", () => {
      peerConnectionsRef.current?.delete(conn.peer);
      updateConnectedPeers(); // Update state when connection closes
    });
  };

  // we connect to someone
  const connectToPeer = (remotePeerId: string) => {
    if (!peerRef.current) return;
    if (peerConnectionsRef.current?.has(remotePeerId)) return; // Prevent duplicate connections

    const conn = peerRef.current.connect(remotePeerId);

    conn.on("open", () => {
      peerConnectionsRef.current?.set(conn.peer, conn);
      updateConnectedPeers(); // Update state when connection opens
    });

    conn.on("data", (data) => {
      const receivedData = data as { type: string; payload: any };

      if (receivedData.type === "peersList") {
        for (const receivedPeerId of receivedData.payload) {
          if (
            receivedPeerId !== peerRef.current?.id &&
            receivedPeerId !== remotePeerId && // Ensure we don't double-connect
            !peerConnectionsRef.current?.has(receivedPeerId)
          ) {
            connectToPeer(receivedPeerId);
          }
        }
      }

      if (receivedData.type === "spotLightColor") {
        setSpotLightColor(receivedData.payload);
      }
    });

    conn.on("close", () => {
      peerConnectionsRef.current?.delete(remotePeerId);
      updateConnectedPeers(); // Update state when connection closes
    });
  };

  const sendSpotLightColor = (spotLightColor: SpotLightColor) => {
    if (peerConnectionsRef.current?.size > 0) {
      peerConnectionsRef.current?.forEach((connection) => {
        connection.send({ type: "spotLightColor", payload: spotLightColor });
      });
    } else {
      console.log("Connection is not open. Cannot send spotLightColor.");
    }
  };

  return {
    peerId,
    connectToPeer,
    connectedPeerIds,
    sendSpotLightColor,
    spotLightColor,
    setSpotLightColor,
  };
};
