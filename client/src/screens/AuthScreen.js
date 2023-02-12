import { AuthContext } from "../context/AuthContext.js";
import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/httpHook.js";
import "./screens.css";

export default function AuthScreen() {
  const { request, loading, error, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const registerHandler = async () => {
    error && clearError();
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log(data + " Data");
    } catch (error) {}
  };
  const loginHandler = async () => {
    error && clearError();
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Register</h2>
        <div className="card">
          <div className="box cred">
            <label>Email</label>
            <input
              type={"email"}
              name={"email"}
              className={"inp"}
              onChange={changeHandler}
              placeholder={"write email..."}
            />
          </div>
          <div className="box cred">
            <label>Password</label>
            <input
              className={"inp"}
              type={"password"}
              name={"password"}
              onChange={changeHandler}
              placeholder={"write password..."}
            />
          </div>
          {error && <div>{error}</div>}
          <div className="box cred">
            <button
              className="but"
              name="register"
              disabled={loading}
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
          <div className="box cred">
            <button
              className="but"
              name="register"
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
