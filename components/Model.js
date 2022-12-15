/* eslint-disable react/no-unknown-property */
import * as THREE from "three";
import { useContext, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Center,
  OrbitControls,
  useAnimations,
  useBounds,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ModelContext } from "../contexts/ModelContext";

import voxelTriangulation from "voxel-triangulation";
import { flatten } from "ramda";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { readVox } from "../utils/vox/readVox";
import zeros from "zeros";

const Model = ({
  model,
  isEnlarged = false,
  onBase64Changed = () => {},
  onErrorOccured = () => {},
  onLoadingStarted = () => {},
  onLoadingEnd = () => {},
}) => {
  const [mdl, set] = useState();
  const [animations, setAnimations] = useState([]);
  const loader = new GLTFLoader();
  const modelRef = useRef(null);
  const actions = useRef();
  let controls = useRef();

  const {
    camera,
    size: { width, height },
    gl,
    scene,
  } = useThree();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useFrame((state, delta) => {
    mixer.update(delta);

    if (animations && animations.length > 0) {
      camera.position.x += 0.01;
      camera.updateProjectionMatrix();
    }
  });

  const viewport = useThree((state) => state.viewport);

  const loadModel = async (model) => {
    try {
      onLoadingStarted();
      try {
        const MAX_VALUE_OF_A_BYTE = 255;

        const voxContent = await fetch(model).then((resp) =>
          resp.arrayBuffer()
        );
        const u8intArrayContent = new Uint8Array(voxContent);

        let vox = readVox(u8intArrayContent);

        let voxelData = vox.XYZI[0].values || vox.xyzi?.values;
        let size = vox.SIZE[0] || vox.size;
        let rgba = vox.RGBA[0].values || vox.rgba?.values;

        let componentizedColores = rgba.map((c) => [c.r, c.g, c.b]);
        let voxels = zeros([size.x, size.y, size.z]);

        voxelData.forEach(({ x, y, z, i }) => voxels.set(x, y, z, i));

        voxels = voxels.transpose(1, 2, 0);

        let { vertices, normals, indices, voxelValues } =
          voxelTriangulation(voxels);

        let normalizedColors = componentizedColores.map((color) =>
          color.map((c) => c / MAX_VALUE_OF_A_BYTE)
        );

        let gammaCorrectedColors = normalizedColors.map((color) =>
          color.map((c) => Math.pow(c, 2.2))
        );

        let alignedColors = [[0, 0, 0], ...gammaCorrectedColors];
        let flattenedColors = flatten(voxelValues.map((v) => alignedColors[v]));

        let geometry = new THREE.BufferGeometry();

        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(new Float32Array(vertices), 3)
        );
        geometry.setAttribute(
          "normal",
          new THREE.BufferAttribute(new Float32Array(normals), 3)
        );
        geometry.setAttribute(
          "color",
          new THREE.BufferAttribute(new Float32Array(flattenedColors), 3)
        );
        geometry.setIndex(
          new THREE.BufferAttribute(new Uint32Array(indices), 1)
        );

        let material = new THREE.MeshStandardMaterial({
          roughness: 1.0,
          metalness: 0.0,
        });
        let mesh = new THREE.Mesh(geometry, material);
        let exporter = new GLTFExporter();
        const json = await exporter.parseAsync(mesh);

        let string = JSON.stringify(json);
        let blob = new Blob([string], { type: "text/plain" });
        model = URL.createObjectURL(blob);
      } catch {}

      let loadedData = await loader.loadAsync(model);
      let threeDScene = loadedData.scene;
      let anims = loadedData.animations;
      threeDScene.traverse(function (obj) {
        obj.frustumCulled = false;
      });
      // bounds.refresh(modelRef.current)
      // bounds.clip()
      // bounds.fit()
      set(threeDScene);
      modelRef.current = threeDScene;
      if (anims && anims.length > 0) {
        setAnimations(anims);
      }
      onLoadingEnd();
    } catch (error) {
      console.log(error);
      onErrorOccured();
      onLoadingEnd();
    }
  };

  useEffect(() => {
    onLoadingEnd();
    loadModel(model);
  }, [model, isEnlarged]);

  useEffect(() => {
    if (mdl && modelRef.current !== null) {
      try {
        onLoadingStarted();
        const aabb = new THREE.Box3().setFromObject(modelRef.current);
        camera.zoom = Math.min(
          width / (aabb.max.x - aabb.min.x),
          height / (aabb.max.y - aabb.min.y)
        );
        const canvas = gl.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.near = 1;
        camera.far = 1000;
        if (isEnlarged) {
          camera.position.y = height - 10;
          camera.position.x = canvas.clientWidth / 2;
        } else {
          camera.position.y = -1;
          camera.position.x = canvas.clientWidth / 2;
        }

        camera.lookAt(0, 0, 0);
        if (camera.zoom > 4000) {
          camera.zoom = height / 2;
        }
        camera.updateProjectionMatrix();
        gl.render(scene, camera, null, false);
        const screenshot = gl.domElement.toDataURL("image/png");
        onBase64Changed(screenshot);
        onLoadingEnd();
      } catch (error) {
        onLoadingEnd();
      }
    }
  }, [mdl, isEnlarged]);

  // if (animations && animations?.length > 0 && mdl && isEnlarged) {
  //   mixer = new THREE.AnimationMixer(mdl)
  //   animations.forEach((clip, index) => {
  //     if (index === 0) {
  //       const action = mixer.clipAction(clip)
  //       void action.play()
  //     }
  //   })
  // }
  useEffect(() => {
    if (animations && animations.length > 0 && isEnlarged) {
      actions.current = {
        idle: mixer.clipAction(animations[0], modelRef.current),
      };

      actions.current.idle.play();
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip));
  }, [animations, mixer, isEnlarged]);

  if (!mdl) return null;
  return (
    <>
      {/* <axesHelper ref={axis} /> */}
      <OrbitControls
        ref={controls}
        args={[camera, gl.domElement]}
        // makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
        target={[0, 0, 0]}
        onEnd={() => {
          if (mdl && modelRef.current) {
            gl.render(scene, camera, null, false);
            const screenshot = gl.domElement.toDataURL("image/png");
            onBase64Changed(screenshot);
          }
        }}
      />
      <Center>
        <group
          ref={modelRef}
          // position={[0, 0, 0]}
          rotation={[0, Math.PI / 3, 0]}
          // rotation={[Math.PI / 2, 0, 0]}
          // getWorldScale
          dispose={null}
        >
          <primitive
            ref={modelRef}
            name="Object_0"
            object={mdl}
            scale={Math.min(
              width / gl.domElement.clientWidth,
              height / gl.domElement.clientHeight
            )}
            makeDefaults
          />
        </group>
      </Center>
    </>
  );
};

export default Model;
