import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";
import { axios } from "../utils/axios";

export const Answer = ({
  d,
  canUpvote,
}: {
  d: any;
  canUpvote: boolean;
}): ReactElement => {
  const [isUpvote, setIsUpvote] = React.useState(false);

  const upvote = async () => {
    const resp = await axios.post("/answers/upvote", {
      qid: d.qid,
      auser: d.auser,
    });
    if (resp.status === 200) {
      setIsUpvote(true);
    }
  };

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
        <HStack>
          <VStack>
            <IconButton
              size="sm"
              disabled={!canUpvote}
              aria-label="upvote"
              colorScheme={isUpvote ? "red" : "gray"}
              icon={<ArrowUpIcon />}
              onClick={upvote}
            />
            <Text>{d.upvotes}</Text>
          </VStack>
          <Box>
            <Text maxW="100%">{d.answer}</Text>
          </Box>
        </HStack>
        <Divider />
        <HStack spacing="8">
          <Text>{d.auser}</Text>
          <Text>{new Date(d.timeOfAnswer).toLocaleString()}</Text>
        </HStack>
      </Box>
    </RouterLink>
  );
};
