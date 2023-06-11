import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';

const chili = 'https://res.cloudinary.com/dt4up0c48/image/upload/v1686161034/Green5_wtkz9b.glb';
const carolina = 'https://res.cloudinary.com/dt4up0c48/image/upload/v1686161006/BlackShirt1_iaknmm.glb';



const ModelViewer = ({ url }) => {
  const gltf = useGLTF(url);
  // const texture = useTexture('/texture.png');

  console.log('weew',gltf);

  return <primitive object={gltf.scene} />;
};


const Test = () => {
  const [currentModel, setCurrentModel] = useState(chili);
  const meshRef = useRef();

  const handleClick = () => {
    setCurrentModel((prevModel) => (prevModel === chili ? carolina : chili));
    console.log(currentModel);
  };

  useFrame((state) => {
    const elapsedTime = state.clock.elapsedTime % 10;

  let scale;

  if (elapsedTime <= 1) {
    // Escala creciente de 0 a 1 durante 1 segundo
    scale = elapsedTime  ;
  } else if (elapsedTime <= 4) {
    // Escala constante en 1 durante 3 segundos
    scale = 1;
  } else if (elapsedTime <= 5) {
    // Escala decreciente de 1 a 0 durante 1 segundo
    scale = 5 - elapsedTime;
  } else {
    scale = 0;
  }

  meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh onClick={handleClick} ref={meshRef}>
      <ModelViewer url={currentModel} />
    </mesh>
  );
};

export default Test;
