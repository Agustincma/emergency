import { useFocusEffect } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as SMS from "expo-sms";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Button, Chip, Divider, Surface } from "react-native-paper";
import { getNumbers, getPriority } from "../../utils/storage";

export default function HomeScreen() {
  const [numbers, setNumbers] = useState([]);
  const [priorityIsText, setPriorityIsText] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadData = async () => {
    const nums = await getNumbers();
    const priority = await getPriority();
    setNumbers(nums);
    setPriorityIsText(priority);
    setIsLoaded(true);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleCall = () => {
    if (numbers[0]) {
      Linking.openURL(`tel:${numbers[0]}`);
    } else {
      Alert.alert("Error", "No hay número para llamar");
    }
  };

  const handleMessage = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("Error", "El servicio de SMS no está disponible");
      return;
    }
    if (numbers.length > 0) {
      await SMS.sendSMSAsync(numbers, "Hola");
    } else {
      Alert.alert("Error", "No hay números configurados");
    }
  };

  if (!isLoaded) return null;

  const BigButtonStyle = {
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  };
  const SmallButtonStyle = {
    borderRadius: 100,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  };

  const CallButton = (
    <Button
      mode="contained"
      onPress={handleCall}
      icon="phone"
      style={{
        marginBottom: 20,
        backgroundColor: "red",
        border: "12px solid #000",
        ...(priorityIsText ? SmallButtonStyle : BigButtonStyle),
      }}
      labelStyle={{
        fontSize: priorityIsText ? 16 : 20,
        color: "white",
      }}
      contentStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Llamar
    </Button>
  );

  const TextButton = (
    <Button
      mode="contained"
      onPress={handleMessage}
      icon="message"
      style={{
        marginBottom: 20,
        backgroundColor: "#F7941D",
        ...(priorityIsText ? BigButtonStyle : SmallButtonStyle),
      }}
      labelStyle={{
        fontSize: priorityIsText ? 20 : 16,
        color: "white",
      }}
      contentStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Text
    </Button>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <Surface style={{ flex: 1, padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Chip icon="phone" mode="outlined" style={{ marginBottom: 10 }}>
            Números configurados: {numbers.length}
          </Chip>
        </View>

        <Divider style={{ marginBottom: 30 }} />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          {priorityIsText ? (
            <>
              {TextButton}
              {CallButton}
            </>
          ) : (
            <>
              {CallButton}
              {TextButton}
            </>
          )}
        </View>
      </Surface>
    </ScrollView>
  );
}
