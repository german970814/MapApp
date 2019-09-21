import _ from 'lodash'
import Field from '@Components/Field'
import { connect } from 'react-redux'
import Alert from '@Components/Alert'
import React, { useState } from 'react'
import { userLoginAttempt } from '@Actions/user'
import { NavigationActions } from 'react-navigation'
import { scale, ACCENT_COLOR } from '@Theme/constants'
import ModalLoaderOverlay from '@Components/ModalLoaderOverlay'
import {
  Text,
  View,
  Modal,
  Keyboard,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'

// Se setea el estado inicial
const INITIAL_STATE = {
  identificationNumber: {
    keyboardType: 'numeric',
    placeholder: 'Número de identificación',
  },
  password: {
    secureTextEntry: true,
    autoCapitalize: 'none',
    placeholder: 'Contraseña',
  }
}

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
 * Funcion encargada de guardar los datos cada vez que un input
 * sufre algún cambio
 * 
 * @param {String} field El nombre del campo a actualizar
 * @param {String} value El valor del campo a actualizar
 * @param {Object} state El objeto diccionario de datos
 * @param {Function} setState Función para setear los datos
 */
function onTextChange(field, value, state, setState) {
  setState({
    ...Object.assign({}, state, {
      [field]: Object.assign({}, state[field], { value })
    })
  });
}

/**
 * Función que se encarga de validar el formulario, y es la encargada
 * de enviar los datos a los reducer para ser guardados, también se encarga
 * de los manejos de errores del formulario y del reducer.
 * 
 * @param {Array} users Los usuarios registrados en la app
 * @param {Function} onUserTriesLogin Acción para logear usuarios
 * @param {Object} state El estado actual del componente
 * @param {Function} setState Función para setear el estado
 * @param {Function} onLogin Función para devolver al modal de login
 * @param {Function} showErrors Función para setear si los errores deben ser visibles o no
 */
function onSubmit(users, onUserTriesLogin, state, setState, showErrors, redirectToApp) {
  Keyboard.dismiss();
  const payload = _.mapValues(state, 'value');
  const hasErrors = _.compact(_.map(_.values(payload), value => !!value)).length !== Object.keys(state).length;

  showErrors(hasErrors);
  (!hasErrors && onUserTriesLogin) && (onUserTriesLogin(users, payload.identificationNumber, payload.password)
    .then(({ code }) => {
      if (code === 'OK') {
        setState(INITIAL_STATE);
        redirectToApp();
      }
    })
    .catch(({ code }) => {
      Alert.show({
        type: 'error',
        duration: 3000,
        message: code === 'INVALID_CREDENTIALS' ?
          'Credenciales inválidas' : 'Parece que ocurrió un error',
      });
    })
  )
}

/**
 * Componente usado para mostrar el formulario de login en el componente
 * principal de Authentification. Este componente se encarga de manejar la validación
 * para entrar a la aplicación
 * 
 * @param {Object} param0 Las propiedades que recibe el componente
 */
const LoginModal = ({ visible, onCreateNewAccount, users, onUserTriesLogin, redirectToApp }) => {
  const [ hasErrors, showErrors ] = useState(false);
  const [ state, setState ] = useState(INITIAL_STATE);

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
          <Field
            icon="idcard"
            hasError={hasErrors}
            { ...state.identificationNumber }
            onChange={(value) => onTextChange('identificationNumber', value, state, setState)} />
          <Field
            icon="lock"
            hasError={hasErrors}
            { ...state.password }
            onChange={(value) => onTextChange('password', value, state, setState)} />
          <TouchableOpacity onPress={onCreateNewAccount} style={Style.createAccountContainer}>
            <Text style={Style.createAccount}>
              Crear una cuenta
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            activeOpacity={.8}
            style={Style.CTAContainer}
            onPress={() => onSubmit(users, onUserTriesLogin, state, setState, showErrors, redirectToApp)}
          >
            <Text style={Style.CTAText}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
        <ModalLoaderOverlay />
      </View>
    </View>
  </Modal>
}

/**
 * Función para mapear el estado global de Redux como propiedades
 * del componente.
 * 
 * @param {Object} state El estado global de Redux
 */
const mapStateToProps = (state) => ({
  users: state.user.data
});

/**
 * Función para mapear acciones despachables para el store de Redux, las
 * cuales llegan como <Props> al componente.
 * 
 * @param {Redux.Dispatcher} dispatch Despachador de acciones de Redux
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Callback que se llama cuando el usuario presiona el CTA
   * para logearse
   * 
   * @param {Array} users El arreglo de los usuarios registrados
   * @param {String} identification La identificación única del usuario
   * @param {String} password La contraseña del usuario
   */
  onUserTriesLogin: (users, identification, password) => {
    return dispatch(userLoginAttempt(users, identification, password));
  },
  /**
   * Callback que se llama para redireccionar al usuario a la aplicación
   */
  redirectToApp: () => {
    return dispatch(NavigationActions.navigate({
      routeName: 'App'
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
