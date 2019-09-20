import _ from 'lodash'
import { Icon } from 'native-base'
import Field from '@Components/Field'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { createUser } from '@Actions/user'
import { scale, ACCENT_COLOR } from '@Theme/constants'
import { Modal, View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'


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

function onTextChange(field, value, state, setState) {
  setState({
    ...Object.assign({}, state, {
      [field]: Object.assign({}, state[field], { value })
    })
  });
}

function onSubmit(users, onCreateUser, state, setState) {
  const payload = _.mapValues(state, 'value');
  const hasErrors = _.compact(_.map(_.values(payload), value => !!value)).length !== Object.keys(state).length;

  (!hasErrors && onCreateUser) && (onCreateUser(users, payload)
    .then(({ code }) => {
      console.warn('Success', code)
    })
    .catch(({ code }) => {
      console.warn('Error', e)
    })
  )
}

const RegisterModal = ({ visible, onLogin, onCreateUser, users }) => {
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
            onChange={(value) => onTextChange('name', value, state, setState)} />
          <Field
            icon="user"
            { ...state.lastName }
            onChange={(value) => onTextChange('lastName', value, state, setState)} />
          <Field
            icon="idcard"
            { ...state.identificationNumber }
            onChange={(value) => onTextChange('identificationNumber', value, state, setState)} />
          <Field
            icon="lock"
            { ...state.password }
            onChange={(value) => onTextChange('password', value, state, setState)} />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={Style.CTAContainer}
            onPress={() => onSubmit(users, onCreateUser, state, setState)}
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

const mapStateToProps = (state) => ({
  users: state.user.data
});

const mapDispatchToProps = (dispatch) => ({
  /**
   * Callback que se llama cuando el usuario presiona el CTA
   * para registrarse
   * 
   * @param {Array} users El arreglo de los usuarios registrados
   * @param {Object} payload El objecto con los datos para crear el usuario
   */
  onCreateUser: (users, payload) => {
    return dispatch(createUser(users, payload))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
