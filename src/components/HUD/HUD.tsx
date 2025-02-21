import { Html } from "@react-three/drei";
import { FC } from "react";

import styles from "./HUD.module.scss";

export const HUD: FC<{
  setSpotLightColor: React.Dispatch<
    React.SetStateAction<"white" | "yellow" | "blue" | "green">
  >;
  orbitalControls: boolean;
  setOrbitalControls: React.Dispatch<React.SetStateAction<boolean>>;
  peerId: string | null;
  remotePeerId: string;
  setRemotePeerId: React.Dispatch<React.SetStateAction<string>>;
  connectedPeers: string[];
  connectToPeer: () => void;
}> = ({
  setSpotLightColor,
  orbitalControls,
  setOrbitalControls,
  peerId,
  remotePeerId,
  setRemotePeerId,
  connectToPeer,
  connectedPeers,
}) => {
  return (
    <Html fullscreen position={[0, 0, 0]}>
      <div className={styles.hud}>
        <h1>threeJS-Fiber-peerJS</h1>
        <p>Hover over the flamingo for dance!</p>
        <p>Change the spot light color here:</p>

        <button onClick={() => setSpotLightColor("white")}>white</button>
        <button onClick={() => setSpotLightColor("yellow")}>yellow</button>
        <button onClick={() => setSpotLightColor("blue")}>blue</button>
        <button onClick={() => setSpotLightColor("green")}>green</button>

        <div>
          <p>My peer ID: {peerId}</p>
          <p>
            Remote peer ID:{" "}
            <input
              type="text"
              value={remotePeerId}
              onChange={(e) => setRemotePeerId(e.target.value)}
            />
            <button onClick={connectToPeer}>Connect</button>
          </p>

          <h3>Connected Peers:</h3>
          <ul>
            {connectedPeers.map((peerId, i) => (
              <li key={i}>{peerId}</li>
            ))}
          </ul>
        </div>

        {/* <p>Orbital Controls:</p>
        <button onClick={() => setOrbitalControls((value) => !value)}>
          {orbitalControls.toString().toUpperCase()}
        </button>
        {orbitalControls && <p>You can move the camera now</p>} */}
      </div>
    </Html>
  );
};
