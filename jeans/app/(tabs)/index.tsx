import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* App Icon */}
      <Image source={require('@/assets/images/main_logo.png')} style={styles.icon} />

      {/* Subtitle */}
      <ThemedText type="subtitle" style={styles.subtitle}>
        청춘은 바로 지금
      </ThemedText>

      {/* Title */}
      <ThemedText type="title" style={styles.title}>
        청바지
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008DBF', // Match the blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 80, // Adjust size to match image
    height: 80,
    marginBottom: 20, // Add spacing below icon
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF', // White text
    marginBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFC107', // Yellow text
  },
});
