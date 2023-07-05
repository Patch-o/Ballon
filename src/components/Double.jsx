// import React, { Suspense, useRef, useState, useLayoutEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrthographicCamera, OrbitControls, useGLTF } from "@react-three/drei";
// import * as THREE from "three";

// const numberOfNodes = 1000;
// const data = Array.from({ length: numberOfNodes }, () => ({
//   scale: 1,
//   position: [50 * Math.random() - 25, 0, 50 * Math.random() - 25]
// }));
// const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

// function Nodes({ nodeData }) {
//   const { nodes, materials } = useGLTF("/DoubleLogo.glb", true);
//   const geo = nodes.BezierCurve001.geometry.clone();

//   geo.computeVertexNormals();
//   geo.scale(0.589, 0.589, 0.589);

//   const ref = useRef();

//   useLayoutEffect(() => {
//     const transform = new THREE.Matrix4();
//     for (let i = 0; i < numberOfNodes; ++i) {
//       transform.setPosition(...nodeData[i].position);
//       ref.current.setMatrixAt(i, transform);
//     }
//     ref.current.instanceMatrix.needsUpdate = true;
//   }, [nodeData]);

//   return (
//     <instancedMesh ref={ref} args={[geo, null, numberOfNodes]}>
//       <meshStandardMaterial emissive={[254, 255, 251]} emissiveIntensity={0.02} toneMapped={false} roughness={0} metalness={1} />
//     </instancedMesh>
//   );
// }

// function Apps() {
//   return (
//     <div className="app">
//       <Canvas>
//         <ambientLight />
//         <directionalLight position={[0, 10, 0]} intensity={1} />
//         <OrthographicCamera makeDefault position={[0, 50, 0]} rotation={[-Math.PI / 2, 0, -Math.PI / 2]} zoom={5} />
//         <Suspense fallback={null}>
//           <Nodes nodeData={data} />
//         </Suspense>
//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// }

// export default ;
