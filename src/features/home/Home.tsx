import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { BrowseQuestions } from "./BrowseQuestions";
import { SearchQuestions } from "./SearchQuestions";
import { Topics } from "./Topics";

export const Home = (): ReactElement => {
  const [currTopic, setCurrTopic] = useState("0");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box>
      <HStack m="2">
        <Heading mr="8">Overflow</Heading>
        <InputGroup m="2">
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </HStack>
      {searchTerm.length === 0 && (
        <HStack alignItems="flex-start">
          <Box w="200px" p="4">
            <Topics currTopic={currTopic} setCurrTopic={setCurrTopic} />
          </Box>
          <Box flex="1">
            <BrowseQuestions currTopic={currTopic} />
          </Box>
        </HStack>
      )}
      {searchTerm.length > 0 && (
        <Box>
          <SearchQuestions searchTerm={searchTerm} />
        </Box>
      )}
    </Box>
  );
};
