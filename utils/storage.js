// utils/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveNumbers = async (numbers) => {
  await AsyncStorage.setItem("trustedNumbers", JSON.stringify(numbers));
};

export const getNumbers = async () => {
  const result = await AsyncStorage.getItem("trustedNumbers");
  return result ? JSON.parse(result) : [];
};

export const saveContactPreference = async (preference) => {
  await AsyncStorage.setItem("contactPreference", preference);
};

export const getContactPreference = async () => {
  const result = await AsyncStorage.getItem("contactPreference");
  return result || "call"; // Default to 'call' if no preference is set
};
