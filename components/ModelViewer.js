import { Suspense, useEffect, useMemo, useState } from "react";
import { useLoader, Canvas } from "@react-three/fiber";
import { Bounds, Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = ({ model }) => {
  const [mdl, set] = useState();
  useEffect(() => new GLTFLoader().load(model, set), []);
  if (!mdl) return null;
  return (
    <group position={[0, 0, 0]} dispose={null}>
      <primitive
        object={mdl.scene}
        position={[0, 0, 0]}
        rotation={[0, 1.5, 0]}
      />
    </group>
  );
};

const ModelViewer = ({ model, canvaStyles = {}, headerModelFile }) => {
  return (
    model && (
      <div>
        <Canvas
          frameloop="demand"
          style={{
            width: "18rem",
            height: "18rem",
            ...canvaStyles,
          }}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          <spotLight
            intensity={0.5}
            angle={0.2}
            penumbra={1}
            position={[5, 15, 10]}
          />
          <Suspense fallback={null}>
            {/* Model */}
            <Bounds fit clip observe={false} damping={6} margin={1.2}>
              <Model model={model} />
            </Bounds>

            {/* <Environment preset='warehouse' /> */}
            {/* Settings */}
            <ambientLight intensity={0.3} />
            <pointLight intensity={0.5} position={[10, 20, 30]} />
            <directionalLight color="white" position={[0, 5, -5]} />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
    )
  );
};

export default ModelViewer;
