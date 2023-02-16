import { color } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { signUp } from "../services/firebase";

function SignUp() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signUp(inputs.email, inputs.password);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setError(error.message);
      setInputs({ email: "", password: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>SignUp</div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={inputs.email}
            onChange={(event) =>
              setInputs((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
              }))
            }
          />
        </label>

        <label>
          Password:
          <input
            type="text"
            name="password"
            value={inputs.password}
            onChange={(event) =>
              setInputs((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
              }))
            }
          />
        </label>

        <button>SignUp</button>
      </form>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default SignUp;
