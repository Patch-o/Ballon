import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import {
  Html,
  OrbitControls,
  Sky,
  Stage,
  useProgress,
  useGLTF,
  Environment,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import Test from "../src/components/Test.jsx";
import { Suspense, useCallback, useLayoutEffect, useRef } from "react";
import "./App.scss";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";
import { FogExp2 } from "three";
import Swarm from "./components/Double.jsx";
import Shoes from "./components/Double.jsx";
import Apps from "./components/Double.jsx";

const numberOfNodes = 10000;

const data = Array.from({ length: numberOfNodes }, () => ({
  scale: 1,
  // position: [1000 * Math.random() - 25, 50 * Math.random(), 50 * Math.random() - 25],
  position: [50 * Math.random(), 50 * Math.random(), 3000 * Math.random()],
  rotation: [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI,
  ],
  // rotation : [0,0,0]
}));
const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

function App() {
  return (
    <div className="app">
      <Canvas className="canvas" camera={{ fov: 30 }}>
        <color attach="background" args={["green"]} />
        <ambientLight />
        <Suspense fallback={null}>
          {/* <Sky /> */}
          {/* <fog args={['green',120,1020]}  /> */}
          {/* <Swarm count={20000}/> */}
          {/* <Test /> */}
          {/* <Apps /> */}
          <OrbitControls />
          <CameraAnimation />
          <EffectComposer disableNormalPass multisampling={8}>
            <Bloom
              mipmapBlur
              intensity={0.31}
              luminanceThreshold={0.25} // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing={0.0025}
            />
          </EffectComposer>
          <Environment files={"./littleParis.hdr"} />
          <Scene />
          {/* <Perf /> */}
          <Nodes nodeData={data} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <h1>{`${progress},${active},${item},${loaded}`} % loaded</h1>;
}
function Scene() {
  const { scene } = useThree();

  // Agregar niebla a la escena
  const fogColor = "white";
  const fogDensity = 0.009;
  scene.fog = new FogExp2(fogColor, fogDensity);

  return null;
}

function Nodes({ nodeData }) {
  const { nodes, materials } = useGLTF("/DoubleLogo.glb", true);
  const geo = nodes.BezierCurve001.geometry.clone();
  const mat = nodes.BezierCurve001.material.clone();

  geo.computeVertexNormals();
  geo.scale(0.189, 0.189, 0.189);

  const ref = useRef();
  
  useLayoutEffect(() => {
    const transform = new THREE.Matrix4();
    for (let i = 0; i < numberOfNodes; ++i) {
      const [rotationX, rotationY, rotationZ] = nodeData[i].rotation;
      
      // const [rotationX, rotationY] = nodeData[i].rotation;
      // const rotationZ = (i * Math.PI / 15); // Rotación en incrementos de 15 grados en el eje Z
      
      transform.makeRotationFromEuler(
        new THREE.Euler(rotationX, rotationY, rotationZ)
        );
        transform.setPosition(...nodeData[i].position);
      // transform.makeRotationX(...nodeData[i].position);// efecto wapo
      ref.current.setMatrixAt(i, transform);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [nodeData]);
  

  
  return (
    <instancedMesh ref={ref} args={[geo, null, numberOfNodes]}>
      {/* <meshPhysicalMaterial
        // roughness={1}
        // ior={1.4}
        transmission={1}
        color={"#85754E"}
        iridescence={1}
      /> */}
        <MeshTransmissionMaterial color={'red'} transmission={1} iridescence={1} />
      {/* <meshStandardMaterial emissive={[254, 255, 251]} emissiveIntensity={0.02} toneMapped={false} roughness={0} metalness={1} /> */}
    </instancedMesh>
  );
}

function CameraAnimation() {
  const { camera } = useThree();
  const s = 0.15;

  useFrame((state) => {
    let t = state.clock.getElapsedTime();
    camera.position.z += s;
    camera.position.x = 25 - Math.sin(t) * 2;
    camera.position.y = 20;
    //  Math.cos(t) *2;
    // camera.position.y =5;
    camera.lookAt(20 * Math.cos(t), 20 * Math.sin(t), 3000 + 10 * Math.sin(t));
    if (camera.position.z >= 3000) {
      camera.position.z = 0;
    }
  });

  return null;
}
