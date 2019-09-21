import { Icon } from 'native-base'
import { scale, MAIN_COLOR } from '@Theme/constants'
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { StyleSheet, Modal, TouchableOpacity, Text, View } from 'react-native'


const Style = StyleSheet.create({
  backdrop: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent'
  },
  iconContainer: {
    zIndex: 1,
    elevation: 16,
    borderRadius: 50,
    width: scale(50),
    height: scale(50),
    bottom: scale(-25),
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  icon: {
    color: MAIN_COLOR,
    fontSize: scale(26),
  },
  textContainer: {
    width: '100%',
    marginTop: 20,
    elevation: 16,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    minHeight: scale(60),
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  text: {
    color: '#3A3A3A',
    fontSize: scale(13),
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  }
});

/**
 * Este componente se usa para mostrar mostrar los mensajes al usuario
 * durante una duración determinada. El mensaje tiende a desaparecer despues
 * de un tiempo
 * 
 * @param {Object} props Las propiedades para el componente
 * @param {React.ReactNode} ref El objeto de referencia
 */
const AlertModal = ({}, ref) => {
  const [ message, setMessage ] = useState('');
  const [ icon, setIcon] = useState('exclamationcircleo');
  const [ isVisible, setVisibility ] = useState(false);

  useImperativeHandle(ref, () => ({
    /**
     * Cuando se define una instancia raiz, entonces se puede llamar
     * a la alerta desde este método. De esta forma, se vuelve el objeto
     * para uso imperativo, sin necesidad de renderizarlo en cada vista que se use
     */
    showAlert: ({ message: customMessage, duration=3000, type='info' }) => {
      setVisibility(true);
      setMessage(customMessage);

      switch(type) {
        case 'success':
          setIcon('checkcircleo');
          break;
        case 'error':
          setIcon('closecircleo');
          break;
        case 'info':
          setIcon('exclamationcircleo');
          break;
        default:
          setIcon('exclamationcircleo');
      }

      AlertModal._timeout = setTimeout(() => {
        setVisibility(false);
      }, duration);
    }
  }));

  return <Modal
    transparent
    visible={isVisible}
    animationType="fade"
    onRequestClose={() => {
      setVisibility(false);
      AlertModal._timeout && clearTimeout(AlertModal._timeout);
    }}
  >
    <TouchableOpacity acitveOpacity={1} style={Style.backdrop} onPress={() => {
      setVisibility(false);
      AlertModal._timeout && clearTimeout(AlertModal._timeout);
    }}>
      <TouchableOpacity activeOpacity={1} style={{
        alignItems: 'center'
      }}>
        <View style={Style.iconContainer}>
          <Icon style={Style.icon} name={icon} type="AntDesign" />
        </View>
        <View style={Style.textContainer}>
          <Text style={Style.text}>
            { message }
          </Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
};

// https://reactjs.org/docs/hooks-reference.html#useimperativehandle
const AlertModalWithForwardRef = forwardRef(AlertModal);

// Define the attribute to alert instance
AlertModalWithForwardRef.alertInstance = null;

/**
 * Llama el método .showAlert() de la instancia padre
 * 
 * @param {Object} config El objeto de configuración
 */
AlertModalWithForwardRef.show = ({ ...config }) => {
  return AlertModalWithForwardRef.alertInstance &&
    AlertModalWithForwardRef.alertInstance.showAlert(config);
}

export default AlertModalWithForwardRef;
