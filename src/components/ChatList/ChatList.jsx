import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from "../../store/messages/actions";
import { selectChat } from "../../store/messages/selectors";

import { push, set, remove } from "firebase/database";
import {
  messagesRef,
  getChatById,
  getMessageListById,
} from "../../services/firebase";

function ChatList({ messageDB, chats }) {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  //const chats = useSelector(selectChat, (prev, next) => prev.length === next.length);

  console.log("update chats", chats);

  const handleSubmit = (event) => {
    event.preventDefault();
    // onAddChat({
    //   id: nanoid(),
    //   name: value,
    // });
    dispatch(addChat(value));

    set(messagesRef, {
      ...messageDB,
      [value]: {
        name: value,
      },
    });

    push(getMessageListById(value), {
      text: "Chat has been created",
      author: "Admin",
    });
    setValue("");
  };

  console.log("chats", chats);
  const handleDeleteChat = (chatId) => {
    remove(getChatById(chatId));
  };

  return (
    <>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id}>
            <Link to={`/chats/${chat.name}`}>{chat.name}</Link>
            <button onClick={() => dispatch(handleDeleteChat(chat.name))}>
              X
            </button>
          </li>
        ))}
      </ul>

      <h1>ChatList</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit">Create Chat</button>
      </form>
    </>
  );
}

export default ChatList;
