//import styles from './Form.module.css';
import React, { useState } from "react";
import PropTypes from 'prop-types'
// import { AUTHOR } from "../../constants";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { addMessage, addMessageWithReply } from "../../store/messages/actions";
import { useParams } from "react-router-dom";
import { AUTHOR } from "../../constants";
//import IButton from "@mui/material/Button";
//import ITextField from '@mui/material/TextField';

import { push } from "firebase/database";
import { getMessageListById } from "../../services/firebase";

export function Form() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { chatId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    // some code
    // addMessage({
    //   author: AUTHOR.user,
    //   text,
    // });
    dispatch(
      addMessageWithReply(chatId, {
        author: AUTHOR.user,
        text,
      })
    );
    push(getMessageListById(chatId), {
      author: AUTHOR.user,
      text,
    });

    setText("");
  };

  return (
    <>
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        {/* <ITextField 
          id="standard-basic" 
          label="Enter message" 
          variant="standard" 
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          /> */}

        {/* <Button type="submit" render= {() => <span>BUTTON</span>}>Add message</Button> */}

        <Button type="submit">Add message</Button>

        {/* <IButton variant="contained" color="success" size="small" type="submit">
          Add message
        </IButton> */}
      </form>
    </>
  );
}

Form.propTypes = {
  addMessage: PropTypes.func
}
