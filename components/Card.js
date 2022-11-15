import { Text, Box, VStack, Flex, Button, Grid, Tag } from "@chakra-ui/react";
import { useMemo } from "react";
import { GATEWAY } from "../constants";

import ModelViewer from "./ModelViewer";

const Card = ({
  name,
  animation_url,
  properties,
  onClickFunction,
  availiableDerivatives,
}) => {
  const animationURL = useMemo(() => {
    if (animation_url.slice(0, 4) === "ipfs") {
      return `https://${GATEWAY}/ipfs/${animation_url.slice(7)}`;
    }
    return animation_url;
  });

  return (
    <VStack
      border={"solid"}
      borderWidth={"2px"}
      p={"1rem"}
      m={"1rem"}
      align={"stretch"}
    >
      <Flex justify={"center"}>
        <Text fontWeight={"bold"} fontSize={"1.25rem"}>
          {name}
        </Text>
      </Flex>

      <Box>
        <ModelViewer model={animationURL}></ModelViewer>
      </Box>
      <Flex justify={"flex-end"}>
        <Tag w={"fit-content"}>{availiableDerivatives} left</Tag>
      </Flex>
      <Grid gap={"0.5rem"}>
        <Box fontWeight={"700"}>Properties:</Box>
        <VStack align={"stretch"}>
          {Object.keys(properties).map((property, index) => (
            <Text key={index}>
              {property}: {properties[property]}
            </Text>
          ))}
        </VStack>
      </Grid>

      <Flex>
        <Button w={"100%"} onClick={onClickFunction}>
          Buy
        </Button>
      </Flex>
    </VStack>
  );
};

export default Card;
