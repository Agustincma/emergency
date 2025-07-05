import { useFocusEffect } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as SMS from "expo-sms";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Button, Chip, Divider, IconButton, Surface } from "react-native-paper";
import { getContactPreference, getNumbers } from "../../utils/storage";

export default function HomeScreen() {
  const [numbers, setNumbers] = useState([]);
  const [contactPreference, setContactPreference] = useState("call");

  const loadNumbers = async () => {
    try {
      const nums = await getNumbers();
      const preference = await getContactPreference();
      console.log("Números cargados:", nums);
      console.log("Preferencia cargada:", preference);
      setNumbers(nums);
      setContactPreference(preference);
    } catch (error) {
      console.error("Error cargando datos:", error);
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

  return (
    <ScrollView style={{ flex: 1 }}>
      <Surface style={{ flex: 1, padding: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Chip icon="phone" mode="outlined">
              Números configurados: {numbers ? numbers.length : 0}
            </Chip>
            <IconButton
              icon="refresh"
              size={20}
              onPress={loadNumbers}
              mode="outlined"
            />
          </View>

          {numbers && numbers.length > 0 && (
            <View style={{ marginTop: 10 }}>
              {numbers.map(
                (num, index) =>
                  num && (
                    <Chip
                      key={index}
                      icon="account"
                      mode="flat"
                      style={{ marginBottom: 5, marginRight: 5 }}
                    >
                      Contacto {index + 1}: {num}
                    </Chip>
                  )
              )}
            </View>
          )}

          {(!numbers || numbers.length === 0) && (
            <Chip
              icon="alert-circle"
              mode="outlined"
              style={{ backgroundColor: "#ffebee" }}
            >
              ⚠️ No hay números configurados
            </Chip>
          )}

          {numbers && numbers.length > 0 && (
            <Chip icon="cog" mode="flat" style={{ marginTop: 5 }}>
              Método preferido:{" "}
              {contactPreference === "call" ? "📞 Llamada" : "💬 SMS"}
            </Chip>
          )}
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
            icon={contactPreference === "sms" ? "message-alert" : "phone"}
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
            {contactPreference === "sms" ? "Enviar SMS" : "Llamar"}
          </Button>

          <Button
            mode="contained"
            onPress={handleSecondaryAction}
            icon={contactPreference === "sms" ? "phone" : "message"}
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
            {contactPreference === "sms" ? "Llamar" : "SMS"}
          </Button>
        </View>
      </Surface>
    </ScrollView>
  );
}
