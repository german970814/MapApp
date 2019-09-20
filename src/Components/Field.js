import { Icon } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { MAIN_COLOR, ACCENT_COLOR } from '@Theme/constants';


const Field = ({ placeholder, icon, value, onChange }) => {
  return <View style={{
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderColor: '#B0B0B0',
    backgroundColor: '#FFF',
  }}>
    <View style={{
      flex: .8,
      width: '100%',
      justifyContent: 'center',
    }}>
      {/* <Text style={{
        marginLeft: 5,
        color: '#B0B0B0',
        fontFamily: 'Poppins-Regular'
      }}>
        { !value ? placeholder : '' }
      </Text> */}
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#B0B0B0"
        style={{
          left: 0,
          right: 0,
          top: 0,
          padding: 0,
          color: '#B0B0B0',
          position: 'absolute',
          fontFamily: 'Poppins-Regular'
        }} />
    </View>
    <View style={{
      flex: .2,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon name={icon} type="AntDesign" style={{
        fontSize: 23,
        color: '#B0B0B0',
      }} />
    </View>
  </View>
}

export default Field;
