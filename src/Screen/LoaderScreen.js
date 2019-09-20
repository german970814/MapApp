import React from 'react'
import { scale, ACCENT_COLOR, MAIN_COLOR } from '@Theme/constants'
import { View, Image, Text, StyleSheet } from 'react-native'


const Style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: MAIN_COLOR
  },
  image: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    color: ACCENT_COLOR,
    fontSize: scale(55),
    fontFamily: 'Poppins-Bold'
  }
});

/**
 * Esta pantalla se muestra mientras se está cargando la aplicación.
 * Es el momento en que la aplicación está consultando los datos guardados.
 */
const LoaderScreen = () => (
  <View style={Style.container}>
    <Image style={Style.image} source={require('@Assets/images/background.png')} />
    <View style={Style.titleContainer}>
      <Text style={Style.title}>
        MapApp
      </Text>
    </View>
  </View>
);

export default LoaderScreen;
