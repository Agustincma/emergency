import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  Button,
  Card,
  HelperText,
  Paragraph,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import {
  getContactPreference,
  getNumbers,
  saveContactPreference,
  saveNumbers,
} from "../../utils/storage";

export default function ConfigScreen() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [snackVisible, setSnackVisible] = useState(false);
  const [contactPreference, setContactPreference] = useState("call"); // "call" o "sms"

  useEffect(() => {
    const loadData = async () => {
      try {
        const nums = await getNumbers();
        setNum1(nums[0] || "");
        setNum2(nums[1] || "");
        setNum3(nums[2] || "");

        const preference = await getContactPreference();
        setContactPreference(preference);
        console.log(
          "Config: Datos cargados - números:",
          nums,
          "preferencia:",
          preference
        );
      } catch (error) {
        console.error("Error cargando configuración:", error);
      }
    };

    loadData();
  }, []);

  const isValidPhoneNumber = (num) => num.length >= 10;

  const handleSave = async () => {
    try {
      const validNumbers = [num1, num2, num3].filter((n) => n !== "");
      await saveNumbers(validNumbers);
      await saveContactPreference(contactPreference);
      console.log(
        "Config: Guardado - números:",
        validNumbers,
        "preferencia:",
        contactPreference
      );
      setSnackVisible(true);
    } catch (error) {
      console.error("Error guardando configuración:", error);
    }
  };

  const clearNumber = (setter) => {
    setter("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <Card style={{ marginBottom: 20 }}>
            <Card.Content>
              <Title>Configuración de Números</Title>
              <Paragraph>
                Configura hasta 3 números de emergencia que serán contactados
                automáticamente.
              </Paragraph>
            </Card.Content>
          </Card>

          <View style={{ gap: 10 }}>
            <View>
              <TextInput
                label="Número 1"
                placeholder="Ej: 1122334455"
                value={num1}
                onChangeText={setNum1}
                keyboardType="phone-pad"
                style={{ marginBottom: 5 }}
                contentStyle={{ paddingHorizontal: 12 }}
                theme={{ roundness: 12 }}
                mode="outlined"
                left={<TextInput.Icon icon="phone" />}
                right={
                  num1 ? (
                    <TextInput.Icon
                      icon="close"
                      onPress={() => clearNumber(setNum1)}
                    />
                  ) : null
                }
              />
              <HelperText
                type={num1 && !isValidPhoneNumber(num1) ? "error" : "info"}
              >
                {num1 && !isValidPhoneNumber(num1)
                  ? "El número debe tener al menos 10 dígitos"
                  : "Número principal de emergencia"}
              </HelperText>
            </View>

            <View>
              <TextInput
                label="Número 2"
                placeholder="Ej: 1122334455"
                value={num2}
                onChangeText={setNum2}
                keyboardType="phone-pad"
                style={{ marginBottom: 5 }}
                contentStyle={{ paddingHorizontal: 12 }}
                theme={{ roundness: 12 }}
                mode="outlined"
                left={<TextInput.Icon icon="phone" />}
                right={
                  num2 ? (
                    <TextInput.Icon
                      icon="close"
                      onPress={() => clearNumber(setNum2)}
                    />
                  ) : null
                }
              />
              <HelperText
                type={num2 && !isValidPhoneNumber(num2) ? "error" : "info"}
              >
                {num2 && !isValidPhoneNumber(num2)
                  ? "El número debe tener al menos 10 dígitos"
                  : "Número secundario (opcional)"}
              </HelperText>
            </View>

            <View>
              <TextInput
                label="Número 3"
                placeholder="Ej: 1122334455"
                value={num3}
                onChangeText={setNum3}
                keyboardType="phone-pad"
                style={{ marginBottom: 5 }}
                contentStyle={{ paddingHorizontal: 12 }}
                theme={{ roundness: 12 }}
                mode="outlined"
                left={<TextInput.Icon icon="phone" />}
                right={
                  num3 ? (
                    <TextInput.Icon
                      icon="close"
                      onPress={() => clearNumber(setNum3)}
                    />
                  ) : null
                }
              />
              <HelperText
                type={num3 && !isValidPhoneNumber(num3) ? "error" : "info"}
              >
                {num3 && !isValidPhoneNumber(num3)
                  ? "El número debe tener al menos 10 dígitos"
                  : "Número terciario (opcional)"}
              </HelperText>
            </View>

            <Card style={{ marginVertical: 5 }}>
              <Card.Content>
                <Title style={{ fontSize: 18, marginBottom: 10 }}>
                  🚨 Preferencia de envio
                </Title>

                <RadioButton.Group
                  onValueChange={(value) => setContactPreference(value)}
                  value={contactPreference}
                >
                  <View style={{ marginBottom: 5 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <RadioButton value="call" />
                      <View style={{ marginLeft: 12, flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>
                          📞 Llamada Telefónica
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <RadioButton value="sms" />
                      <View style={{ marginLeft: 12, flex: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>
                          💬 Mensaje SMS
                        </Text>
                      </View>
                    </View>
                  </View>
                </RadioButton.Group>
              </Card.Content>
            </Card>

            <Button
              mode="contained"
              onPress={handleSave}
              icon="content-save"
              style={{
                height: 60,
                justifyContent: "center",
                borderRadius: 30,
                backgroundColor: "#F7941D",
              }}
              contentStyle={{ height: 60 }}
            >
              Guardar
            </Button>
          </View>

          <Snackbar
            visible={snackVisible}
            onDismiss={() => setSnackVisible(false)}
            duration={3000}
            action={{ label: "OK", onPress: () => setSnackVisible(false) }}
          >
            ✅ ¡Configuración guardada! Método preferido:{" "}
            {contactPreference === "call" ? "Llamada" : "SMS"}
          </Snackbar>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
