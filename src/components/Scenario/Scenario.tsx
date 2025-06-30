import { FC } from "react";

export const Scenario: FC = () => {
  return (
    <>
      {/* Floor */}
      <mesh receiveShadow position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Ceiling */}
      <mesh receiveShadow position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Back Wall */}
      <mesh receiveShadow position={[0, 5, -10]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Left Wall */}
      <mesh receiveShadow position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Right Wall */}
      <mesh receiveShadow position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  );
};
