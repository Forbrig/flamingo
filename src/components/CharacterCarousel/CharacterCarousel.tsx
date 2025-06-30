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
  const previousIndex = useRef(0);

  useEffect(() => {
    const anglePerCharacter = (Math.PI * 2) / characters.length;
    const indexDiff = selectedIndex - previousIndex.current;
    
    // Handle wrapping cases for seamless rotation
    if (previousIndex.current === characters.length - 1 && selectedIndex === 0) {
      // Going forward from last to first
      targetRotation.current -= anglePerCharacter;
    } else if (previousIndex.current === 0 && selectedIndex === characters.length - 1) {
      // Going backward from first to last
      targetRotation.current += anglePerCharacter;
    } else {
      // Normal case - rotate by the index difference
      targetRotation.current -= indexDiff * anglePerCharacter;
    }
    
    previousIndex.current = selectedIndex;
  }, [selectedIndex, characters.length]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      const rotationDiff = targetRotation.current - currentRotation.current;
      currentRotation.current += rotationDiff * delta * 3;
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