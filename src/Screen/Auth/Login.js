import React from 'react'
import Field from '@Components/Field'
import { connect } from 'react-redux'
import { scale, ACCENT_COLOR } from '@Theme/constants'
import {
  Text,
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

const { height } = Dimensions.get('window');

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: height * .6,
    borderTopLeftRadius: 40,
    backgroundColor: '#FFF',
    borderTopRightRadius: 40,
  },
  title: {
    color: '#2B2B2B',
    fontSize: scale(26),
    textAlign: 'center',
    fontFamily: 'Poppins-Bold'
  },
  subTitle: {
    color: '#B0B0B0',
    textAlign: 'center',
    fontSize: scale(16),
    fontFamily: 'Poppins-Regular'
  },
  createAccount: {
    color: '#4a9dca',
    fontSize: scale(13),
    fontFamily: 'Poppins-Regular'
  },
  createAccountContainer: {
    paddingVertical: 5,
    backgroundColor: 'transparent',
  },
  CTAContainer: {
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 60,
    backgroundColor: ACCENT_COLOR
  },
  CTAText: {
    color: '#FFF',
    fontSize: scale(18),
    textAlign: 'center',
    fontFamily: 'Poopins-SemiBold'
  }
});

/**
 * Componente usado para mostrar el formulario de login en el componente
 * principal de Authentification. Este componente se encarga de manejar la validación
 * para entrar a la aplicación
 * 
 * @param {Object} param0 Las propiedades que recibe el componente
 */
const LoginModal = ({ visible, onCreateNewAccount }) => {
  return <Modal transparent visible={visible} animationType="slide">
    <View style={Style.container}>
      <View style={Style.content}>
        <Text style={Style.title}>
          Bienvenido
        </Text>
        <Text style={Style.subTitle}>
          Ingresa para continuar
        </Text>
        <View>
          <Field icon="idcard" placeholder={'Email'} value={''} />
          <Field icon="lock" placeholder={'Contraseña'} value={''} />
          <TouchableOpacity onPress={onCreateNewAccount} style={Style.createAccountContainer}>
            <Text style={Style.createAccount}>
              Crear una cuenta
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity activeOpacity={.8} style={Style.CTAContainer}>
            <Text style={Style.CTAText}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
        {/* <ModalLoader /> */}
      </View>
    </View>
  </Modal>
}

export default connect()(LoginModal);
