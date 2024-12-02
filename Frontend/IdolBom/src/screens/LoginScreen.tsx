import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { KAKAO_REST_API_KEY, REDIRECT_URI, BACKEND_URL } from '@env';
import CookieManager from '@react-native-cookies/cookies';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const CLIENT_ID = KAKAO_REST_API_KEY;
  const REDIRECT_URL = REDIRECT_URI;

  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const clearWebViewCookiesAndCache = async () => {
    try {
      await CookieManager.clearAll();
      console.log('WebView cookies cleared');
    } catch (error) {
      console.error('Error clearing WebView cookies: ', error);
    }
  };

  const handleLogin = async () => {
    console.log('Login Button Pressed. Clearing cookies and cache. Showing WebView...');
    await clearWebViewCookiesAndCache();
    setShowWebView(true);
  };

  const handleNavigationStateChange = (event) => {
    if (event.url.startsWith(REDIRECT_URL)) {
      const urlParams = new URLSearchParams(event.url.split('?')[1]);
      const code = urlParams.get('code');
      console.log('Authorization Code:', code);

      if (code) {
        setLoading(true);

        // 인가 코드를 백엔드로 전달
        fetch(`${BACKEND_URL}/auth/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.code === 'SU') {
              console.log('Login Successful:', data);

              // Home 화면으로 이동
              navigation.navigate('Home', {
                userInfo: data.userInfo, // userInfo 객체 전달
              });
            } /* else {
              Alert.alert('로그인 실패', data.message || '알 수 없는 오류');
            } */
          })
          /* .catch((error) => {
            console.error('Fetch Error:', error);
            Alert.alert('로그인 실패', '백엔드 요청 중 문제가 발생했습니다.');
          })
          .finally(() => {
            setLoading(false);
            setShowWebView(false);
          }); */
      }
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
            uri: `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onNavigationStateChange={handleNavigationStateChange}
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
    color: '#000',
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
