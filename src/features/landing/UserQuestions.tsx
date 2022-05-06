import { Box, VStack } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Question } from "../../components/Question";
import { axios } from "../../utils/axios";

export const UserQuestions = (): ReactElement => {
  const [ques, setQues] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("username");
      const resp = await axios.get(`/questions?userId=${userId}`);
      if (resp.status === 200) {
        setQues(resp.data.ques);
      } else {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

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
