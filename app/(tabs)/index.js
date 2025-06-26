import * as Linking from 'expo-linking';
import * as SMS from 'expo-sms';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getNumbers } from '../../utils/storage';

export default function HomeScreen() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    getNumbers().then(setNumbers);
  }, []);

  const handleCall = () => {
    if (numbers[0]) {
      Linking.openURL(`tel:${numbers[0]}`);
    } else {
      Alert.alert('Error', 'No hay número para llamar');
    }
  };

  const handleMessage = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Error', 'El servicio de SMS no está disponible');
      return;
    }
    if (numbers.length > 0) {
      await SMS.sendSMSAsync(numbers, 'Hola');
    } else {
      Alert.alert('Error', 'No hay números configurados');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Button
        mode="contained"
        onPress={handleCall}
        style={{
          marginBottom: 20,
          borderRadius: 100,
          backgroundColor: 'red'
        }}
        contentStyle={{
          width: 200,
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        labelStyle={{ fontSize: 20 }}
      >
        Llamar
      </Button>

      <Button
        mode="contained"
        onPress={handleMessage}
        style={{
          borderRadius: 100,
          backgroundColor: '#F7941D'
        }}
        contentStyle={{
          width: 100,
          height: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        labelStyle={{ fontSize: 16 }}
      >
        Text
      </Button>
    </View>
  );
}
