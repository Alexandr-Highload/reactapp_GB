import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { nanoid } from "nanoid";

import { defaultContext, ThemeContext } from "./utils/ThemeContext";
import { store, persistor } from "./store";
import { auth } from "./store/profile/actions";
import { firebaseAuth, messagesRef } from "./services/firebase";
import { onValue } from "firebase/database";

import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import { AboutWithConnect } from "./pages/AboutPage";
import ChatsPage from "./pages/ChatsPage/ChatsPage";
import ChatList from "./components/ChatList/ChatList";
import Articles from "./pages/Articles";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { PrivateRoute } from "./utils/PrivateRoute.js";
import { PublicRoute } from "./utils/PublicRoute.js";

// const defaultMessages = {
//   default: [
//     {
//       author: "user",
//       text: "one text",
//     },
//     {
//       author: "user",
//       text: "second text",
//     },
//   ],
// };

function App() {
  //const [messages, setMessages] = useState(defaultMessages);
  const [theme, setTheme] = useState(defaultContext.theme);
  const dispatch = useDispatch();

  const [messagesDB, setMessagesDB] = useState({});
  const [chats, setChats] = useState([]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(auth(true));
      } else {
        dispatch(auth(false));
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("snapshot", data);

      const newChats = Object.entries(data).map((item) => ({
        name: item[0],
        messages: item[1].messageList,
      }));

      setMessagesDB(data);
      setChats(newChats);
      
      console.log("newChats", newChats);
      console.log("messagesDB", messagesDB);
    });
  }, []);

  return (
    <>
      <PersistGate persistor={persistor}>
        <ThemeContext.Provider
          value={{
            theme,
            toggleTheme,
          }}
        >
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<MainPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="about" element={<AboutWithConnect />} />
              {/* <Route path="chats">
                  <Route index element={<ChatList />} />
                  <Route path=":chatId" element={<ChatsPage />} />
                </Route> */}
              <Route path="chats" element={<PrivateRoute />}>
                <Route
                  index
                  element={<ChatList chats={chats} messageDB={messagesDB} />}
                />
                <Route
                  path=":chatId"
                  element={<ChatsPage chats={chats} messageDB={messagesDB} />}
                />
              </Route>
              <Route path="articles" element={<Articles />} />
              <Route
                path="signin"
                element={<PublicRoute component={<SignIn />} />}
              />
              <Route path="signup" element={<SignUp />} />
            </Route>

            <Route path="*" element={<h2>404 PAGE NOT FOUND</h2>} />
          </Routes>
        </ThemeContext.Provider>
      </PersistGate>
    </>
  );
}

export default App;
