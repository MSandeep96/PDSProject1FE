import { ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { axios } from "../utils/axios";

export const Answer = ({ d }: { d: any }): ReactElement => {
  const [isUpvote, setIsUpvote] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [userId, setUserId] = React.useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUserId(username as string);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(`/users/status/${d.auser}`);
      if (resp.status === 200) {
        setStatus(resp.data.Status);
      }
    };
    fetchData();
  }, [d.auser]);

  const upvote = async () => {
    const resp = await axios.post("/answers/upvote", {
      qid: d.qid,
      auser: d.auser,
    });
    if (resp.status === 200) {
      setIsUpvote(true);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
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
              disabled={userId === d.auser}
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
          <Text>{d.auser + "-" + status}</Text>
          <Text>{new Date(d.timeOfAnswer).toLocaleString()}</Text>
        </HStack>
      </Box>
    </RouterLink>
  );
};
