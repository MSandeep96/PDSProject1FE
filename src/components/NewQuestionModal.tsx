import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import { axios } from "../utils/axios";

export const NewQuestionModal = ({ isOpen, onClose }: any): ReactElement => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [topics, setTopics] = React.useState([]);
  const [selTopic, setSelTopic] = React.useState("1");

  useEffect(() => {
    const fetchTopics = async () => {
      const resp = await axios.get("/topics");
      if (resp.status === 200) {
        setTopics(resp.data);
      }
    };
    fetchTopics();
  }, []);

  const saveQuestion = async () => {
    const userId = localStorage.getItem("username");
    const resp = await axios.post("/questions", {
      title,
      body,
      topic: selTopic,
      username: userId,
    });
    if (resp.status === 200) {
      onClose();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Question</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Body</FormLabel>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Topic</FormLabel>
            <Select
              id="topic"
              value={selTopic}
              onChange={(e) => setSelTopic(e.target.value)}
            >
              {topics.map((topic: any) => (
                <option key={topic.tid} value={`${topic.tid}`}>
                  {topic.tname}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={saveQuestion}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
