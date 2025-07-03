import AsyncStorage from "@react-native-async-storage/async-storage";

// Números
export const saveNumbers = async (numbers) => {
  try {
    await AsyncStorage.setItem("trustedNumbers", JSON.stringify(numbers));
  } catch (e) {
    console.error("Error al guardar números", e);
  }
};

export const getNumbers = async () => {
  try {
    const result = await AsyncStorage.getItem("trustedNumbers");
    return result ? JSON.parse(result) : [];
  } catch (e) {
    console.error("Error al leer números", e);
    return [];
  }
};

// Prioridad
export const savePriority = async (isCallFirst) => {
  try {
    await AsyncStorage.setItem("priorityIsCall", JSON.stringify(isCallFirst));
  } catch (e) {
    console.error("Error al guardar prioridad", e);
  }
};

export const getPriority = async () => {
  try {
    const result = await AsyncStorage.getItem("priorityIsCall");
    return result !== null ? JSON.parse(result) : true;
  } catch (e) {
    console.error("Error al leer prioridad", e);
    return true;
  }
};
