import FallbackImage from "./FallbackImage";

import { Box, Progress } from "@chakra-ui/react";
import { BBAnchor, useProgress } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import dynamic from "next/dynamic";
import React, { Suspense, useContext, useEffect } from "react";
import {
  NFTViewerContext,
  NFTViewerProvider,
} from "../contexts/NFTViewerContext";

const deg2rad = (degrees) => degrees * (Math.PI / 180);

const ModelComponent = dynamic(() => import("./Model"), {
  suspense: true,
});

const SceneCustom = ({
  model,
  isEnlarged = false,
  onBase64Changed = () => {},
  onErrorOccured = () => {},
  src,
  canvaStyles = {},
  isVoxels = false,
  isDcl = false,
  ...rest
}) => {
  const { loading, setLoading, error, setError, setProgressState } =
    useContext(NFTViewerContext);

  const { progress } = useProgress();
  useEffect(() => {
    setProgressState(progress);
  }, [progress]);

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
            setLoading(false);
          }}
          onLoadingStarted={() => {
            setLoading(true);
          }}
          onLoadingEnd={() => {
            setLoading(false);
          }}
          style={(loading || error) && { display: "none" }}
          isVoxels={isVoxels}
          isDcl={isDcl}
        />
      </BBAnchor>

      <ambientLight intensity={0.3} />
      <pointLight intensity={0.5} position={[10, 10, 10]} />
      <directionalLight color="white" position={[0, 5, -5]} />
    </>
  );
};

function Indicator() {
  const { loading, error, progressState } = useContext(NFTViewerContext);
  return loading || error ? (
    <div
      style={{
        width: "80%",
        position: "absolute",
        top: 0,
        left: "10%",
        bgColor: "blue",
      }}
    >
      <Progress
        variant={!!error ? "danger" : "primary"}
        value={progressState}
      />
    </div>
  ) : null;
}

const NFTViewerBasement = ({
  hovered,
  model,
  canvaStyles = {},
  headerModelFile,
  isEnlarge = false,
  onBase64Changed = () => {},
  src,
  fallback = DEFAULT_IMAGE,
  is3D = false,
  isVoxels = false,
  isDcl = false,
  ...rest
}) => {
  const { loading, setLoading, error, setError } = useContext(NFTViewerContext);

  useEffect(() => {
    if (!hovered) {
      setLoading(false);
      setError(false);
    }
  }, [hovered]);

  if (is3D) {
    return (
      <Box display={"contents"}>
        <div
          style={{
            position: "absolute",
            display: !hovered || loading || error ? "block" : "none",
            ...canvaStyles,
          }}
        >
          <Indicator />
          <FallbackImage src={src} fallback={fallback} is3D={is3D} {...rest} />
        </div>

        {hovered && (
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
                <SceneCustom
                  model={model}
                  isEnlarged={isEnlarge}
                  onBase64Changed={(base64) => {
                    onBase64Changed(base64);
                  }}
                  src={src}
                  canvaStyles={canvaStyles}
                  style={{ borderRadius: "2rem" }}
                  objectFit="cover"
                  h="full"
                  rounded="md"
                  isVoxels={isVoxels}
                  isDcl={isDcl}
                />
              </Suspense>
            </Canvas>
          </div>
        )}
      </Box>
    );
  } else {
    return (
      <Box display={"contents"}>
        <div
          style={{
            position: "absolute",
            display: "block",
            ...canvaStyles,
          }}
        >
          <FallbackImage src={src} fallback={fallback} is3D={is3D} {...rest} />
        </div>
      </Box>
    );
  }
};

const NFTViewer = ({
  hovered,
  model,
  canvaStyles = {},
  headerModelFile,
  isEnlarge = false,
  onBase64Changed = () => {},
  src,
  fallback = DEFAULT_IMAGE,
  is3D = false,
  isVoxels = false,
  isDcl = false,
  ...rest
}) => {
  return (
    <NFTViewerProvider>
      <NFTViewerBasement
        hovered={hovered}
        model={model}
        canvaStyles={canvaStyles}
        headerModelFile={headerModelFile}
        isEnlarge={isEnlarge}
        onBase64Changed={onBase64Changed}
        src={src}
        fallback={fallback}
        is3D={is3D}
        isDcl={isDcl}
        isVoxels={isVoxels}
        {...rest}
      />
    </NFTViewerProvider>
  );
};

export default NFTViewer;
