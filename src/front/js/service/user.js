import { URL } from ".";

const HEADERS = {
  "Content-Type": "application/json",
};

export const registerUser = async (user) => {
  try {
    const res = await fetch(`${URL}/user/register`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("ERROR REGISTER USER", err);
  }
};

export const loginUser = async (user) => {
  try {
    const res = await fetch(`${URL}/user/login`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(user),
    });
    const data = await res.json();
    console.log(data);
    localStorage.setItem("token", data.token);
  } catch (err) {
    console.log("ERROR LOGIN USER", err);
  }
};

export const getInfoUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...HEADERS,
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log("ERROR GET USER", err);
  }
};

export const updateUser = async (body) => {
  try {
    const res = await fetch(`${URL}/user`, {
      method: "PUT",
      body: body,
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("Error Update User", err);
  }
};