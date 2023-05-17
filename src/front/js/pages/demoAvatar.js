import React, { useState, useContext, useEffect } from "react";
import { updateUser } from "../service";
import Avatar from "react-avatar-edit";
import { Context } from "../store/appContext";

export const DemoAvatar = () => {
  const { store, actions } = useContext(Context);
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
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

  const handleClick = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("avatar", file);
    form.append("user", JSON.stringify(user));
    updateUser(form);
  };

  console.log(user);
  const onClose = ()=>{
    setPreview(null);
  }
  const onCrop = (view) =>{
    setPreview(view);
  }
  useEffect (()=>{
      console.log(preview,"***")
  }, [preview])
  return (
    <div className="container">
      
      <p>Añade ua imagen</p>
      {/* <img src={fileUrl}></img> */}
      <form onSubmit={handleClick} onChange={handleChange}>
      {/* <input type="file" ></input> */}
      <Avatar
      width={400}
      height={300}
      onCrop={onCrop}
      onClose={onClose}
      src={src}
      // type="file"
      onChange={handleChange}
      />
      
      
      <input
        type="email"
        onChange={({ target }) => setUser({ email: target.value })}
      ></input>
      <button >Enviar</button>
      </form>
      
      {/* para previsualiazar la img  */}
      {preview && <img src={preview} alt="img" /> } 
    </div>
  );
};