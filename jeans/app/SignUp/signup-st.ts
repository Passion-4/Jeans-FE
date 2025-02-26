import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 35,
      marginBottom: 40,
      fontFamily: 'Bold',
    },
    title2: {
        fontSize: 35,
        marginBottom: 40,
        fontFamily: 'Bold',
        marginTop:50
      },
    label: {
      alignSelf: 'flex-start',
      marginLeft: 5,
      fontSize: 20,
      marginTop: 10,
      marginBottom: 15,
      fontFamily: 'Medium',
      fontWeight:"bold"
    },
    input: {
      width: '100%',
      height: 55,
      borderColor: '#CCCCCC',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      backgroundColor: '#F8F8F8',
      marginBottom: 15,
      fontFamily: 'Medium',
      fontSize: 18,
    },
    micContainer: {
      width: '100%', 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:15,
      marginBottom:20
    },
    pulseCircle: {
      position: 'absolute',
      width: '84%',
      height: 85,
      borderRadius: 100,
      backgroundColor: '#FFE2E5',
    },
    recordButton: {
      width: '80%',
      height: 60,
      backgroundColor: '#FF616D',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      flexDirection: 'row',
      marginBottom: 10,
      marginTop: 10,
    },
    recordButtonText: {
      color: 'white',
      marginLeft: 10,
      fontFamily: 'Medium',
      fontSize: 21,
    },
    recordingNotice: {
      fontSize: 20,
      color: 'black',
      fontFamily: 'Medium',
      marginBottom: 30,
    },
    QText: {
        fontSize: 20,
        fontFamily: "Bold",
        marginBottom: 10,
        marginTop:-20,
        alignSelf: "flex-start",
      },
      infoText: {
        fontSize: 14,
        fontFamily: "Medium",},
        inputContainer: {
            width: "100%",
          },
          infoText2: {
            fontSize: 16,
            color: '#FF616D',
            fontFamily: 'Medium',
            alignSelf: 'flex-start',
            marginBottom: 10,
          },
  });

export default styles;