/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  BBAnchor,
  Bounds,
  MapControls,
  OrbitControls,
  Stage,
  useBounds,
} from "@react-three/drei";
import dynamic from "next/dynamic";
import { Center, Spinner } from "@chakra-ui/react";

const deg2rad = (degrees) => degrees * (Math.PI / 180);

const ModelComponent = dynamic(() => import("./Model"), {
  suspense: true,
});

const Controls = () => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    controlsRef.current.addEventListener("change", function () {
      if (this.target.y < -10) {
        this.target.y = -10;
        camera.position.y = -10;
      } else if (this.target.y > 10) {
        this.target.y = 10;
        camera.position.y = 10;
      }
    });
  }, []);

  return (
    <MapControls ref={controlsRef} enableZoom={false} enableRotate={false} />
  );
};
const Scene = ({ model }) => {
  useThree(({ camera }) => {
    camera.rotation.set(deg2rad(30), 0, 0);
  });
  return (
    <>
      <spotLight
        intensity={0.5}
        angle={0.2}
        penumbra={1}
        position={[10, 10, 10]}
      />

      <BBAnchor anchor={[1, 1, 1]} frustumCulled={false}>
        <Bounds observe fit clip clone margin={1.4} damping={0}>
          <ModelComponent model={model} />
        </Bounds>
        <Controls />
      </BBAnchor>

      <ambientLight intensity={0.3} />
      <pointLight intensity={0.5} position={[10, 10, 10]} />
      <directionalLight color="white" position={[0, 5, -5]} />
      <OrbitControls makeDefault />
    </>
  );
};

const ModelViewer = ({
  model,
  canvaStyles = {},
  headerModelFile,
  isEnlarge,
}) => {
  if (!model) return null;
  return (
    model && (
      <div
        style={{
          width: isEnlarge ? "50rem" : "18rem",
          height: isEnlarge ? "40rem" : "18rem",
          ...canvaStyles,
        }}
      >
        <Suspense fallback={null}>
          <Canvas orthographic>
            <Scene model={model} />
          </Canvas>
        </Suspense>
      </div>
    )
  );
};

export default ModelViewer;
