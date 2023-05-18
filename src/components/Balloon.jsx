
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Balloon(props) {
  const { nodes, materials } = useGLTF("/untitled.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve.geometry}
        material={materials["Material.002"]}
      />
    </group>
  );
}

useGLTF.preload("/untitled.glb");

export default Balloon;