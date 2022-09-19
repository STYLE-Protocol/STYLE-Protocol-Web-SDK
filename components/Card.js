import { Text, Box, VStack, Flex, Button, Grid, Tag } from "@chakra-ui/react";

import ModelViewer from "./ModelViewer";

const Card = ({
  name,
  animation_url,
  properties,
  onClickFunction,
  availiableDerivatives,
}) => {
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
        <ModelViewer model={animation_url}></ModelViewer>
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
