import { Canvas, useFrame } from "@react-three/fiber";
import "./App.scss";
import { Html, OrbitControls, RandomizedLight, Sky, Stage, useProgress } from "@react-three/drei";
import Balloon from "../src/components/Balloon.jsx";
import Test from "../src/components/Test.jsx";
import * as THREE from "three";
import Model from "./components/Shirt";
import MoreTest from "./components/MoreTest";
import { Test2 } from "./components/Test2";
import { Suspense } from "react";

function App() {
  return (
    <div className="app">
      <Canvas camera={{ position: [5, 0, 0], fov: 30 }}>
        <Suspense fallback={<Loader />}>
          <Sky />
          <Stage
            intensity={0.5}
            environment="forest"
            shadows={{
              type: "contact",
              color: "black",
              colorBlend: 2,
              opacity: 1,
              bias: -0.001,
            }}
            adjustCamera={0.81}
          >
            {/* <Balloon position={[0, 2.5, -4]} rotation={[0, Math.PI / 2, 0]} /> */}
            <Test />
            {/* <Model /> */}
            {/* <MoreTest /> */}
            {/* <Test2 /> */}
          </Stage>

          {/* <rectAreaLight position={[10,10,0]} /> */}
          <OrbitControls />
          {/* <pointLight intensity={2 } position={[-10,10,0]}/> */}
        </Suspense>
      </Canvas>
      
    </div>
  );
}

export default App;
function Rigg({ vec = new THREE.Vector3() }) {
  useFrame((s) => {
    s.camera.position.lerp(
      vec.set(
        10 + Math.sin(s.clock.elapsedTime / 2) * 1.2,
        3 + Math.cos(s.clock.elapsedTime / 2) * 0.5,
        -3
      ),
      0.01
    );

    s.camera.lookAt(0, 3, -4);
  });
}
function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  return <Html center><h1>{`${progress},${active},${item},${loaded}`} % loaded</h1></Html>
}