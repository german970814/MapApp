import React, { useState } from 'react'
import { scale, MAIN_COLOR } from '@Theme/constants'
import { View, Image, Dimensions, StyleSheet } from 'react-native'

import LoginModal from './Login'
import RegisterModal from './Register'


const { height } = Dimensions.get('window');

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
  },
  imageContainer: {
    width: '100%',
    height: height * .4
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

// const ModalLoader = () => (
//   <View style={{
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     position: 'absolute',
//     alignItems: 'center',
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255, 255, 255, .6)',
//   }}>
//     <Image style={{ width: 90, height: 90 }} source={require('@Assets/images/loader.gif')} />
//   </View>
// );

const IntroScreen = () => {
  const [ isLogin, setIsLogin ] = useState(true);

  return (
    <View style={Style.container}>
      <View style={Style.imageContainer}>
        <Image style={Style.image} source={require('@Assets/images/background.png')} />
      </View>
      <LoginModal
        visible={isLogin}
        onCreateNewAccount={() => setIsLogin(!isLogin)} />
      <RegisterModal
        visible={!isLogin}
        onLogin={() => setIsLogin(!isLogin)} />
    </View>
  );
}

export default IntroScreen;
