import React from 'react'
import { Icon } from 'native-base'
import { scale } from '@Theme/constants'
import { View, TextInput, StyleSheet } from 'react-native'


const Style = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderColor: '#B0B0B0',
    backgroundColor: '#FFF',
  },
  inputContainer: {
    flex: .8,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    top: 0,
    left: 0,
    right: 0,
    padding: 0,
    color: '#B0B0B0',
    position: 'absolute',
    fontFamily: 'Poppins-Regular'
  },
  iconContainer: {
    flex: .2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    color: '#B0B0B0',
    fontSize: scale(23),
  }
});


/**
 * Componente para renderizar los campos con inputs dentro de la aplicación.
 * Este componente fue creado para estandarizar los estilos de los inputs dentro
 * de la aplicación.
 * 
 * @param {Object} param0 Las propiedades que recibe el componente
 */
const Field = ({
  icon,
  onChange,
  value='',
  placeholder,
  ...props,
}) => (
  <View style={Style.container}>
    <View style={Style.inputContainer}>
      <TextInput
        {...props}
        value={value}
        style={Style.input}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0" />
    </View>
    <View style={Style.iconContainer}>
      <Icon name={icon} type="AntDesign" style={Style.icon} />
    </View>
  </View>
);

export default Field;
