/* eslint-disable jsx-a11y/alt-text */
import { Image } from "@chakra-ui/react";
import { DEFAULT_IMAGE, DEFAULT_IMAGE_3D } from "../constants";

const FallbackImage = ({
  src,
  fallback = DEFAULT_IMAGE,
  is3D = false,
  ...rest
}) => {
  return (
    <Image
      src={src}
      fallbackSrc={is3D ? DEFAULT_IMAGE_3D : fallback}
      {...rest}
    />
  );
};
export default FallbackImage;
