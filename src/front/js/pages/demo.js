import React, { useState, useContext } from "react";
import { updateUser } from "../service";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const [user, setUser] = useState({
    email: "",
  });

  const handleChange = ({ target }) => {
    console.log(target.files);
    if (target.files) {
      setFile(target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          console.log("result", reader.result);
          setFileUrl(reader.result);
        }
      };
      reader.readAsDataURL(target.files[0]);
    }
  };

  const handleClick = () => {
    const form = new FormData();
    form.append("avatar", file);
    form.append("user", JSON.stringify(user));
    updateUser(form);
  };

  console.log(user);

  return (
    <div className="container">
      <p>Añade ua imagen</p>
      <img src={fileUrl}></img>
      <input type="file" onChange={handleChange}></input>
      <input
        type="email"
        onChange={({ target }) => setUser({ email: target.value })}
      ></input>
      <button onClick={handleClick}>Enviar</button>
    </div>
  );
};
