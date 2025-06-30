import { Html } from "@react-three/drei";
import { FC, useState } from "react";

import { SpotLightColor } from "../../hooks/usePeerConnection";

import styles from "./HUD.module.scss";

export const HUD: FC<{
  setSpotLightColor: (spotLightColor: SpotLightColor) => void;
  peerId: string | undefined;
  remotePeerId: string;
  setRemotePeerId: React.Dispatch<React.SetStateAction<string>>;
  connectedPeers: string[];
  connectToPeer: (_remotePeerId: string) => void;
}> = ({
  setSpotLightColor,
  peerId,
  remotePeerId,
  setRemotePeerId,
  connectToPeer,
  connectedPeers,
}) => {
  const [isPlayerListOpen, setIsPlayerListOpen] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setShowCopiedMessage(true);
        setTimeout(() => {
          setShowCopiedMessage(false);
        }, 2000);
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <Html fullscreen position={[0, 0, 0]} className={styles.hud}>
      <div className={styles.controls}>
        <h1>Welcome!</h1>
        <p>Hover over the flamingo for dance!</p>
        <p>Change the spot light color here:</p>

        <button onClick={() => setSpotLightColor("white")}>white</button>
        <button onClick={() => setSpotLightColor("yellow")}>yellow</button>
        <button onClick={() => setSpotLightColor("blue")}>blue</button>
        <button onClick={() => setSpotLightColor("green")}>green</button>
      </div>

      <div className={styles["player-list"]}>
        <div className={styles.header}>
          <button onClick={() => setIsPlayerListOpen((value) => !value)}>
            {isPlayerListOpen ? "Hide" : "Show"} Player List
          </button>
          Peers connected: {connectedPeers.length}
        </div>

        {isPlayerListOpen && (
          <div className={styles.content}>
            <p>
              My peer ID:{" "}
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => peerId && copyToClipboard(peerId)}
              >
                {peerId}
              </span>
            </p>

            <p>
              Remote peer ID:{" "}
              <input
                type="text"
                value={remotePeerId}
                onChange={(e) => setRemotePeerId(e.target.value)}
              />
              <button onClick={() => connectToPeer(remotePeerId)}>
                Connect
              </button>
            </p>

            {connectedPeers.length > 0 && (
              <div>
                <p>Connected Peers:</p>
                <ul>
                  {connectedPeers.map((peer) => (
                    <li key={peer}>{peer}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {showCopiedMessage && (
        <div className={styles["copied-message"]}>Copied!</div>
      )}
    </Html>
  );
};
