import { Html } from "@react-three/drei";
import { FC } from "react";

import styles from "./HUD.module.scss";

export const HUD: FC<{
  setSpotLightColor: React.Dispatch<
    React.SetStateAction<"white" | "yellow" | "blue" | "green">
  >;
  orbitalControls: boolean;
  setOrbitalControls: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setSpotLightColor, orbitalControls, setOrbitalControls }) => {
  return (
    <Html fullscreen position={[0, 0, 0]}>
      <div className={styles.hud}>
        <h1>bitovi-webxr</h1>
        <p>Hover over the flamingo for dance!</p>
        <p>Change the spot light color here:</p>

        <button onClick={() => setSpotLightColor("white")}>white</button>
        <button onClick={() => setSpotLightColor("yellow")}>yellow</button>
        <button onClick={() => setSpotLightColor("blue")}>blue</button>
        <button onClick={() => setSpotLightColor("green")}>green</button>

        <p>Orbital Controls:</p>
        <button onClick={() => setOrbitalControls((value) => !value)}>
          {orbitalControls.toString().toUpperCase()}
        </button>
      </div>
    </Html>
  );
};
