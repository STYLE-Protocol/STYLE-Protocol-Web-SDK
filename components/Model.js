/* eslint-disable react/no-unknown-property */
import { Center, OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { flatten } from "ramda";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import voxelTriangulation from "voxel-triangulation";
import zeros from "zeros";
import { readVox } from "../utils/vox/readVox";

const Model = ({
  model,
  isEnlarged = false,
  onBase64Changed = () => {},
  onErrorOccured = () => {},
  onLoadingStarted = () => {},
  onLoadingEnd = () => {},
  metaverseId = 0,
}) => {
  const [mdl, set] = useState();
  const [animations, setAnimations] = useState([]);
  const loaderGLTF = new GLTFLoader();
  const fbxLoader = new FBXLoader();

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/");
  loaderGLTF.setDRACOLoader(dracoLoader);

  const modelRef = useRef(null);
  const actions = useRef();
  let controls = useRef();

  const {
    camera,
    size: { width, height },
    gl,
    scene,
    viewport,
  } = useThree();
  const [mixer] = useState(() => new THREE.AnimationMixer());
  useFrame((state, delta) => {
    mixer.update(delta);

    if (animations && animations.length > 0) {
      camera.position.x += 0.01;
      camera.updateProjectionMatrix();
    }
  });

  const loadModel = async (model) => {
    try {
      onLoadingStarted();
      let loadedData;
      let threeDScene;
      let anims;

      let rotation = -Math.PI;
      if (metaverseId === 2) {
        const MAX_VALUE_OF_A_BYTE = 255;

        let voxContent = await fetch(model);
        voxContent = await voxContent.arrayBuffer();
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

        rotation += Math.PI / 2;
      }

      if (metaverseId === 4) {
        loadedData = await fbxLoader.loadAsync(model);
        loadedData.scale.set(0.01, 0.01, 0.01);
        threeDScene = new THREE.Scene();
        threeDScene.add(loadedData);
      } else {
        loadedData = await loaderGLTF.loadAsync(model);
        threeDScene = loadedData.scene;
        threeDScene.rotation.y = rotation;
      }

      threeDScene.traverse(function (obj) {
        obj.frustumCulled = false;
      });

      anims = loadedData.animations;

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
        const aabb = new THREE.Box3().setFromObject(modelRef.current, true);
        const size = aabb.getSize(new THREE.Vector3());
        const center = aabb.getCenter(new THREE.Vector3(0, 0, 0));
        const zoomFactor = Math.min(width / size.x, height / size.y);
        camera.zoom = zoomFactor;
        const canvas = gl.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // camera.position.x -= zoomFactor * center.x;
        // camera.position.y -= zoomFactor * center.y;
        // camera.position.z -= zoomFactor * center.z;
        // camera.fov = 35;
        camera.near = 0.1;
        camera.far = 2000;
        camera.lookAt(center);
        if (metaverseId === 0) {
          camera.zoom = Math.min((zoomFactor / 3) * size.length());
          if (isEnlarged) {
            camera.zoom = Math.min((zoomFactor / 3) * size.length() - 50);
          }
          modelRef.current.position.set(center.x, center.y - 0.9, center.z);
        }
        camera.updateProjectionMatrix();
        gl.render(scene, camera, null, false);
        // const screenshot = gl.domElement.toDataURL("image/png");
        // onBase64Changed(screenshot);
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
            // const screenshot = gl.domElement.toDataURL("image/png");
            // onBase64Changed(screenshot);
          }
        }}
      />

      <Center
        position={[0, metaverseId === 0 ? (isEnlarged ? 0 : -0.9) : 0, 0]}
      >
        <group
          ref={modelRef}
          position={[0, 0, 0]}
          rotation={[0, metaverseId === 0 ? Math.PI / 1 : 0, 0]}
          // rotation={[0, Math.PI / 3, 0]}
          // rotation={[Math.PI / 2, 0, 0]}
          // getWorldScale
          dispose={null}
        >
          <primitive
            ref={modelRef}
            position={[0, 0, 0]}
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
