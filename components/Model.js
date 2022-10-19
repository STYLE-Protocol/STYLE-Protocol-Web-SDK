/* eslint-disable react/no-unknown-property */
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  Center,
  OrbitControls,
  useAnimations,
  useBounds,
} from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Model = ({ model, isEnlarged = false, onBase64Changed = () => {} }) => {
  const [mdl, set] = useState()
  const [animations, setAnimations] = useState([])
  const loader = new GLTFLoader()
  const modelRef = useRef(null)
  const actions = useRef()
  let controls = useRef()

  const {
    camera,
    size: { width, height },
    gl,
    scene,
  } = useThree()
  const [mixer] = useState(() => new THREE.AnimationMixer())
  useFrame((state, delta) => {
    mixer.update(delta)

    if (animations && animations.length > 0) {
      camera.position.x += 0.01
      camera.updateProjectionMatrix()
    }
  })

  const viewport = useThree((state) => state.viewport)

  const loadModel = async (model) => {
    try {
      let loadedData = await loader.loadAsync(model)
      let threeDScene = loadedData.scene
      let anims = loadedData.animations
      threeDScene.traverse(function (obj) {
        obj.frustumCulled = false
      })
      // bounds.refresh(modelRef.current)
      // bounds.clip()
      // bounds.fit()
      set(threeDScene)
      if (anims && anims.length > 0) {
        setAnimations(anims)
      }
    } catch (error) {}
  }

  useEffect(() => {
    loadModel(model)
  }, [model, isEnlarged])

  useEffect(() => {
    if (mdl && modelRef.current !== null) {
      const aabb = new THREE.Box3().setFromObject(modelRef.current)
      camera.zoom = Math.min(
        width / (aabb.max.x - aabb.min.x),
        height / (aabb.max.y - aabb.min.y)
      )
      const canvas = gl.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.near = 1
      camera.far = 1000
      if (isEnlarged) {
        camera.position.y = height - 10
        camera.position.x = canvas.clientWidth / 2
      } else {
        camera.position.y = -1
        camera.position.x = canvas.clientWidth / 2
      }

      camera.lookAt(0, 0, 0)
      if (camera.zoom > 4000) {
        camera.zoom = height / 2
      }
      camera.updateProjectionMatrix()
    }
  }, [mdl])

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
      }

      actions.current.idle.play()
    }

    return () => animations.forEach((clip) => mixer.uncacheClip(clip))
  }, [animations, mixer, isEnlarged])

  if (!mdl) return null

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
            gl.render(scene, camera, null, false)
            const screenshot = gl.domElement.toDataURL('image/png')
            onBase64Changed(screenshot)
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
          {console.log({
            zoom: camera.zoom,
            height,
            width,
            far: camera.far,
            aspects: camera.aspect,
          })}
          <primitive
            ref={modelRef}
            name='Object_0'
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
  )
}

export default Model