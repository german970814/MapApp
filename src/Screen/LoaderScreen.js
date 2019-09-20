import React from 'react';
import { ACCENT_COLOR } from '@Theme/constants';
import { View, Image, Text } from 'react-native';
import MainContainer from '@Components/Containers/Main';


export default class LoaderScreen extends React.Component {
  render() {
    return <MainContainer showHeader={false}>
      <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20 }}>
        <Image style={{
          flex: 1,
          width: '100%',
          alignSelf: 'center',
          resizeMode: 'contain',
        }} source={require('@Assets/images/logo.png')} />
        <View style={{
          justifyContent: 'center'
        }}>
          <Text style={{
            fontSize: 55,
            color: ACCENT_COLOR,
            fontFamily: 'Poppins-Bold'
          }}>
            MapApp
          </Text>
        </View>
      </View>
    </MainContainer>
  }
}
