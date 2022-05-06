import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router";
import { axios } from "../../utils/axios";

export const Register = (): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e: any) => {
    e.preventDefault();
    const body = {
      username,
      password,
      email,
      profile,
      city,
      state,
      country,
    };
    try {
      const resp = await axios.post("/users/register", body);
      if (resp.status === 201) {
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
      <FormControl mt="4">
        <FormLabel>Email</FormLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl mt="4">
        <FormLabel>Profile</FormLabel>
        <Textarea
          id="profile"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        />
      </FormControl>
      <FormControl mt="4">
        <FormLabel>City</FormLabel>
        <Input
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </FormControl>
      <FormControl mt="4">
        <FormLabel>State</FormLabel>
        <Input
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </FormControl>
      <FormControl mt="4">
        <FormLabel>Country</FormLabel>
        <Input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </FormControl>
      {isError && (
        <Text color="red">User already exists or some rare error</Text>
      )}
      <Button colorScheme="blue" mt="4" onClick={registerUser}>
        Register
      </Button>
    </Box>
  );
};
