import { Canvas, useFrame } from "@react-three/fiber";
import "./App.scss";
import { OrbitControls, RandomizedLight, Sky } from "@react-three/drei";
import Balloon from "../src/components/Balloon.jsx";
import * as THREE from 'three';


function App() {
  return (
    <div className="app">
      <Canvas camera={{position:[100,-100,-80], fov:30}}>
        <Sky />
        {/* <Balloon position={[0,2.5, -4]} rotation={[0,Math.PI/2, 0]} /> */}
        <RandomizedLight
        />
        <pointLight position={[5,3,-5]} color={'hsl(126, 26%, 62%)'} />
        <pointLight position={[-2,0,0]} color={'rgb(171, 39, 79)'} />
        <pointLight position={[0,1,5]} color={'rgb(171, 39, 79)'} />
        <pointLight position={[2,5,0]} color={'rgb(171, 39, 79)'} />
        <rectAreaLight position={[10,0,0]} />
        <OrbitControls />
        <Rigg />
      </Canvas>
    </div>
  );
}

export default App;
function Rigg({ vec = new THREE.Vector3() }) {
  useFrame((s) => {
    s.camera.position.lerp(
      vec.set(
        10+Math.sin(s.clock.elapsedTime / 2) * 1.2,
        3 + Math.cos(s.clock.elapsedTime / 2) * 0.5,
        -3
      ),
      0.01
    );

    s.camera.lookAt(0,3, -4);
  });
}