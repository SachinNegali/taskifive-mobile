import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import { User } from "../types/userTypes";

const userKey = "user";
const tokenKey = "token";

export const saveUser = async (userInfo: User) => {
  try {
    await setItemAsync(userKey, JSON.stringify(userInfo));
  } catch (error) {
    console.log("Error saving user to secure storage:", error);
  }
};

export const saveUserToken = async (value: string) => {
  try {
    await setItemAsync(tokenKey, value);
  } catch (error) {
    console.log("Error saving token to secure storage:", error);
  }
};

export const getUser = async () => {
  try {
    const user = await getItemAsync(userKey);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.log("Error getting user from secure storage:", error);
    return null;
  }
};

export const getUserToken = async () => {
  try {
    const token = await getItemAsync(tokenKey);
    return token;
  } catch (error) {
    console.log("Error getting token from secure storage:", error);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await deleteItemAsync(userKey);
  } catch (error) {
    console.log("Error removing user from secure storage:", error);
  }
};

export const removeUserToken = async () => {
  try {
    await deleteItemAsync(tokenKey);
  } catch (error) {
    console.log("Error removing token from secure storage:", error);
  }
};
