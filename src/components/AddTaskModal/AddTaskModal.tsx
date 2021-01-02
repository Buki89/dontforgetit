import React, { FC } from "react";
import { Box, Input } from "../../primitives";
import { BsCalendar } from "react-icons/bs";
import { Button } from "../../primitives";
import styled from "styled-components";
import DatePicker from "react-datepicker";

const Container = styled.div`
  @keyframes example {
    from {
      background-color: transparent;
    }
    to {
      background-color: #fff;
    }
  }

  width: calc(100% - 4rem);
  z-index: 100;
  height: 30%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #fff;
  animation-name: example;
  animation-duration: 0.5s;
  padding: 2rem;
`;

const ErrorMessage = styled.p`
  font-size: 0.85rem;
  line-height: 1;
  color: #ca2525;
`;

type AddTaskModalProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDate: (event: Date) => void;
  input: string;
  errorMessage: string;
  date: Date | undefined;
  validate: boolean;
};

const AddTaskModal: FC<AddTaskModalProps> = ({
  handleSubmit,
  input,
  handleOnChange,
  handleDate,
  errorMessage,
  date,
  validate,
}) => {
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box direction="column">
          <Input onChange={handleOnChange} value={input}></Input>

          {validate && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            onChange={handleDate}
            minDate={new Date()}
            customInput={
              <BsCalendar size="40px">
                {date ? date.toLocaleDateString() : "pick deadline"}
              </BsCalendar>
            }
          />
          <Button color="blue" type="submit">
            Add Task!
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddTaskModal;
