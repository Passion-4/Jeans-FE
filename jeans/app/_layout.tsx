import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ImageProvider } from './Context/ImageContext';  // ✅ ImageProvider 추가
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
    <ImageProvider>  {/* ✅ ImageProvider로 감싸줌 */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/*<Stack.Screen name="(tabs)" options={{ headerShown: false }} />*/}

          {/* 앱 시작 시 첫 화면 */}
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* 로그인 화면 */}
          <Stack.Screen name="explore" options={{ headerShown: false }} />

          {/* 아이디/비밀번호 찾기 화면 추가 */}
          <Stack.Screen name="FindAccount/Find_Account" options={{ title: '아이디/비밀번호 찾기', headerShown: false}} />

          {/* 회원가입 관련 페이지 */}
          <Stack.Screen name="Signup/Start_Signup" options={{ title: '회원가입', headerShown: false }} />
          <Stack.Screen name="Signup/Birth_Signup" options={{ title: '회원가입 - 생년월일', headerShown: false }} />
          <Stack.Screen name="Signup/Phone_Signup" options={{ title: '회원가입 - 전화번호', headerShown: false}} />
          <Stack.Screen name="Signup/Pass_Signup" options={{ title: '회원가입 - 비밀번호', headerShown: false}} />
          <Stack.Screen name="Signup/Privacy_Signup" options={{ title: '회원가입 - 개인정보', headerShown: false }} />
          <Stack.Screen name="Signup/Complete" options={{ title: '회원가입 - 완료', headerShown: false }} />
          
          {/* 사진 선택 (기본 보정) 페이지 */}
          <Stack.Screen name="Set/PhotoSelection0" options={{ title: '사진 선택 - 0', headerShown: false}} />
          <Stack.Screen name="Set/PhotoSelection1" options={{ title: '사진 선택 - 1', headerShown: false}} />
          <Stack.Screen name="Set/PhotoSelection2" options={{ title: '사진 선택 - 2', headerShown: false}} />

          {/* 메인 페이지 */}
          <Stack.Screen name="Home/Mainpage" options={{ title: '메인 페이지', headerShown: false}} />

          {/* 마이 페이지 */}
          <Stack.Screen name="MyPage/MyPage0" options={{ title: '마이 페이지 - 첫 화면', headerShown: false}} />

          {/* 보정 페이지 */}
          <Stack.Screen name="Makeup/Makeup0" options={{ title: '보정 페이지 - 첫 화면', headerShown: false}} />
          <Stack.Screen name="Makeup/BestCut0" options={{ title: '보정 페이지 - 베스트 컷', headerShown: false}} />
          <Stack.Screen name="Makeup/BestCut1" options={{ title: '보정 페이지 - 베스트 컷 사진 선택', headerShown: false}} />
          <Stack.Screen name="Makeup/BestCut2" options={{ title: '보정 페이지 - 베스트 컷 개인 사진', headerShown: false}} />
          <Stack.Screen name="Makeup/BestCut3" options={{ title: '보정 페이지 - 베스트 컷 완료', headerShown: false}} />
          <Stack.Screen name="Makeup/Edit0" options={{ title: '보정 페이지 - 기본 보정 완료', headerShown: false}} />
          <Stack.Screen name="Makeup/Edit1" options={{ title: '보정 페이지 - 추가 보정 선택', headerShown: false}} />
          <Stack.Screen name="Makeup/Edit2-0" options={{ title: '보정 페이지 - 동안', headerShown: false}} />
          <Stack.Screen name="Makeup/Edit2-1" options={{ title: '보정 페이지 - 새치', headerShown: false}} />
          <Stack.Screen name="Makeup/Edit2-2" options={{ title: '보정 페이지 - 몸매', headerShown: false}} />
          <Stack.Screen name="Makeup/Edit_PhotoSelec" options={{ title: '보정 페이지 - 사진 선택', headerShown: false}} />
          <Stack.Screen name="Makeup/MakeUp_Finish" options={{ title: '보정 페이지 - 사진 저장하기', headerShown: false}} />

          {/* 공유 관련 페이지 */}
          <Stack.Screen name="Share/Share_complete" options={{ title: '공유 완료', headerShown: false}} />
          <Stack.Screen name="Share/Share0" options={{ title: '공유 첫 화면', headerShown: false}} />
          <Stack.Screen name="Share/Share1" options={{ title: '공유 선택', headerShown: false}} />
          <Stack.Screen name="Share/Share2" options={{ title: '공유 방식 선택', headerShown: false}} />
          <Stack.Screen name="Share/Share_makegroup0" options={{ title: '그룹 만들기', headerShown: false}} />
          <Stack.Screen name="Share/Share_makegroup1" options={{ title: '그룹 만들기 완료', headerShown: false}} />
          <Stack.Screen name="Share/Share_checkgroup" options={{ title: '그룹 확인', headerShown: false}} />

          {/* not found */}
          <Stack.Screen name="+not-found" />

        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </ImageProvider>  
  );
}
