import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoadingScreen() {
  const navigation = useNavigation(); // 네비게이션 훅 사용
  const idolPosition = useRef(new Animated.Value(0)).current; // '아이돌' 이동
  const bomPosition = useRef(new Animated.Value(0)).current; // '봄' 이동
  const opacity = useRef(new Animated.Value(0)).current; // 이미지 투명도
  const rotation = useRef(new Animated.Value(0)).current; // 이미지 회전
  const subtitleOpacity = useRef(new Animated.Value(0)).current; // 작은 글씨 투명도

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        // '아이돌' 왼쪽 이동, '봄' 오른쪽 이동
        Animated.timing(idolPosition, {
          toValue: -30, // 왼쪽으로 이동
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bomPosition, {
          toValue: 30, // 오른쪽으로 이동
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      // 이미지 투명도 애니메이션
      Animated.timing(opacity, {
        toValue: 1, // 이미지 완전히 보이도록
        duration: 1000,
        useNativeDriver: true,
      }),
      // 이미지 회전 애니메이션
      Animated.timing(rotation, {
        toValue: 1, // 한 바퀴 회전
        duration: 1000,
        useNativeDriver: true,
      }),
      // 작은 글씨 페이드 인 애니메이션
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 애니메이션이 끝난 후 1초 뒤 LoginScreen으로 이동
      setTimeout(() => {
        navigation.replace('Login'); // LoginScreen으로 이동
      }, 1000);
    });
  }, [idolPosition, bomPosition, opacity, rotation, subtitleOpacity, navigation]);

  // 회전 애니메이션 값 설정
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // 0도에서 360도까지 회전
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* '아이돌' */}
        <Animated.Text style={[styles.text, { transform: [{ translateX: idolPosition }] }]}>
          아이돌
        </Animated.Text>
        {/* 이미지 */}
        <Animated.Image
          source={require('../assets/images/icon.png')}
          style={[
            styles.image,
            {
              opacity,
              transform: [{ rotate: rotateInterpolate }], // 회전 애니메이션 추가
            },
          ]}
        />
        {/* '봄' */}
        <Animated.Text style={[styles.text, { transform: [{ translateX: bomPosition }] }]}>
          봄
        </Animated.Text>
      </View>
      {/* 작은 글씨 */}
      <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
        No.1 덕질 어플
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // 원하는 배경색
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 40, // 텍스트 크기
    fontFamily: 'Yeongdo-Heavy',
    color: '#000', // 텍스트 색상
  },
  image: {
    width: 50, // 이미지 크기
    height: 50,
    marginHorizontal: -20, // 텍스트와 이미지 간격
  },
  subtitle: {
    marginTop: -35, // 로고 아래 여백
    marginBottom: 80,
    fontSize: 16, // 작은 글씨 크기
    fontFamily: 'NanumSquareRoundR',
    color: '#888', // 텍스트 색상 (회색)
    fontFamily: 'Yeongdo-Light',
  },
});
