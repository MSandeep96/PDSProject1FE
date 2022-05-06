import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router";
import { axios } from "../../utils/axios";

export const Login = (): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const loginUser = async (e: any) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    try {
      const resp = await axios.post("/users/login", body);
      if (resp.status === 200) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        navigate("/");
      }
    } catch (err) {
      setIsError(true);
    }
  };

  return (
    <Box w="400px" textAlign="center" pt="8">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl mt="4">
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      {isError && <Text>User doesn't exist or some rare error</Text>}
      <Button colorScheme="blue" mt="4" onClick={loginUser}>
        Login
      </Button>
    </Box>
  );
};
