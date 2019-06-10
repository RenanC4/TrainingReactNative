import {AsyncStorage} from "react-native";

export const setData = async (key, value) => {
  try {
    var response = await AsyncStorage.setItem(key, value);
    return response;
  } catch (error) {
    return error;
  }
}

export const getData = async (key) => {
  try {
    var response = await AsyncStorage.getItem(key);
    return response;

  } catch (error) {
    return error;
  }
}

export const removeData = async (key) => {

  let response;

  try {
    response = await AsyncStorage.removeItem(key);
    return response;

  } catch (error) {
    return error;
  }
}