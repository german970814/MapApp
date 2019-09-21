import _ from 'lodash'
import { Icon } from 'native-base'
import Field from '@Components/Field'
import { connect } from 'react-redux'
import Alert from '@Components/Alert'
import React, { useState } from 'react'
import { createUser } from '@Actions/user'
import { scale, ACCENT_COLOR } from '@Theme/constants'
import {
  Text,
  View,
  Modal,
  Keyboard,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native'


// Se setea el estado inicial
const INITIAL_STATE = {
  name: {
    placeholder: 'Nombres',
  },
  lastName: {
    placeholder: 'Apellidos',
  },
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
    height: 'auto',
    paddingVertical: 20,
    paddingHorizontal: 20,
    minHeight: height * .7,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
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
    fontSize: scale(16),
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
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
  },
  closeContainer: {
    top: 25,
    right: 25,
    padding: 5,
    position: 'absolute',
  },
  closeIcon: {
    color: '#2B2B2B',
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
 * @param {Function} onCreateUser Acción para crear usuarios
 * @param {Object} state El estado actual del componente
 * @param {Function} setState Función para setear el estado
 * @param {Function} onLogin Función para devolver al modal de login
 * @param {Function} showErrors Función para setear si los errores deben ser visibles o no
 */
function onSubmit(users, onCreateUser, state, setState, onLogin, showErrors) {
  Keyboard.dismiss();
  const payload = _.mapValues(state, 'value');
  const hasErrors = _.compact(_.map(_.values(payload), value => !!value)).length !== Object.keys(state).length;

  showErrors(hasErrors);
  (!hasErrors && onCreateUser) && (onCreateUser(users, payload)
    .then(({ code }) => {
      if (code === 'OK') {
        onLogin();
        setState(INITIAL_STATE);
        Alert.show({
          duration: 3000,
          type: 'success',
          message: 'Se ha registrado con éxito',
        });
      }
    })
    .catch(({ code }) => {
      if (code === 'USER_EXISTS') {
        Alert.show({
          type: 'error',
          duration: 3000,
          message: 'Parece que el usuario ya existe',
        });
      }
    })
  )
}

/**
 * Componente que renderiza un modal con el formulario de registro
 * en la aplicación.
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const RegisterModal = ({ visible, onLogin, onCreateUser, users }) => {
  const [ hasErrors, showErrors ] = useState(false);
  const [ state, setState ] = useState(INITIAL_STATE);

  return <Modal transparent visible={visible} animationType="slide">
    <View style={Style.container}>
      <View style={Style.content}>
        <Text style={Style.title}>
          Regístrate
        </Text>
        <Text style={Style.subTitle}>
          Ingresa tus datos para registrate
        </Text>
        <View>
          <Field
            icon="user"
            { ...state.name }
            hasError={hasErrors}
            onChange={(value) => onTextChange('name', value, state, setState)} />
          <Field
            icon="user"
            { ...state.lastName }
            hasError={hasErrors}
            onChange={(value) => onTextChange('lastName', value, state, setState)} />
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
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={Style.CTAContainer}
            onPress={() => onSubmit(users, onCreateUser, state, setState, onLogin, showErrors)}
          >
            <Text style={Style.CTAText}>
              REGISTRARSE
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onLogin} style={Style.closeContainer}>
          <Icon name="close" type="AntDesign" style={Style.closeIcon} />
        </TouchableOpacity>
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
   * para registrarse
   * 
   * @param {Array} users El arreglo de los usuarios registrados
   * @param {Object} payload El objeto con los datos para crear el usuario
   */
  onCreateUser: (users, payload) => {
    return dispatch(createUser(users, payload))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
