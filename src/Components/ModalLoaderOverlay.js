import React from 'react'
import { connect } from 'react-redux'
import { View, Image, StyleSheet } from 'react-native'


const Style = StyleSheet.create({
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, .6)',
  },
  image: {
    width: 90,
    height: 90
  }
});

/**
 * Componente de overlay para los modales
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const ModalLoader = ({ loading }) => {
  return loading ?
    <View style={Style.overlay}>
      <Image style={Style.image} source={require('@Assets/images/loader.gif')} />
    </View> : null
};

/**
 * Función para mapear el estado global de Redux como propiedades
 * del componente.
 * 
 * @param {Object} state El estado global de Redux
 */
const mapStateToProps = (state) => ({
  loading: state.tmp.loading
});

export default connect(mapStateToProps)(ModalLoader);
