import { Box, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { axios } from "../../utils/axios";
import { Link as RouterLink } from "react-router-dom";
import { Question } from "../../components/Question";

export const BrowseQuestions = ({
  currTopic,
}: {
  currTopic: string;
}): ReactElement => {
  const [ques, setQues] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let resp;
      if (currTopic === "0") {
        resp = await axios.get("/questions");
      } else {
        resp = await axios.get(`/questions?topicId=${currTopic}`);
      }
      if (resp.status === 200) {
        setQues(resp.data.ques);
      } else {
        setIsError(true);
      }
    };
    fetchData();
  }, [currTopic]);

  return (
    <Box>
      <VStack spacing="8" alignItems="flex-start">
        {ques.map((d: any) => (
          <Question key={d.qid} d={d} />
        ))}
      </VStack>
    </Box>
  );
};
