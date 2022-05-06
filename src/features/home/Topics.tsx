import { InputGroup, Radio, RadioGroup, VStack } from "@chakra-ui/react";
import React, { ReactElement, useEffect, useState } from "react";
import { axios } from "../../utils/axios";

export const Topics = (props: any): ReactElement => {
  const [topicMapping, setTopicMapping] = useState([]);

  const onChange = (e: any) => {
    props.setCurrTopic(e);
  };

  useEffect((): void => {
    const fetchData = async () => {
      const topicsMapping = await axios.get("/topics");
      setTopicMapping(topicsMapping.data);
    };
    fetchData();
  }, []);

  return (
    <RadioGroup onChange={onChange} value={props.currTopic}>
      <VStack ml="4" spacing="4" alignItems="flex-start">
        <Radio key="0" value="0">
          All
        </Radio>
        {topicMapping.map((topic: any) => (
          <Radio key={topic.tid} value={`${topic.tid}`}>
            {topic.tname}
          </Radio>
        ))}
      </VStack>
    </RadioGroup>
  );
};
