import _ from 'lodash'
import { connect } from 'react-redux'
import Field from '@Components/Field'
import Alert from '@Components/Alert'
import React, { useState } from 'react'
import { createAddress } from '@Actions/address'
import { scale, ACCENT_COLOR } from '@Theme/constants'
import { Modal, View, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native'

// Se setea el estado inicial
const INITIAL_STATE = {
  name: {
    icon: 'tag',
    placeholder: 'Nombre',
  }
}

const Style = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  card: {
    flex: 1,
    minHeight: 300,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  title: {
    color: '#2B2B2B',
    fontSize: scale(21),
    textAlign: 'center',
    fontFamily: 'Poppins-Bold'
  },
  CTA: {
    marginBottom: 20,
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
function onSubmit(user, onCreateAddress, state, setState, region, showErrors, callback) {
  Keyboard.dismiss();
  const payload = _.mapValues(state, 'value');
  const hasErrors = !payload.name;

  showErrors(hasErrors);
  (!hasErrors && onCreateAddress) && (onCreateAddress({ user, ...payload, ...region })
    .then(({ code }) => {
      if (code === 'OK') {
        callback();
        setState(INITIAL_STATE);
        Alert.show({
          type: 'success',
          duration: 3000,
          message: 'Se ha creado tu dirección',
        });
      }
    })
    .catch(({ code }) => {
      console.log(code)
    })
  )
}

/**
 * Componente usado para visualizar el formulario de creación de una dirección
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const ModalCreationAddress = ({ visible, onClose, region, user, createAddress }) => {
  const [ hasErrors, showErrors ] = useState(false);
  const [ state, setState ] = useState(INITIAL_STATE);

  return <Modal transparent visible={visible} animationType="fade">
    <TouchableOpacity onPress={onClose} activeOpacity={1} style={Style.overlay}>
      <TouchableOpacity activeOpacity={1} style={Style.card}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={Style.title}>
            Agregar dirección
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Field
            { ...state.name }
            hasError={hasErrors}
            onChange={(value) => onTextChange('name', value, state, setState)}
            />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            activeOpacity={.8}
            style={Style.CTA}
            onPress={() => onSubmit(user, createAddress, state, setState, region, showErrors, onClose)}
          >
            <Text style={Style.CTAText}>
              Guardar
            </Text>
          </TouchableOpacity>
      </View>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
}

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
   * Función para crear una nueva dirección
   */
  createAddress: ({ name, latitude, longitude, user }) => {
    return dispatch(createAddress({ name, latitude, longitude, user }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreationAddress);
