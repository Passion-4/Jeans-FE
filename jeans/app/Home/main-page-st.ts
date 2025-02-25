import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 15,
    },
    fixedHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      top: 130,
      left: 15,
      right: 15,
      backgroundColor: '#FFFFFF',
      zIndex: 10,
    },
    title: {
      fontSize: 27,
      fontFamily: 'Bold',
      marginBottom: 5,
    },
    description: {
      fontSize: 17,
      color: '#555',
      fontFamily: 'Medium',
    },
    shareButton: {
      position: 'absolute',
      top: 130,
      right: 15,
      width: 60,
      height: 60,
      borderRadius: 15,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      zIndex: 999,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    },
    shareIcon: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
      marginBottom: 5,
    },
    shareText: {
      fontSize: 15,
      fontFamily: 'Medium',
      color: '#333',
      textAlign: 'center',
    },
    friendsContainer: {
      marginTop: 220,
      marginBottom: 20,
  
    },
    friendsScrollWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'relative',
    },
    friendItem: {
      alignItems: 'center',
      marginRight: 15,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    blurred: {
      opacity: 0.3,
    },
    friendName: {
      fontSize: 14,
      fontFamily: 'Medium',
      marginTop: 5,
    },
    rightArrow: {
      position: 'absolute',
      right: -20,
      top: '50%',
      transform: [{ translateY: -12 }],
    },
    highlightedText: {
      color: '#008DBF',
      fontWeight: 'bold',
      fontFamily: 'Medium',
    },
    defaultText: {
      color: '#555',
    },
    photosContainer: { flex: 1, marginTop: 10 },
    photoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    sharedPhoto: {
      width: 160,
      height: 160,
      marginBottom: 10,
      borderRadius: 10,
  
      // 사진 border에 그림자 효과 추가
      backgroundColor: '#F5F5F5',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // 안드로이드용 그림자
    },
    groupEditButton: {
      backgroundColor: '#008DBF',
      paddingVertical: 10,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
      width: '80%',
      alignSelf: 'center',
    },
    groupEditText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontFamily: 'Medium',
    },
  });


export default styles;