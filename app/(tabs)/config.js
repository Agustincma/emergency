import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getNumbers, saveNumbers } from '../../utils/storage';

export default function ConfigScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');

  useEffect(() => {
    getNumbers().then((nums) => {
      setNum1(nums[0] || '');
      setNum2(nums[1] || '');
      setNum3(nums[2] || '');
    });
  }, []);

  const handleSave = async () => {
    await saveNumbers([num1, num2, num3].filter(Boolean));
    alert('Números guardados con éxito');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={{ flex: 1, padding: 20, gap: 10 }}>
          <TextInput
            label="Número 1"
            placeholder="Ej: 1122334455"
            value={num1}
            onChangeText={setNum1}
            keyboardType="phone-pad"
            style={{ height: 40, padding: 10 }}
            theme={{ roundness: 30 }}
            mode="outlined"
          />
          <TextInput
            label="Número 2"
            placeholder="Ej: 1122334455"
            value={num2}
            onChangeText={setNum2}
            keyboardType="phone-pad"
            style={{ height: 40, padding: 10 }}
            theme={{ roundness: 30 }}
            mode="outlined"
          />
          <TextInput
            label="Número 3"
            placeholder="Ej: 1122334455"
            value={num3}
            onChangeText={setNum3}
            keyboardType="phone-pad"
            style={{ height: 40, padding: 10 }}
            theme={{ roundness: 30 }}
            mode="outlined"
          />
          <Button
            mode="contained"
            onPress={handleSave}
            style={{
              height: 60,
              justifyContent: 'center',
              borderRadius: 30,
              marginTop: 10,
              backgroundColor: '#F7941D'
            }}
            contentStyle={{ height: 60 }}
          >
            Guardar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
