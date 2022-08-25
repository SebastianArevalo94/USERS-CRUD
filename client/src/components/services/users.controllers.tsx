import { User } from "../interfaces/user.interfaces";

const url = "http://localhost:5062/api/Users";

export const GetAllUsers = async () => {
  try {
    const resp = await fetch(`${url}/List`);
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const CreateUser = async(user:User) => {
  try {
    const resp = await fetch(`${url}/SaveUser`,{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const json = await resp.json();
    return json
  } catch (error) {
    console.log(error);
  }
};

export const EditUser = async (user: User) => {
  try {
    const resp = await fetch(`${url}/EditUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteUser = async (userId: Number) => {
  try {
    const resp = await fetch(`${url}/DeleteUser/${userId}`, {
      method: "DELETE",
    });
    const json = await resp.json();
    return json
  } catch (error) {
    console.log(error);
  }
};
