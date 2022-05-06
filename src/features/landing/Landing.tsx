import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { UserAnswers } from "./UserAnswers";
import { UserQuestions } from "./UserQuestions";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export const Landing = (): ReactElement => {
  const navigate = useNavigate();

  const doLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/user");
  };

  return (
    <Box>
      <HStack m="2" justifyContent="space-between">
        <Heading mr="8">Overflow</Heading>
        <Box>
          <Button mr="4" as={RouterLink} to="/browse" colorScheme="green">
            Browse
          </Button>
          <Button onClick={doLogout}>Logout</Button>
        </Box>
      </HStack>
      <Tabs variant="enclosed" p="4">
        <TabList>
          <Tab>Questions</Tab>
          <Tab>Answers</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserQuestions />
          </TabPanel>
          <TabPanel>
            <UserAnswers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
