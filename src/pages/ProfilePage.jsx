import { useContext, useState } from "react";
import { ThemeContext } from "../utils/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { changeName, toggleProfile } from "../store/profile/actions";
import { selectName, selectVisible } from "../store/profile/selectors";

function ProfilePage() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const name = useSelector(selectName);
  const visible = useSelector(selectVisible);
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  // const handleChange = () => {
  //   console.log(value);
  //   dispatch(changeName(value));
  //   setValue("");
  // };

  return (
    <>
      <h1>Profile Page</h1>
      <p>{theme === "light" ? "🌞" : "🌙"}</p>
      <button onClick={toggleTheme}>Change Theme</button>
      <hr />
      <h2>{name}</h2>
      <input type="checkbox" checked={visible} readOnly />
      <button onClick={() => dispatch(toggleProfile())}>Change visible</button>
      <br />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {/* <button onClick={handleChange}>Change Name</button> */}
      <button onClick={() => dispatch(changeName(value))}>Change Name</button>
    </>
  );
}

export default ProfilePage;
