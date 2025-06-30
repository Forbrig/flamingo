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
              rotation={[0, Math.PI, 0]} // Always face forward (toward camera)
              onClick={() => onSelect(index)}
            />
            
            {/* Selection indicator */}
            {isSelected && (
              <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.2, 1.5, 32]} />
                <meshBasicMaterial 
                  color={character.color} 
                  transparent 
                  opacity={0.6}
                />
              </mesh>
            )}
            
            {/* Character platform */}
            <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[1, 1, 0.1, 16]} />
              <meshStandardMaterial 
                color={isSelected ? character.color : "#333333"}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Center platform */}
      <mesh position={[0, -2.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[4.5, 4.5, 0.2, 32]} />
        <meshStandardMaterial 
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};