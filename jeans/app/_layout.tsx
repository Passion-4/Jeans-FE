import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ImageProvider } from './Context/ImageContext';  // ImageProvider 추가
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Bold: require('../assets/fonts/Pretendard-Bold.ttf'),
    ExtraLight: require('../assets/fonts/Pretendard-ExtraLight.ttf'),
    ExtraBold: require('../assets/fonts/Pretendard-ExtraBold.ttf'),
    Light: require('../assets/fonts/Roboto-Light.ttf'),
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
    <ImageProvider>  {/* ImageProvider로 감싸줌 */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          {/* 앱 시작 시 첫 화면 */}
          <Stack.Screen name="index" options={{ headerShown: false }} />

          {/* 로그인 화면 */}
          <Stack.Screen name="explore" options={{ headerShown: false }} />

          {/* 아이디/비밀번호 찾기 화면 추가 */}
          <Stack.Screen name="FindAccount/find-account" options={{ title: '아이디/비밀번호 찾기', headerShown: false}} />

          {/* 회원가입 관련 페이지 */}
          <Stack.Screen name="SignUp/signup-name" options={{ title: '회원가입', headerShown: false }} />
          <Stack.Screen name="SignUp/signup-birth" options={{ title: '회원가입 - 생년월일', headerShown: false }} />
          <Stack.Screen name="SignUp/signup-phone" options={{ title: '회원가입 - 전화번호', headerShown: false}} />
          <Stack.Screen name="SignUp/signup-password" options={{ title: '회원가입 - 비밀번호', headerShown: false}} />
          <Stack.Screen name="SignUp/signup-privacy" options={{ title: '회원가입 - 개인정보', headerShown: false }} />
          <Stack.Screen name="SignUp/signup-complete" options={{ title: '회원가입 - 완료', headerShown: false }} />
          
          {/* 사진 선택 (기본 보정) 페이지 */}
          <Stack.Screen name="Set/photo-selection0" options={{ title: '사진 선택 - 0', headerShown: false}} />
          <Stack.Screen name="Set/photo-selection1" options={{ title: '사진 선택 - 1', headerShown: false}} />
          <Stack.Screen name="Set/photo-selection2" options={{ title: '사진 선택 - 2', headerShown: false}} />

          {/* 메인 페이지 */}
          <Stack.Screen name="Home/main-page" options={{ title: '메인 페이지', headerShown: false}} />
          <Stack.Screen name="Home/group-img-edit" options={{ title: '메인 페이지 - 그룹 프로필 사진 수정', headerShown: false}} />
          <Stack.Screen name="Home/photo-detail" options={{ title: '메인 페이지 - 사진 상세 정보 및 대화', headerShown: false}} />
          <Stack.Screen name="Home/Search" options={{ title: '메인 페이지 - 검색', headerShown: false}} />

          {/* 보정  */}
          <Stack.Screen name="MakeUp/select-function" options={{ title: '보정 페이지 - 첫 화면', headerShown: false}} />
          <Stack.Screen name="MakeUp/bestcut-select-img" options={{ title: '보정 페이지 - 베스트 컷', headerShown: false}} />
          <Stack.Screen name="MakeUp/bestcut-check-img" options={{ title: '보정 페이지 - 베스트 컷 사진 선택', headerShown: false}} />
          <Stack.Screen name="MakeUp/bestcut-choose" options={{ title: '보정 페이지 - 베스트 컷 개인 사진', headerShown: false}} />
          <Stack.Screen name="MakeUp/basic-makeup" options={{ title: '보정 페이지 - 베스트 컷 완료', headerShown: false}} />
          <Stack.Screen name="MakeUp/advanced-makeup" options={{ title: '보정 페이지 - 기본 보정 완료', headerShown: false}} />
          <Stack.Screen name="MakeUp/advanced-option" options={{ title: '보정 페이지 - 추가 보정 선택', headerShown: false}} />
          <Stack.Screen name="MakeUp/advanced-younger" options={{ title: '보정 페이지 - 동안', headerShown: false}} />
          <Stack.Screen name="MakeUp/advanced-grayhair" options={{ title: '보정 페이지 - 새치', headerShown: false}} />
          <Stack.Screen name="MakeUp/advanced-body" options={{ title: '보정 페이지 - 몸매', headerShown: false}} />
          <Stack.Screen name="MakeUp/edit-select-img" options={{ title: '보정 페이지 - 사진 선택', headerShown: false}} />
          <Stack.Screen name="MakeUp/makeup-finish" options={{ title: '보정 페이지 - 사진 보정 완료', headerShown: false}} />
          <Stack.Screen name="MakeUp/makeup-download" options={{ title: '보정 페이지 - 사진 저장', headerShown: false}} />

          {/* 공유 관련 페이지 */}
          <Stack.Screen name="Share/share-complete" options={{ title: '공유 완료', headerShown: false}} />
          <Stack.Screen name="Share/share-select-img" options={{ title: '공유 첫 화면', headerShown: false}} />
          <Stack.Screen name="Share/share-select-friend" options={{ title: '공유 선택', headerShown: false}} />
          <Stack.Screen name="Share/share-select-target" options={{ title: '공유 방식 선택', headerShown: false}} />
          <Stack.Screen name="Share/share-make-group" options={{ title: '그룹 만들기', headerShown: false}} />
          <Stack.Screen name="Share/share-make-group-complete" options={{ title: '그룹 만들기 완료', headerShown: false}} />
          <Stack.Screen name="Share/share-to-group" options={{ title: '그룹 확인', headerShown: false}} />
          <Stack.Screen name="Share/share-voice" options={{ title: '공유 - 음성 메시지 첨부', headerShown: false}} />

          {/* 마이페이지 */}
          <Stack.Screen name="MyPage/my-page" options={{ title: '내 정보', headerShown: false}} />
          <Stack.Screen name="MyPage/edit-info" options={{ title: '정보 수정', headerShown: false}} />
          <Stack.Screen name="MyPage/connect" options={{ title: '친구 추가', headerShown: false}} />
          <Stack.Screen name="MyPage/word-size" options={{ title: '글자 크기기', headerShown: false}} />
          <Stack.Screen name="MyPage/manual" options={{ title: '사용법', headerShown: false}} />
          <Stack.Screen name="MyPage/quit" options={{ title: '탈퇴하기', headerShown: false}} />    

          {/* 친구 */}
          <Stack.Screen name="Friend/list" options={{ title: '친구 목록', headerShown: false}} />
          <Stack.Screen name="Friend/send-search" options={{ title: '친구 요청 보내기', headerShown: false}} />
          <Stack.Screen name="Friend/send-search-result" options={{ title: '친구 찾기', headerShown: false}} />
          <Stack.Screen name="Friend/send-complete" options={{ title: '요청 완료', headerShown: false}} />
          <Stack.Screen name="Friend/receive" options={{ title: '친구 요청 받기', headerShown: false}} />
          <Stack.Screen name="Friend/delete" options={{ title: '친구 삭제', headerShown: false}} />
          <Stack.Screen name="Friend/make-relation" options={{ title: '친구 삭제', headerShown: false}} />
          <Stack.Screen name="Friend/relation-complete" options={{ title: '친구 삭제', headerShown: false}} />

          {/* 프로필 */}
          <Stack.Screen name="Profile/name" options={{ title: '이름 바꾸기', headerShown: false}} />
          <Stack.Screen name="Profile/phonenum" options={{ title: '전화번호 바꾸기', headerShown: false}} />
          <Stack.Screen name="Profile/image" options={{ title: '이미지 바꾸기', headerShown: false}} />
          <Stack.Screen name="ChangePassword/origin-password" options={{ title: '비밀번호 바꾸기', headerShown: false}} />
          <Stack.Screen name="ChangePassword/new-password" options={{ title: '새로운 비밀번호 설정하기', headerShown: false}} />
          <Stack.Screen name="ChangePassword/change-password-complete" options={{ title: '비밀번호 변경 완료', headerShown: false}} />

          {/* 좋은 글귀 */}
          <Stack.Screen name="Quote/quote-select-img" options={{ title: '좋은 글귀  - 갤러리/기본 이미지 선택', headerShown: false}} />
          <Stack.Screen name="Quote/quote-select-basic-img" options={{ title: '좋은 글귀  - 기본 이미지 선택', headerShown: false}} />
          <Stack.Screen name="Quote/quote-select-img1" options={{ title: '좋은 글귀  - 기본 이미지 선택', headerShown: false}} />
          <Stack.Screen name="Quote/quote-select-word-gallery" options={{ title: '좋은 글귀  - 갤러리  - 글귀 선택', headerShown: false}} />
          <Stack.Screen name="Quote/quote-select-word-basic" options={{ title: '좋은 글귀  - 기본 이미지  - 글귀 선택', headerShown: false}} />
          <Stack.Screen name="Quote/quote-complete-basic" options={{ title: '좋은 글귀  - 갤러리 - 생성 완료', headerShown: false}} />
          <Stack.Screen name="Quote/quote-complete-gallery" options={{ title: '좋은 글귀  - 기본 이미지 - 생성 완료', headerShown: false}} />
          

          {/* not found */}
          <Stack.Screen name="+not-found" />

        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </ImageProvider>  
  );
}
