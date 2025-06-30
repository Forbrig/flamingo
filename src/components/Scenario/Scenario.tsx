import { FC } from "react";

export const Scenario: FC = () => {
  return (
    <>
      {/* Main floor - larger and more dramatic */}
      <mesh
        receiveShadow
        position={[0, -2.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#16213e" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Ambient environment - subtle walls for depth */}
      <mesh receiveShadow position={[0, 2, -12]} rotation={[0, 0, 0]}>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial 
          color="#16213e" 
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Side accent walls */}
      <mesh receiveShadow position={[-12, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial 
          color="#16213e" 
          transparent
          opacity={0.2}
        />
      </mesh>

      <mesh receiveShadow position={[12, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial 
          color="#16213e" 
          transparent
          opacity={0.2}
        />
      </mesh>

    </>
  );
};