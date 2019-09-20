import React from 'react';
import { Icon } from 'native-base';
import Header from '@Components/Header';
import { ImageBackground, View } from 'react-native';


const MainContainer = ({ children, showHeader=true, headerStyle}) => ( 
  <ImageBackground source={require('@Assets/images/pattern.png')} style={{ flex: 1 }}>
    { showHeader && <Header style={headerStyle} /> }
    { children }
  </ImageBackground>
);

export default MainContainer;
