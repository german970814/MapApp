import React from 'react'
import { Icon } from 'native-base'
import { ACCENT_COLOR } from '@Theme/constants'
import { TouchableOpacity, View, StyleSheet } from 'react-native'


const Style = StyleSheet.create({
  container: {
    zIndex: 1,
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  menuContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  brandContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
});

/**
 * Componenete usado para renderizar el Header de la aplicación
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const HeaderComponent = ({ onOpenDrawer }) => (
  <View style={Style.container}>
    <View style={Style.menuContainer}>
      <TouchableOpacity onPress={onOpenDrawer}>
        <Icon style={{ color: ACCENT_COLOR }} name="menuunfold" type="AntDesign" />
      </TouchableOpacity>
    </View>
    <View style={Style.brandContainer} />
    <View style={Style.optionsContainer} />
  </View>
);

export default HeaderComponent;
