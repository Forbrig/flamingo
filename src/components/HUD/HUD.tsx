import { Html } from "@react-three/drei";
import { FC } from "react";

import { SpotLightColor } from "../../App";

import styles from "./HUD.module.scss";

export const HUD: FC<{
  setSpotLightColor: React.Dispatch<React.SetStateAction<SpotLightColor>>;
  spotLightColor: SpotLightColor;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<number>>;
  selectedCharacter: number;
  setRandomAnimations: React.Dispatch<React.SetStateAction<boolean>>;
  randomAnimations: boolean;
  // orbitalControls: boolean;
  // setOrbitalControls: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  setSpotLightColor,
  spotLightColor,
  setSelectedCharacter,
  selectedCharacter,
  setRandomAnimations,
  randomAnimations,
  // orbitalControls,
  // setOrbitalControls,
}) => {
  return (
    <Html fullscreen position={[0, 0, 0]}>
      <div className={styles.hud}>
        <h1 className={styles.title}>flamingo</h1>

        <p>Characters:</p>
        <div className={styles.actions}>
          <button
            data-active={selectedCharacter === 0}
            onClick={() => setSelectedCharacter(0)}
          >
            Flamingo Mecha
          </button>
          <button
            data-active={selectedCharacter === 1}
            onClick={() => setSelectedCharacter(1)}
          >
            Fox Mecha
          </button>
          <button
            data-active={selectedCharacter === 2}
            onClick={() => setSelectedCharacter(2)}
          >
            Bee Mecha
          </button>
        </div>

        <p>Spot light color:</p>
        <div className={styles.actions}>
          <button
            data-active={spotLightColor === "white"}
            onClick={() => setSpotLightColor("white")}
          >
            White
          </button>
          <button
            data-active={spotLightColor === "yellow"}
            onClick={() => setSpotLightColor("yellow")}
          >
            Yellow
          </button>
          <button
            data-active={spotLightColor === "blue"}
            onClick={() => setSpotLightColor("blue")}
          >
            Blue
          </button>
          <button
            data-active={spotLightColor === "green"}
            onClick={() => setSpotLightColor("green")}
          >
            Green
          </button>
        </div>

        <p>Random animations:</p>
        <div className={styles.actions}>
          <button
            data-active={randomAnimations}
            onClick={() => setRandomAnimations((value) => !value)}
          >
            {randomAnimations ? "ON" : "OFF"}
          </button>
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
