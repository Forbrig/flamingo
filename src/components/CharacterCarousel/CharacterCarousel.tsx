import { FC } from "react";
import { Mecha } from "../Mecha";

export interface Character {
  id: number;
  name: string;
  source: string;
}

interface CharacterCarouselProps {
  characters: Character[];
}

export const CharacterCarousel: FC<CharacterCarouselProps> = ({
  characters,
}) => {
  const radius = 2;

  return (
    <>
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
    </>
  );
};
