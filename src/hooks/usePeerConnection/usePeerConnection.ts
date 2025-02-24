import Peer, { DataConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";

export type SpotLightColor = "white" | "yellow" | "blue" | "green";

export const usePeerConnection = () => {
  const peerRef = useRef<Peer | null>(null);

  const [peerId, setPeerId] = useState<string | null>(null);
  const [connectedPeers, setConnectedPeers] = useState<string[]>([]);
  const [connection, setConnection] = useState<DataConnection | null>(null);

  const [spotLightColor, setSpotLightColor] =
    useState<SpotLightColor>("yellow");

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

  return {
    peerId,
    connectToPeer,
    connectedPeers,
    sendSpotLightColor,
    spotLightColor,
    setSpotLightColor,
  };
};
