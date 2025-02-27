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
        <Text style={styles.sectionTitle}>앱 사용 가이드</Text>
        <View style={styles.videoContainer}>
          {renderVideo('https://youtube.com/embed/IJ0dVZY6dqA')}
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
    marginTop: 250
  },
  sectionTitle: {
    fontSize: 25,
    fontFamily:'Bold',
    marginTop: 20,
    marginBottom: 10,
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
