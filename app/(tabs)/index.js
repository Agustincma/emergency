import { useFocusEffect } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as SMS from "expo-sms";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";
import { getContactPreference, getNumbers } from "../../utils/storage";

export default function HomeScreen() {
  const [numbers, setNumbers] = useState([]);
  const [contactPreference, setContactPreference] = useState("call");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const loadNumbers = async () => {
    try {
      const nums = await getNumbers();
      const preference = await getContactPreference();
      console.log("Números cargados:", nums);
      console.log("Preferencia cargada:", preference);
      setNumbers(nums);
      setContactPreference(preference);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadNumbers();
  }, []);

  // Recargar números cuando la pantalla recibe foco
  useFocusEffect(
    React.useCallback(() => {
      loadNumbers();
    }, [])
  );

  const handleCall = async () => {
    console.log("Disparando alerta. Números disponibles:", numbers);
    console.log("Preferencia de contacto:", contactPreference);

    if (!numbers || numbers.length === 0 || !numbers[0]) {
      console.log("No hay números configurados");
      Alert.alert(
        "Sin números configurados",
        "Debes configurar al menos un número de emergencia en la pestaña de Configuración",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    // Ejecutar acción según la preferencia del usuario
    if (contactPreference === "sms") {
      // Si prefiere SMS, enviar SMS primero
      console.log("Preferencia: SMS - Enviando mensaje primero");
      await handleMessage();
    } else {
      // Si prefiere llamada (default), llamar primero
      const phoneNumber = numbers[0];
      console.log("Preferencia: Llamada - Llamando a:", phoneNumber);
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const handleSecondaryAction = async () => {
    console.log("Acción secundaria. Números disponibles:", numbers);

    if (!numbers || numbers.length === 0 || !numbers[0]) {
      Alert.alert(
        "Sin números configurados",
        "Debes configurar al menos un número de emergencia en la pestaña de Configuración"
      );
      return;
    }

    // Ejecutar la acción opuesta a la preferencia
    if (contactPreference === "sms") {
      // Si prefiere SMS, el botón secundario hace llamada
      const phoneNumber = numbers[0];
      console.log("Acción secundaria: Llamando a:", phoneNumber);
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      // Si prefiere llamada, el botón secundario envía SMS
      console.log("Acción secundaria: Enviando SMS");
      await handleMessage();
    }
  };

  const handleMessage = async () => {
    console.log("Intentando enviar mensaje. Números disponibles:", numbers);
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("Error", "El servicio de SMS no está disponible");
      return;
    }
    if (numbers && numbers.length > 0) {
      const filteredNumbers = numbers.filter((num) => num && num.trim() !== "");
      if (filteredNumbers.length > 0) {
        console.log("Enviando SMS a:", filteredNumbers);
        await SMS.sendSMSAsync(
          filteredNumbers,
          "🚨 EMERGENCIA: Necesito ayuda urgente. Por favor contactar."
        );
      } else {
        Alert.alert(
          "Sin números válidos",
          "No hay números válidos configurados. Verifica la configuración."
        );
      }
    } else {
      Alert.alert(
        "Sin números configurados",
        "Debes configurar al menos un número de emergencia en la pestaña de Configuración"
      );
    }
  };

  if (!isLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <Surface style={{ flex: 1 }}>
        {/* Header con información de estado */}

        <Divider />

        {/* Área central para los botones */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 40,
            paddingVertical: 20,
          }}
        >
          {/* Título de emergencia */}
          <Text
            variant="headlineSmall"
            style={{
              textAlign: "center",
              marginBottom: 30,
              color: "#d32f2f",
              fontWeight: "bold",
            }}
          >
            🚨 EMERGENCIA
          </Text>
          <Button
            mode="contained"
            onPress={handleCall}
            icon={contactPreference === "sms" ? "message-alert" : "phone"}
            style={{
              borderRadius: 120,
              backgroundColor: "#d32f2f",
              width: 220,
              height: 220,
              justifyContent: "center",
              alignItems: "center",
              elevation: isPressed ? 2 : 8,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: isPressed ? 1 : 4,
              },
              shadowOpacity: 0.3,
              shadowRadius: isPressed ? 2 : 4.65,
              marginBottom: 40,
              transform: [{ scale: isPressed ? 0.96 : 1 }],
            }}
            labelStyle={{ fontSize: 18, color: "white", fontWeight: "bold" }}
            contentStyle={{
              width: 220,
              height: 220,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
          >
            {contactPreference === "sms" ? "ENVIAR SMS" : "LLAMAR"}
          </Button>
          <Text
            variant="bodyMedium"
            style={{
              textAlign: "center",
              marginBottom: 20,
              color: "#666",
              paddingHorizontal: 20,
            }}
          >
            {contactPreference === "sms"
              ? "Enviará SMS de emergencia a tus contactos"
              : "Llamará a tu contacto principal de emergencia"}
          </Text>
          {/* Botón secundario - Más pequeño debajo */}
          <Button
            mode="outlined"
            onPress={handleSecondaryAction}
            icon={contactPreference === "sms" ? "phone" : "message"}
            style={{
              borderRadius: 25,
              borderColor: "#F7941D",
              borderWidth: 2,
            }}
            labelStyle={{ fontSize: 14, color: "#F7941D", fontWeight: "500" }}
            contentStyle={{
              paddingHorizontal: 20,
              paddingVertical: 8,
            }}
          >
            {contactPreference === "sms"
              ? "O llamar directamente"
              : "O enviar SMS"}
          </Button>
        </View>
      </Surface>
    </View>
  );
}
