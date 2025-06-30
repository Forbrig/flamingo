import { Html } from "@react-three/drei";
import { FC } from "react";

import styles from "./HUD.module.scss";

export const HUD: FC<{
  setSpotLightColor: React.Dispatch<
    React.SetStateAction<"white" | "yellow" | "blue" | "green">
  >;
  orbitalControls: boolean;
  setOrbitalControls: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  setSpotLightColor,
  orbitalControls,
  setOrbitalControls,
  setSelectedCharacter,
}) => {
  return (
    <Html fullscreen position={[0, 0, 0]}>
      <div className={styles.hud}>
        <div className={styles.title}>
          <h1>flamingo-webxr</h1>
        </div>

        <p>Spot light color:</p>
        <button onClick={() => setSpotLightColor("white")}>white</button>
        <button onClick={() => setSpotLightColor("yellow")}>yellow</button>
        <button onClick={() => setSpotLightColor("blue")}>blue</button>
        <button onClick={() => setSpotLightColor("green")}>green</button>

        <p>Characters:</p>
        <button onClick={() => setSelectedCharacter(0)}>Flamingo Mecha</button>
        <button onClick={() => setSelectedCharacter(1)}>Bee Mecha</button>
        <button onClick={() => setSelectedCharacter(2)}>Fox Mecha</button>

        <p>Orbital Controls:</p>
        <button onClick={() => setOrbitalControls((value) => !value)}>
          {orbitalControls.toString().toUpperCase()}
        </button>
        {orbitalControls && <p>You can move the camera now</p>}
      </div>
    </Html>
  );
};
