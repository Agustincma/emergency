import * as Linking from "expo-linking";
import * as SMS from "expo-sms";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Button, Chip, Divider, Surface } from "react-native-paper";
import { getNumbers } from "../../utils/storage";

export default function HomeScreen() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    getNumbers().then(setNumbers);
  }, []);

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
            border: "12px solid #000",
          }}
        >
          <Button
            mode="contained"
            onPress={handleCall}
            icon="phone"
            style={{
              marginBottom: 20,
              borderRadius: 100,
              backgroundColor: "red",
              width: 200,
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              border: "12px solid #000",
            }}
            labelStyle={{ fontSize: 20, color: "white" }}
          >
            Llamar
          </Button>

          <Button
            mode="contained"
            onPress={handleMessage}
            icon="message"
            style={{
              borderRadius: 100,
              backgroundColor: "#F7941D",
            }}
            contentStyle={{
              width: 100,
              height: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
            labelStyle={{ fontSize: 16, color: "white" }}
          >
            Text
          </Button>
        </View>
      </Surface>
    </ScrollView>
  );
}
