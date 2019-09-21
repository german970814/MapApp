import { connect } from 'react-redux'
import { MAIN_COLOR } from '@Theme/constants'
import React, { useState, useEffect } from 'react'
import { setCurrentPositionAddress } from '@Actions/address'
import { View, Image, Dimensions, StyleSheet } from 'react-native'
import { getCoordinatesFromCurrentLocation } from '@Utils/location'

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
const IntroScreen = ({ setCurrentPositionAddress }) => {
  const [ isLogin, setIsLogin ] = useState(true);

  useEffect(() => {
    getCoordinatesFromCurrentLocation()
      .then(setCurrentPositionAddress)
      .catch(() => {});
  }, []);

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

/**
 * Función para mapear acciones despachables para el store de Redux, las
 * cuales llegan como <Props> al componente.
 * 
 * @param {Redux.Dispatcher} dispatch Despachador de acciones de Redux
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Funcion para obtener y guardar las coordenadas del usuario
   * 
   * @param {Object} coords Las coordenadas a guardar del usuario
   */
  setCurrentPositionAddress: ({ latitude, longitude }) => {
    return dispatch(setCurrentPositionAddress({ latitude, longitude }))
  }
});

export default connect(null, mapDispatchToProps)(IntroScreen);
