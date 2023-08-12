import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, clearSessionErrors } from "../../store/session";
import MovingBackground from "./Custom/MovingBackground";

import "./SessionForm.css";
import "./Custom/MovingBackground.css";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();
  const phrases = [
    { text: "Where should we go?", size: "16px", opacity: 0.6, depth: -10 },
    { text: "What's there to do here?", size: "20px", opacity: 0.8, depth: 5 },
    // Add more phrases
  ];
  const upperLimit = 150; // Adjust this value based on your design
  const lowerLimit = 50; // Adjust this value based on your design

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const loginDemo = (e) => {
    e.preventDefault();
    const email = "nyght.owl@nyght.com";
    const password = "password";
    dispatch(login({ email, password }));
  };
  return (
    <>
      <MovingBackground
        phrases={phrases}
        upperLimit={upperLimit}
        lowerLimit={lowerLimit}
      />
      <div className="session-form-container">
        <form className="session-form" onSubmit={handleSubmit}>
          <div className="errors">{errors?.email}</div>
          <label>
            <input
              type="text"
              value={email}
              onChange={update("email")}
              placeholder="Email"
              className="session-form-input"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            <input
              type="password"
              value={password}
              onChange={update("password")}
              placeholder="Password"
              className="session-form-input"
            />
          </label>
          <input
            className="session-form-submit"
            type="submit"
            value="Log In"
            disabled={!email || !password}
          />
          <button className="session-form-submit" onClick={loginDemo}>
            Demo Login
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
