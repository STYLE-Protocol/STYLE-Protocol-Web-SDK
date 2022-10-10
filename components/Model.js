import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Center, useBounds } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
const Model = ({ model }) => {
  const [mdl, set] = useState();
  const loader = new GLTFLoader();
  const bounds = useBounds();
  const modelRef = useRef();

  const { camera } = useThree();
  const viewport = useThree((state) => state.viewport);

  const loadModel = async (model) => {
    try {
      let loadedData = await loader.loadAsync(model);
      let threeDScene = loadedData.scene;
      threeDScene.traverse(function (obj) {
        obj.frustumCulled = false;
      });
      set(threeDScene);
      bounds.refresh(modelRef.current);
      bounds.clip();
      bounds.fit();
    } catch (error) {}
  };

  useEffect(() => {
    loadModel(model);
  }, []);

  useEffect(() => {
    if (mdl) {
      bounds?.refresh(modelRef.current);
      bounds?.clip();
      bounds?.fit();
    }
  }, [mdl]);

  if (!mdl) return null;

  return (
    <group
      ref={modelRef}
      position={[0, 0, 0]}
      rotation={[0, 1.5, 0]}
      //   getWorldScale
    >
      <primitive object={mdl} />
    </group>
  );
};

export default Model;
