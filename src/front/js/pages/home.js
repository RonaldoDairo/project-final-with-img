import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { registerUser, loginUser } from "../service";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const [state, setState] = useState({ email: "", password: "" });

  const handelChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handelSubmbit = async (e) => {
    e.preventDefault();
    console.log(state);
    await loginUser(state);
  };

  return (
    <div className="text-center mt-5">
      <form onChange={handelChange} onSubmit={handelSubmbit}>
        <input name="email" type="email" placeholder="email"></input>
        <input name="password" type="password" placeholder="password"></input>
        <input type="submit" value="Enviar"></input>
      </form>
    </div>
  );
};
