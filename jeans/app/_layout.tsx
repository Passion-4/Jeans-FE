import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Bold: require('../assets/fonts/Pretendard-Bold.ttf'),
    ExtraLight: require('../assets/fonts/Pretendard-ExtraLight.ttf'),
    ExtraBold: require('../assets/fonts/Pretendard-ExtraBold.ttf'),
    Light: require('../assets/fonts/Pretendard-Light.ttf'),
    Medium: require('../assets/fonts/Pretendard-Medium.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
  {/*<Stack.Screen name="(tabs)" options={{ headerShown: false }} />*/}

  {/* 앱 시작 시 첫 화면 */}
  <Stack.Screen name="index" options={{ headerShown: false }} />

{/* 로그인 화면 */}
<Stack.Screen name="explore" options={{ headerShown: false }} />

{/* 아이디/비밀번호 찾기 화면 추가 */}
<Stack.Screen name="FindAccount/Find_Account" options={{ title: '아이디/비밀번호 찾기', headerShown: false}} />

  {/* 회원가입 관련련 페이지 */}
  <Stack.Screen name="Signup/Start_Signup" options={{ title: '회원가입', headerShown: false }} />
  <Stack.Screen name="Signup/Birth_Signup" options={{ title: '회원가입 - 생년월일', headerShown: false }} />
  <Stack.Screen name="Signup/Phone_Signup" options={{ title: '회원가입 - 전화번호', headerShown: false}} />
  <Stack.Screen name="Signup/ID_Signup" options={{ title: '회원가입 - 아이디', headerShown: false }} />
  <Stack.Screen name="Signup/Pass_Signup" options={{ title: '회원가입 - 비밀번호', headerShown: false}} />
  <Stack.Screen name="Signup/Privacy_Signup" options={{ title: '회원가입 - 개인정보', headerShown: false }} />
  <Stack.Screen name="Signup/Complete" options={{ title: '회원가입 - 완료', headerShown: true }} />
  
  {/* not found */}
  <Stack.Screen name="+not-found" />

</Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
