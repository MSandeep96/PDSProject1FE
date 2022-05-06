import { Box, Divider, HStack, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

export const Question = ({ d }: { d: any }): ReactElement => {
  return (
    <RouterLink to={`/question/${d.qid}`}>
      <Box
        border="1px"
        borderColor="gray.100"
        w="100%"
        key={d.qid}
        p="2"
        boxShadow="md"
      >
        <Text maxW="100%" fontWeight="bold">
          {d.title}
        </Text>
        <Divider />
        <Text maxW="100%">{d.body}</Text>
        <Divider />
        <HStack spacing="8">
          <Text>{d.username}</Text>
          <Text>{d.tname}</Text>
          <Text>{new Date(d.timePosted).toLocaleString()}</Text>
        </HStack>
      </Box>
    </RouterLink>
  );
};
