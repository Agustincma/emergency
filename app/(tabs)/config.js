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
  Snackbar,
  TextInput,
  Title,
} from "react-native-paper";
import { getNumbers, saveNumbers } from "../../utils/storage";

export default function ConfigScreen() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [snackVisible, setSnackVisible] = useState(false);

  useEffect(() => {
    getNumbers().then((nums) => {
      setNum1(nums[0] || "");
      setNum2(nums[1] || "");
      setNum3(nums[2] || "");
    });
  }, []);

  const isValidPhoneNumber = (num) => {
    return num.length >= 10;
  };

  const handleSave = async () => {
    await saveNumbers([num1, num2, num3].filter(Boolean));
    setSnackVisible(true);
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
                style={{ height: 40, padding: 10 }}
                theme={{ roundness: 30 }}
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
                style={{ height: 40, padding: 10 }}
                theme={{ roundness: 30 }}
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
                style={{ height: 40, padding: 10 }}
                theme={{ roundness: 30 }}
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

            <Button
              mode="contained"
              onPress={handleSave}
              icon="content-save"
              style={{
                height: 60,
                justifyContent: "center",
                borderRadius: 30,
                marginTop: 10,
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
            action={{
              label: "OK",
              onPress: () => setSnackVisible(false),
            }}
          >
            ¡Números guardados con éxito!
          </Snackbar>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
