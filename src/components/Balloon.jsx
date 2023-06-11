
import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export function Balloon(props) {
  const { nodes, materials } = useGLTF("/untitled.glb");
  const texture = useTexture({map: '/texture.png'});
  console.log('ballon',nodes);
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve.geometry}
        material={materials["Material.002"]}
      >
        <meshStandardMaterial {...texture} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/untitled.glb");

export default Balloon;