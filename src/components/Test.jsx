import React, { useState, useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, useGLTF, useTexture } from '@react-three/drei';
import { SphereGeometry } from 'three';

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
   
  });

  return (
    <>
    <mesh onClick={handleClick} ref={meshRef}>
      <ModelViewer url={currentModel} />
    <ScreenshotButton />
    </mesh>
    </>

  );
};

export default Test;

function ScreenshotButton() {
  const { gl, scene, camera } = useThree();

  const handleScreenshot = useCallback(() => {
    gl.setRenderTarget(null);
    gl.render(scene, camera);

    const screenshotDataUrl = gl.domElement.toDataURL();

    const link = document.createElement("a");
    link.href = screenshotDataUrl;
    link.download = "screenshot.png";
    link.click();
  }, [gl, scene, camera]);

  return (
    <Html
      // position={[0.3, -0.2, 0]}
      // occlude='blending'
      scale={0.1}
      transform
      geometry={<SphereGeometry args={[0.66, 1.47, 0.24]} ><meshNormalMaterial/></SphereGeometry>}
    >
      <button className="butt" onClick={handleScreenshot}>
        Descargar screenshot
      </button>
    </Html>
  );
}