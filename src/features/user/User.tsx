import {
  Box,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export const User = (): ReactElement => {
  const [isLogin, setIsLogin] = useState("0");

  return (
    <VStack>
      <Heading p="4">Overflow</Heading>
      <RadioGroup onChange={setIsLogin} value={isLogin}>
        <Stack direction="row" spacing="4">
          <Radio value="0">Login</Radio>
          <Radio value="1">Register</Radio>
        </Stack>
      </RadioGroup>
      {isLogin === "0" && <Login />}
      {isLogin === "1" && <Register />}
    </VStack>
  );
};
