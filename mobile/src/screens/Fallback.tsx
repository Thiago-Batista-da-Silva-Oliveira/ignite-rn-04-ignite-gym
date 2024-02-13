import React from 'react';
import { View, Text } from 'react-native';

export const NotFoundScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Não foi possível encontrar essa página.</Text>
    </View>
  );
};
