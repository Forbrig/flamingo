import { ThreeElements, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { useEffect, useRef } from "react";
import { AudioListener, AudioLoader, PositionalAudio } from "three";
import { useAnimations } from "@react-three/drei";

export const FlamingoMecha = (props: ThreeElements["mesh"]) => {
  const { scene, animations } = useLoader(
    GLTFLoader,
    `${process.env.PUBLIC_URL}/FlamingoMecha/FlamingoMecha.glb`
  );
  const { actions } = useAnimations(animations, scene);

  const soundRef = useRef<PositionalAudio | null>(null);

  useEffect(() => {
    if (actions["RobotArmature|Idle"]) actions["RobotArmature|Idle"].play();

    const listener = new AudioListener();
    const sound = new PositionalAudio(listener);
    const audioLoader = new AudioLoader();
    audioLoader.load(
      `${process.env.PUBLIC_URL}/FlamingoMecha/epicsaxguy.mp3`,
      (buffer) => {
        sound.setBuffer(buffer);
        sound.setRefDistance(20);
        soundRef.current = sound;
        scene.add(sound);
      }
    );

    // Traverse the scene and enable shadows for all meshes
    scene.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [scene, animations]);

  const handlePointerOver = () => {
    if (actions["RobotArmature|Idle"]) actions["RobotArmature|Idle"].stop();

    if (actions["RobotArmature|Dance"]) actions["RobotArmature|Dance"].play();

    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const handlePointerOut = () => {
    if (actions["RobotArmature|Dance"]) actions["RobotArmature|Dance"].stop();
    if (actions["RobotArmature|Idle"]) actions["RobotArmature|Idle"].play();

    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  return (
    <>
      <primitive
        {...props}
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </>
  );
};
