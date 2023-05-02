import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { getInfoUser } from "../service";

export const Single = (props) => {
  const { store, actions } = useContext(Context);

  const [state, setState] = useState({
    id: 0,
    email: "",
    avatar: "",
  });

  const getUser = async () => {
    const data = await getInfoUser();
    console.log("DATA", data);
    setState(data);
  };

  useEffect(() => getUser(), []);

  return (
    <div className="jumbotron">
      <p>email: {state.email}</p>
      <p>id: {state.id}</p>
      <img src={state.avatar}></img>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
