/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { Text, VStack } from "@chakra-ui/react";
import { BBAnchor, Html, MapControls, useProgress } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import dynamic from "next/dynamic";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { ModelProvider } from "../../contexts/ModelContext";

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
const Scene = ({
  model,
  isEnlarged = false,
  onBase64Changed = () => {},
  onErrorOccured = () => {},
  metaverseId = 1,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { progress } = useProgress();
  // useThree(({ camera }) => {
  //   camera.rotation.set(deg2rad(30), 0, 0);
  // });
  return (
    <>
      <spotLight
        intensity={0.5}
        angle={0.2}
        penumbra={1}
        position={[10, 10, 10]}
      />

      <BBAnchor anchor={[0, 0, 0]} frustumCulled={false}>
        {/* <Bounds observe fit clip clone margin={1.2} damping={6}> */}
        <ModelComponent
          model={model}
          isEnlarged={isEnlarged}
          onBase64Changed={(base64) => {
            onBase64Changed(base64);
          }}
          onErrorOccured={() => {
            setError(true);
          }}
          onLoadingStarted={() => {
            setLoading(true);
          }}
          onLoadingEnd={() => {
            setLoading(false);
          }}
          metaverseId={metaverseId}
        />
        {/* </Bounds> */}
        {loading && !error && (
          <Html center zIndexRange={0}>
            <VStack>
              <div
                style={{
                  width: "100%",
                  height: 5,
                  background: "grey",
                  borderRadius: "15px",
                }}
              >
                <div
                  style={{
                    width: `${parseInt(progress.toFixed(2))}%`,
                    height: 5,
                    transition: "linear",
                    transitionDelay: "0.1s",
                    background: "#FFFF0F",
                    borderRadius: "15px",
                  }}
                ></div>
              </div>
              <Text
                textAlign="center"
                whiteSpace="nowrap"
                fontSize="sm"
                fontWeight="medium"
                fontStyle="italic"
                color="white"
                transition="ease"
                transitionDelay="0.2s"
              >
                Loading 3D model
              </Text>
            </VStack>
          </Html>
        )}
        {error && (
          <Html center zIndexRange={0}>
            <Text
              textAlign="center"
              whiteSpace="nowrap"
              fontSize="sm"
              fontWeight="medium"
              fontStyle="italic"
              color="white"
              transition="ease"
              transitionDelay="0.2s"
            >
              Something went wrong
            </Text>
          </Html>
        )}
      </BBAnchor>

      <ambientLight intensity={0.3} />
      <pointLight intensity={0.5} position={[10, 10, 10]} />
      <directionalLight color="white" position={[0, 5, -5]} />
    </>
  );
};

const ModelViewer = ({
  model,
  canvaStyles = {},
  headerModelFile,
  isEnlarge = false,
  onBase64Changed = () => {},
  metaverseId = 0,
}) => {
  if (!model) return null;
  return (
    model && (
      <ModelProvider>
        <div
          style={{
            position: "relative",
            width: isEnlarge ? "50rem" : "18rem",
            height: isEnlarge ? "40rem" : "18rem",
            overflow: "hidden",
            ...canvaStyles,
          }}
        >
          <Canvas
            frameloop="demand"
            flat
            gl={{ preserveDrawingBuffer: true }}
            orthographic
            style={{
              width: "100%",
              height: "100%",
            }}
            resize={{ scroll: false }}
          >
            <Suspense fallback={null}>
              <Scene
                model={model}
                isEnlarged={isEnlarge}
                onBase64Changed={(base64) => {
                  onBase64Changed(base64);
                }}
                metaverseId={metaverseId}
              />
            </Suspense>
          </Canvas>
        </div>
      </ModelProvider>
    )
  );
};

export default ModelViewer;
