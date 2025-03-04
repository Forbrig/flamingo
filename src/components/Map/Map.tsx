import { FC } from "react";

export const Map: FC = () => {
  return (
    <>
      {/* Floor */}
      <mesh
        receiveShadow
        position={[0, -1.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Ceiling */}
      <mesh receiveShadow position={[0, 3.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Back Wall */}
      <mesh receiveShadow position={[0, 1, -5]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Left Wall */}
      <mesh receiveShadow position={[-5, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Right Wall */}
      <mesh receiveShadow position={[5, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  );
};
