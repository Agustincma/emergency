// utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveNumbers = async (numbers) => {
  await AsyncStorage.setItem('trustedNumbers', JSON.stringify(numbers));
};

export const getNumbers = async () => {
  const result = await AsyncStorage.getItem('trustedNumbers');
  return result ? JSON.parse(result) : [];
};
