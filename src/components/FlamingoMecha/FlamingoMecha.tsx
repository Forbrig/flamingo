import { ThreeElements, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three-stdlib";
import { useEffect, useRef, useState } from "react";
import {
  AnimationAction,
  AnimationMixer,
  AudioListener,
  AudioLoader,
  PositionalAudio,
} from "three";

export const FlamingoMecha = (props: ThreeElements["mesh"]) => {
  const gltf = useLoader(
    GLTFLoader,
    `${process.env.PUBLIC_URL}/FlamingoMecha/FlamingoMecha.glb`
  );
  const mixerRef = useRef<AnimationMixer>();
  const soundRef = useRef<PositionalAudio | null>(null);
  const [currentAction, setCurrentAction] = useState<AnimationAction | null>(
    null
  );

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
  });

  useEffect(() => {
    if (gltf.animations.length) {
      mixerRef.current = new AnimationMixer(gltf.scene);
      const action = mixerRef.current.clipAction(gltf.animations[5]);
      action.play();
      setCurrentAction(action);
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
        gltf.scene.add(sound);
      }
    );

    // Traverse the scene and enable shadows for all meshes
    gltf.scene.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [gltf]);

  const handlePointerOver = () => {
    if (mixerRef.current && gltf.animations.length > 1) {
      currentAction?.stop();
      const hoverAction = mixerRef.current.clipAction(gltf.animations[0]);
      hoverAction.play();
      setCurrentAction(hoverAction);
    }

    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  const handlePointerOut = () => {
    if (mixerRef.current && gltf.animations.length > 1) {
      currentAction?.stop();
      const defaultAction = mixerRef.current.clipAction(gltf.animations[5]);
      defaultAction.play();
      setCurrentAction(defaultAction);
    }

    if (soundRef.current) {
      soundRef.current.stop();
    }
  };

  return (
    <>
      <primitive
        {...props}
        object={gltf.scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </>
  );
};
