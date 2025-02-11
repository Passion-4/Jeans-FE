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
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

  {/* 회원가입 페이지 추가 */}
  <Stack.Screen name="Signup/Start_Signup" options={{ title: '회원가입', headerShown: true }} />

  {/* 생년월일 입력 화면 추가 */}
  <Stack.Screen name="Signup/Birth_Signup" options={{ title: '회원가입 - 생년월일', headerShown: true }} />

  <Stack.Screen name="+not-found" />
</Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
