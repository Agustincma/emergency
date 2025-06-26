import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Avatar.Text size={100} label="AG" />
    </View>
  );
}
