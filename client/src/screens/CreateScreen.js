import { AuthContext } from "../context/AuthContext.js";
import React, { useContext, useState } from "react";
import { useHttp } from "../hooks/httpHook.js";
import { useNavigate } from "react-router-dom";
import "./screens.css";

export default function CreateScreen() {
  const n = useNavigate();
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const auth = useContext(AuthContext);

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        n(`/detail/${data._id}`);
      } catch (error) {}
    }
  };

  return (
    <div className="container">
      <div className="box create-box">
        <h2>CREATE YOUR LINK</h2>
        <input
          type={"text"}
          name={"short"}
          onKeyDown={pressHandler}
          className={"inp createLink"}
          placeholder={"Paste url..."}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
    </div>
  );
}
