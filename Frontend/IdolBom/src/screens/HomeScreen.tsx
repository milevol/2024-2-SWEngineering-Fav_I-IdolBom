import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeDemoScreen = ({ route }: any) => {
  const { authCode } = route.params || {};

  console.log("HomeDemoScreen Loaded with authCode:", authCode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Demo Screen</Text>
      <Text style={styles.authCode}>Authorization Code:</Text>
      <Text style={styles.code}>{authCode}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  authCode: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  code: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});

export default HomeDemoScreen;
