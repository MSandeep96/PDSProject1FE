import { Box, VStack } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Question } from "../../components/Question";
import { axios } from "../../utils/axios";

export const SearchQuestions = ({ searchTerm }: any): ReactElement => {
  const [ques, setQues] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let resp;
      resp = await axios.get(`/search/${searchTerm}`);
      if (resp.status === 200) {
        setQues(resp.data.ques);
      } else {
        setIsError(true);
      }
    };
    fetchData();
  }, [searchTerm]);

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
