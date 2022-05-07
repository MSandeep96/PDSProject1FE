import { Box, VStack } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { Answer } from "../../components/Answer";
import { axios } from "../../utils/axios";

export const UserAnswers = (): ReactElement => {
  const [answ, setAnsw] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("username");
      const resp = await axios.get(`/answers?userId=${userId}`);
      if (resp.status === 200) {
        setAnsw(resp.data.answ);
      } else {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <VStack spacing="8" alignItems="flex-start">
        {answ.map((d: any) => (
          <Answer key={d.auser} d={d} />
        ))}
      </VStack>
    </Box>
  );
};
