import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
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

  const handleNavigationStateChange = (event: any) => {
    if (event.url.startsWith(REDIRECT_URL)) {
      const urlParams = new URLSearchParams(event.url.split('?')[1]);
      const code = urlParams.get('code');
      console.log('Authorization Code:', code);

      if (code) {
        setLoading(true);

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
              navigation.navigate('Main', { screen: 'Home' });

             /*  navigation.navigate('Home', {
                userInfo: data.userInfo,
              }); */
            }
          })
          .catch((error) => {
            console.error('Fetch Error:', error);
          })
          .finally(() => {
            setLoading(false);
            setShowWebView(false);
          });
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
          <Image source={require('../assets/images/IdolBomLogo.png')} style={styles.logo} />
          <TouchableOpacity onPress={handleLogin}>
            <Image
              source={require('../assets/images/kakao_login_large_narrow.png')}
              style={styles.kakaoLoginButton}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: -50,
    resizeMode: 'contain',
  },
  kakaoLoginButton: {
    width: 343,
    height: 70,
    borderRadius : 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
      borderRadius: 20, // Image의 borderRadius는 imageStyle에서 처리
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
