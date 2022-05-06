import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Answer } from "../../components/Answer";
import { NewAnswerModal } from "../../components/NewAnswerModal";
import { Question } from "../../components/Question";
import { axios } from "../../utils/axios";

export const DetailedQuestion = (): ReactElement => {
  let params = useParams();
  const [qa, setQa] = useState<any>([]);
  const [showNewAnsModal, setShowNewAnsModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(`/answers?qid=${params.id}`);
      if (resp.status === 200) {
        setQa(resp.data.answ);
      }
    };
    fetchData();
  }, [params.id]);

  if (qa.length === 0) {
    return <div>No answers yet</div>;
  }
  return (
    <Box w="100vw">
      <Box p="4">
        <Text fontSize="2xl">{qa[0].title}</Text>
        <Divider />
        <Text my="4">{qa[0].body}</Text>
        <Divider />
        <HStack my="4">
          <Text>{qa[0].username}</Text>
          <Text>{qa[0].tname}</Text>
        </HStack>
        <Divider />
      </Box>
      <HStack p="4" justifyContent="space-between">
        <Text>Answers</Text>
        <Button
          onClick={() => {
            setShowNewAnsModal(true);
          }}
        >
          Add new
        </Button>
      </HStack>
      <VStack mt="4" spacing="8">
        {qa.map((d: any) => (
          <Answer key={d.auser} d={d} canUpvote={true} />
        ))}
      </VStack>
      <NewAnswerModal
        open={showNewAnsModal}
        close={setShowNewAnsModal}
        d={qa[0]}
      />
    </Box>
  );
};
