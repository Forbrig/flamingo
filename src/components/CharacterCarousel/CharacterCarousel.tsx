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
    // Calculate the new target rotation
    const anglePerCharacter = (Math.PI * 2) / characters.length;
    const newTargetRotation = -(selectedIndex * anglePerCharacter);
    
    // Check if we're going from last to first or first to last
    const currentIndex = Math.round(-targetRotation.current / anglePerCharacter) % characters.length;
    const normalizedCurrentIndex = currentIndex < 0 ? currentIndex + characters.length : currentIndex;
    
    if (normalizedCurrentIndex === characters.length - 1 && selectedIndex === 0) {
      // Going from last to first - continue rotating in the same direction
      targetRotation.current -= anglePerCharacter;
    } else if (normalizedCurrentIndex === 0 && selectedIndex === characters.length - 1) {
      // Going from first to last - continue rotating in the same direction
      targetRotation.current += anglePerCharacter;
    } else {
      // Normal rotation
      targetRotation.current = newTargetRotation;
    }
  }, [selectedIndex, characters.length]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      const rotationDiff = targetRotation.current - currentRotation.current;
      currentRotation.current += rotationDiff * delta * 3; // Smooth interpolation speed
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
        
        return (
          <group key={character.id} position={[x, 0, z]}>
            <Mecha
              source={character.source}
              castShadow
              receiveShadow
              scale={[1, 1, 1]}
              rotation={[0, angle, 0]} // Face outward from circle center
              onClick={() => onSelect(index)}
            />
          </group>
        );
      })}
    </group>
  );
};