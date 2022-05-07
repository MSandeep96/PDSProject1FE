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
  const [question, setQuestion] = useState<any>({});
  const [showNewAnsModal, setShowNewAnsModal] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUserId(username as string);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(`/answers?qid=${params.id}`);
      if (resp.status === 200) {
        setQa(resp.data.answ);
      }
    };
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(`/questions/${params.id}`);
      if (resp.status === 200) {
        setQuestion(resp.data);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <Box w="100vw">
      <Box p="4">
        <Text fontSize="2xl">{question.title}</Text>
        <Divider />
        <Text my="4">{question.body}</Text>
        <Divider />
        <HStack my="4">
          <Text>{question.username}</Text>
          <Text>{question.tname}</Text>
        </HStack>
        <Divider />
      </Box>
      <HStack p="4" justifyContent="space-between">
        <Text>Answers</Text>
        <Button
          onClick={() => {
            setShowNewAnsModal(true);
          }}
          disabled={userId === question.username}
        >
          Add new
        </Button>
      </HStack>
      <VStack mt="4" spacing="8">
        {qa.length === 0 && <Text>No answers yet!</Text>}
        {qa.length > 0 && qa.map((d: any) => <Answer key={d.auser} d={d} />)}
      </VStack>
      <NewAnswerModal
        open={showNewAnsModal}
        close={setShowNewAnsModal}
        d={question}
      />
    </Box>
  );
};
