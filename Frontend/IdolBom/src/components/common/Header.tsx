// Header.tsx
// 뒤로가기 + 화면 이름
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  title: string; // 페이지 이름 (한글)
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back-ios" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>}
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 65,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontFamily: 'NanumSquareRoundEB',
    color: '#333',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
});

export default Header;
