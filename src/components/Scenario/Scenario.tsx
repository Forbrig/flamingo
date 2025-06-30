import { FC } from "react";

export const Scenario: FC = () => {
  return (
    <>
      {/* Main floor - larger and more dramatic */}
      <mesh
        receiveShadow
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial 
          color="#16213e" 
        />
      </mesh>

      {/* Ambient environment - subtle walls for depth */}
      <mesh receiveShadow position={[0, 2, -12]} rotation={[0, 0, 0]}>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial 
          color="#16213e" 
          opacity={0.3}
        />
      </mesh>

      {/* Side accent walls */}
      <mesh receiveShadow position={[-12, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial 
          color="#16213e" 
          opacity={0.2}
        />
      </mesh>

      <mesh receiveShadow position={[12, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[25, 10]} />
        <meshStandardMaterial 
          color="#16213e" 
          opacity={0.2}
        />
      </mesh>

    </>
  );
};