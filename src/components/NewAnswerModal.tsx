import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  InputGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { axios } from "../utils/axios";

export const NewAnswerModal = ({ open, close, d }: any): ReactElement => {
  const [answer, setAnswer] = React.useState("");

  const saveAnswer = async () => {
    const userId = localStorage.getItem("username");
    const resp = await axios.post("/answers", {
      qid: d.qid,
      auser: userId,
      answer,
    });
    if (resp.status === 200) {
      close(false);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        close(false);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Answer</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Answer</FormLabel>
            <Input
              id="answer"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={saveAnswer}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
