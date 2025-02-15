import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';

export default function UserGuideScreen() {
  const renderVideo = (url: string) => {
    if (Platform.OS === 'web') {
      return (
        <iframe
          width="100%"
          height="200"
          src={url}
          title="YouTube Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else {
      return <WebView source={{ uri: url }} style={styles.video} />;
    }
  };

  return (
    <View style={styles.container}>
      <TopNavBar />

      <ScrollView contentContainerStyle={styles.content}>
        {/* 보정 기능 사용법 */}
        <Text style={styles.sectionTitle}>보정 기능 사용법</Text>
        <View style={styles.videoContainer}>
          {renderVideo('https://www.youtube.com/embed/6Wb3eAeO4vw')}
        </View>

        {/* 공유 기능 사용법 */}
        <Text style={styles.sectionTitle}>공유 기능 사용법</Text>
        <View style={styles.videoContainer}>
          {renderVideo('https://www.youtube.com/embed/akNQoGRV4w4')}
        </View>
      </ScrollView>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 100
  },
  sectionTitle: {
    fontSize: 30,
    fontFamily:'Bold',
    marginTop: 30,
    marginBottom: 15,
  },
  videoContainer: {
    height: 200, // 동영상 높이 조정
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  video: {
    flex: 1,
  },
});
