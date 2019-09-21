import React, { useState } from 'react'
import { MAIN_COLOR } from '@Theme/constants'
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

/**
 * Componente usado para renderizar la pantalla donde
 * se encuentra el formulario de Login y el formulario de
 * Registro.
 */
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
