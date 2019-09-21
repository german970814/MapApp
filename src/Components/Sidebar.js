import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '@Actions/user'
import { scale, ACCENT_COLOR } from '@Theme/constants'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  userCardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    width: 100,
    height: 100,
    elevation: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ACCENT_COLOR,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'contain',
  },
  name: {
    marginTop: 10,
    color: '#2B2B2B',
    fontSize: scale(26),
    textAlign: 'center',
    fontFamily: 'Poppins-Bold'
  },
  logoutContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  logoutButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#D1D1D1',
  },
  logoutText: {
    fontSize: 16,
    color: '#D1D1D1',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold'
  }
});

/**
 * Componente usado para renderizar el Sidebar en la aplicación
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const SidebarComponent = ({ user, logoutUser }) => (
  <View style={Style.container}>
    <View style={Style.userCardContainer}>
      <View style={Style.imageContainer}>
        <Image
          style={Style.image}
          source={require('@Assets/images/user.png')} />
      </View>
      <Text style={Style.name}>
        { `Hola ${_.capitalize(user.name)}!` }
      </Text>
    </View>
    <View style={Style.logoutContainer}>
      <TouchableOpacity onPress={logoutUser} activeOpacity={.9} style={Style.logoutButton}>
        <Text style={Style.logoutText}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

/**
 * Función para mapear el estado global de Redux como propiedades
 * del componente.
 * 
 * @param {Object} state El estado global de Redux
 */
const mapStateToProps = (state) => ({
  user: state.user.loggedUser
});

/**
 * Función para mapear acciones despachables para el store de Redux, las
 * cuales llegan como <Props> al componente.
 * 
 * @param {Redux.Dispatcher} dispatch Despachador de acciones de Redux
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Función para hacer logout de la sesión del usuario
   */
  logoutUser: () => {
    return dispatch(logoutUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);