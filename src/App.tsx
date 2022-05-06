import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Home } from "./features/home/Home";
import { User } from "./features/user/User";
import { Landing } from "./features/landing/Landing";
import { DetailedQuestion } from "./features/question/DetailedQuestion";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/user" element={<User />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Landing />
            </RequireAuth>
          }
        />
        <Route
          path="/browse"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/question/:id"
          element={
            <RequireAuth>
              <DetailedQuestion />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
