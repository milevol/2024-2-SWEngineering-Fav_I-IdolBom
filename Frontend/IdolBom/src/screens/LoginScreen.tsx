import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';


// @env에서 환경 변수를 가져옴
import { KAKAO_REST_API_KEY, REDIRECT_URI } from '@env';

const LoginScreen = () => {
  const CLIENT_ID = KAKAO_REST_API_KEY; // .env에서 가져온 값
  const REDIRECT_URL = REDIRECT_URI;   // .env에서 가져온 값

  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Login Button Pressed. Showing WebView...");
    setShowWebView(true); // WebView를 보여줌
  };

  const handleWebViewMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data); // WebView에서 전달된 JSON 데이터 파싱
      console.log("Message from WebView: ", data);

      // 서버 응답 처리: code === "SU" 일 경우 HomeScreen으로 이동
      if (data.code === "SU") {
        console.log("Success! Navigating to HomeScreen...");
        navigation.navigate('Home', { authCode: data.authCode }); // HomeScreen으로 이동
      } else {
        Alert.alert("로그인 실패", `백엔드 오류: ${data.message || "응답 데이터 없음"}`);
      }
    } catch (error) {
      console.error("Error parsing WebView message: ", error);
      Alert.alert("로그인 실패", "WebView 데이터 처리 중 문제가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      {showWebView ? (
        <WebView
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`,
          }}
          onMessage={handleWebViewMessage} // WebView에서 메시지 처리
          startInLoadingState={true}
          injectedJavaScript={`
            // WebView 내부에서 데이터를 전송
            if (window.location.href.includes("${REDIRECT_URI}")) {
              const response = {
                code: "SU",
                message: "Authorization Code Received",
                authCode: "exampleAuthCode"
              };
              window.ReactNativeWebView.postMessage(JSON.stringify(response));
            }
          `}
        />
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.title}>카카오 로그인</Text>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#FFEB00',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
