import PropTypes from 'prop-types';

function MessageList({ messages }) {
  console.log("messages", messages);

  return (
    <>
      <h1>MessageList</h1>
      <ul>
        {messages?.map((message, index) => (
          <li key={index}>{message.text}</li>
        ))}
      </ul>
    </>
  );
}

export default MessageList;

MessageList.propTypes = {
  messages: PropTypes.array
}