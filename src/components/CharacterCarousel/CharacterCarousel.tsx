import { FC, useEffect, useRef } from "react";
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
  randomAnimations: boolean;
}

export const CharacterCarousel: FC<CharacterCarouselProps> = ({
  characters,
  selectedCharacter,
  randomAnimations,
}) => {
  const radius = 2;
  const groupRef = useRef<Group>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);
  const previousIndex = useRef(0);

  useEffect(() => {
    const anglePerCharacter = (Math.PI * 2) / characters.length;
    const indexDiff = selectedCharacter - previousIndex.current;

    if (
      previousIndex.current === characters.length - 1 &&
      selectedCharacter === 0
    ) {
      targetRotation.current -= anglePerCharacter;
    } else if (
      previousIndex.current === 0 &&
      selectedCharacter === characters.length - 1
    ) {
      targetRotation.current += anglePerCharacter;
    } else {
      targetRotation.current -= indexDiff * anglePerCharacter;
    }

    previousIndex.current = selectedCharacter;
  }, [selectedCharacter, characters.length]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      const rotationDiff = targetRotation.current - currentRotation.current;
      currentRotation.current += rotationDiff * delta * 3;
      groupRef.current.rotation.y = currentRotation.current;
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
            position={[x, 0, z]}
            randomAnimations={randomAnimations}
          />
        );
      })}
    </group>
  );
};
