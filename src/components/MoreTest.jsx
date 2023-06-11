import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { KTX2Loader } from "three-stdlib";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {  useGLTF as useGLTFImpl } from "@react-three/drei";

const kTX2Loader = new KTX2Loader();

function useGLTF(url) {
  const gl = useThree((state) => state.gl);
  return useGLTFImpl(url, true, true, (loader) => {
    kTX2Loader.detectSupport(gl);
    kTX2Loader.setTranscoderPath("/basis/");
    loader.setKTX2Loader(kTX2Loader);
  });
}

function MoreTest(props){
  const ref = useRef();
  const gltf = useGLTF('/someting.glb');

  return <primitive {...props} object={gltf.scene} ref={ref} />
}

export default MoreTest;
