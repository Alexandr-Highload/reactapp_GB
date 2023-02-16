import MessageList from "../../components/MessageList/MessageList";
import { Form } from "../../components/Form/Form";
import ChatList from "../../components/ChatList/ChatList";

import { useParams, Navigate } from "react-router-dom";

import WithClasses from "../../HOC/WithClasses";

import styles from "./ChatsPage.module.css";

function ChatsPage({ messagesDB, chats }) {
  const { chatId } = useParams();

  const MessageListWithClass = WithClasses(MessageList);

  // console.log('messagesDB', messagesDB)
  const messagesChat = chats.find((chat) => chat?.name === chatId);
  const messages = Object.entries(messagesChat.messages).map((mes) => ({
    id: mes[0],
    text: mes[1].text,
    author: mes[1].author,
  }));
  console.log('messages', messagesChat)


  //console.log('messages', messagesChat)

  // const addMessage = (newMessage) => {
  //   setMessages([...messages, newMessage]);
  // };

  // useEffect(() => {
  //   if (chatId &&
  //      messages[chatId].length > 0 &&
  //      messages[chatId][messages[chatId].length - 1].author === AUTHOR.user) {
  //     const timeout = setTimeout(() => {
  //       onAddMessage(chatId,{
  //         author: AUTHOR.bot,
  //         text: "Im bot",
  //       });
  //     }, 1500);

  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [chatId, messages]);

  // const handleAddMessage = (message) => {
  //   if (chatId) {
  //   onAddMessage(chatId, message)
  //   }
  // }

  return (
    <>
      <h1>Welcome to chat!</h1>
      <ChatList chats={chats} />
      {/* <MessageList messages={chatId ? messages[chatId] : []} />  */}
      <MessageListWithClass
        messages={chatId ? messages : []}
        classes={styles.border}
      />
      <Form />
    </>
  );
}

export default ChatsPage;
