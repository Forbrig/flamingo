import { ThreeElements, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { FC, useEffect, useRef } from "react";
import { AudioListener, AudioLoader, PositionalAudio } from "three";
import { useAnimations } from "@react-three/drei";

type MechaProps = ThreeElements["mesh"] & {
  source: string;
  randomAnimations: boolean;
};

export const Mecha: FC<MechaProps> = ({
  source,
  randomAnimations,
  ...props
}) => {
  const { scene, animations } = useLoader(
    GLTFLoader,
    `${process.env.PUBLIC_URL}${source}`
  );
  const { actions, mixer } = useAnimations(animations, scene);

  const soundRef = useRef<PositionalAudio | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // do a random animation from the animations array from time to time
    if (randomAnimations && animations.length > 0) {
      interval = setInterval(() => {
        // stop all actions
        mixer.stopAllAction();
        const randomAnimation =
          animations[Math.floor(Math.random() * animations.length)];
        if (randomAnimation && actions[randomAnimation.name]) {
          actions[randomAnimation.name]?.play();
        }
      }, 2000);
    } else {
      interval && clearInterval(interval);
      mixer.stopAllAction();
      if (actions["RobotArmature|Idle"]) actions["RobotArmature|Idle"].play();
    }

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

    return () => {
      interval && clearInterval(interval);
      mixer.stopAllAction();
      if (soundRef.current) {
        soundRef.current.stop();
        scene.remove(soundRef.current);
      }
    };
  }, [scene, animations, actions, mixer, randomAnimations]);

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
