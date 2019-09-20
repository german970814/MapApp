import React from 'react'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { MAIN_COLOR, ACCENT_COLOR } from '@Theme/constants'
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native'


const Style = StyleSheet.create({
  container: {
    height: 60,
    // maxHeight: 80,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-around'
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

const HeaderComponent = ({ style, onOpenDrawer, dispatch, MenuComponent=null }) => {
  return <View style={[Style.container, style]}>
    <View style={Style.menuContainer}>
      <TouchableOpacity onPress={() => {
        !!onOpenDrawer ? onOpenDrawer() : dispatch(NavigationActions.back());
      }}>
        <Icon style={{ color: MAIN_COLOR }} name={!!onOpenDrawer ? 'menuunfold' : 'arrowleft'} type="AntDesign" />
      </TouchableOpacity>
    </View>
    <View style={Style.brandContainer}>
      {/* <Image style={{
        height: 50,
        width: '100%',
        resizeMode: 'center',
      }} source={require('@Asset/images/brand.png')} /> */}
    </View>
    <View style={Style.optionsContainer}>
      { !!MenuComponent && <MenuComponent /> }
    </View>
  </View>
}

export default connect()(HeaderComponent);
