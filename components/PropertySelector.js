import { Text, Box, VStack, Flex, Grid, Button } from "@chakra-ui/react";

const PropertySelector = ({ name, properties, setter }) => {
  return (
    <VStack borderWidth="1px" p={"1rem"} m={"1rem"} align={"center"}>
      <Text fontWeight={"700"} fontSize={"1.1rem"}>
        {name}
      </Text>
      <VStack align={"stretch"}>
        {properties.map((property, key) => (
          <Button
            key={key}
            colorScheme={"teal"}
            variant={"ghost"}
            onClick={() => setter(property)}
          >
            {property}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default PropertySelector;
