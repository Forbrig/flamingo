import { Html } from "@react-three/drei";
import { FC } from "react";

import styles from "./HUD.module.scss";

interface Character {
  id: string;
  name: string;
  source: string;
  color: string;
}

export const HUD: FC<{
  characters: Character[];
  selectedCharacter: number;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<number>>;
  setSpotLightColor: React.Dispatch<
    React.SetStateAction<"white" | "yellow" | "blue" | "green">
  >;
  orbitalControls: boolean;
  setOrbitalControls: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ 
  characters, 
  selectedCharacter, 
  setSelectedCharacter, 
  setSpotLightColor, 
  orbitalControls, 
  setOrbitalControls 
}) => {
  const handlePrevious = () => {
    setSelectedCharacter((prev) => 
      prev === 0 ? characters.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedCharacter((prev) => 
      prev === characters.length - 1 ? 0 : prev + 1
    );
  };

  const currentCharacter = characters[selectedCharacter];

  return (
    <Html fullscreen>
      <div className={styles.hud}>
        <div className={styles.header}>
          <h1>Character Selection</h1>
          <h2 
            className={styles.characterName}
            style={{ color: currentCharacter.color }}
          >
            {currentCharacter.name}
          </h2>
          <p className={styles.instruction}>
            Click characters or use controls below
          </p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.navigation}>
            <button 
              className={styles.navButton}
              onClick={handlePrevious}
            >
              ← Previous
            </button>
            
            <div className={styles.indicators}>
              {characters.map((character, index) => (
                <button
                  key={character.id}
                  className={`${styles.indicator} ${
                    index === selectedCharacter ? styles.active : ''
                  }`}
                  style={{
                    backgroundColor: index === selectedCharacter 
                      ? character.color 
                      : 'rgba(255, 255, 255, 0.2)'
                  }}
                  onClick={() => setSelectedCharacter(index)}
                  title={character.name}
                />
              ))}
            </div>
            
            <button 
              className={styles.navButton}
              onClick={handleNext}
            >
              Next →
            </button>
          </div>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <p className={styles.label}>Lighting</p>
              <div className={styles.buttonGroup}>
                <button onClick={() => setSpotLightColor("white")}>White</button>
                <button onClick={() => setSpotLightColor("yellow")}>Yellow</button>
                <button onClick={() => setSpotLightColor("blue")}>Blue</button>
                <button onClick={() => setSpotLightColor("green")}>Green</button>
              </div>
            </div>

            <div className={styles.controlGroup}>
              <p className={styles.label}>Camera</p>
              <button 
                className={`${styles.toggleButton} ${orbitalControls ? styles.active : ''}`}
                onClick={() => setOrbitalControls((value) => !value)}
              >
                {orbitalControls ? 'Disable' : 'Enable'} Orbit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};