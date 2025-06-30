import { FC, useRef } from "react";
import { Mecha } from "../Mecha";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

export interface Character {
  id: number;
  name: string;
  source: string;
}

interface CharacterCarouselProps {
  characters: Character[];
  selectedCharacter: number;
}

export const CharacterCarousel: FC<CharacterCarouselProps> = ({
  characters,
  selectedCharacter,
}) => {
  const groupRef = useRef<Group>(null);
  const radius = 2;

  useFrame(() => {
    if (groupRef.current) {
      // Rotate the group based on the selected character index
      // This will make the carousel rotate around the center
      // The rotation is calculated based on the selected character index
      // and the total number of characters
      const angle = (selectedCharacter * Math.PI * 2) / characters.length;
      groupRef.current.rotation.y = angle;
      // groupRef.current.rotation.y += 0.01; // Uncomment for continuous rotation
    }
  });

  return (
    <group ref={groupRef}>
      {characters.map((character, index) => {
        const angle = (index * Math.PI * 2) / characters.length;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <Mecha
            key={character.id}
            source={character.source}
            castShadow
            receiveShadow
            rotation={[0, angle, 0]} // Face outward from circle center
            position={[x, 0, z]} // Adjust position as needed
          />
        );
      })}
    </group>
  );
};
