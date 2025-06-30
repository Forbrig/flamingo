import { FC, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { Mecha } from "../Mecha";

interface Character {
  id: string;
  name: string;
  source: string;
  color: string;
}

interface CharacterCarouselProps {
  characters: Character[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const CharacterCarousel: FC<CharacterCarouselProps> = ({
  characters,
  selectedIndex,
  onSelect
}) => {
  const groupRef = useRef<Group>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  useEffect(() => {
    targetRotation.current = -(selectedIndex * (Math.PI * 2)) / characters.length;
  }, [selectedIndex, characters.length]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      const rotationDiff = targetRotation.current - currentRotation.current;
      
      // Handle wrapping around the circle
      let adjustedDiff = rotationDiff;
      if (Math.abs(rotationDiff) > Math.PI) {
        adjustedDiff = rotationDiff > 0 
          ? rotationDiff - Math.PI * 2 
          : rotationDiff + Math.PI * 2;
      }
      
      currentRotation.current += adjustedDiff * delta * 3; // Smooth interpolation speed
      groupRef.current.rotation.y = currentRotation.current;

      // Add subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 1.5;
    }
  });

  const radius = 3;

  return (
    <group ref={groupRef}>
      {characters.map((character, index) => {
        const angle = (index * Math.PI * 2) / characters.length;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const isSelected = index === selectedIndex;
        
        return (
          <group key={character.id} position={[x, 0, z]}>
            <Mecha
              source={character.source}
              castShadow
              receiveShadow
              scale={isSelected ? [1.2, 1.2, 1.2] : [1, 1, 1]}
              rotation={[0, angle, 0]} // Face outward from circle center
              onClick={() => onSelect(index)}
            />
          </group>
        );
      })}
    </group>
  );
};