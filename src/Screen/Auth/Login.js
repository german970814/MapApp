import { Icon } from 'native-base';
import Field from '@Components/Field';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { NavigationActions } from 'react-navigation';
import { MAIN_COLOR, ACCENT_COLOR } from '@Theme/constants';
import {
  TouchableOpacity, KeyboardAvoidingView, View, Text, Image, ImageBackground,
} from 'react-native';

// key

const mapDispatchTopProps = (dispatch) => ({
  redirectToRegisterPage: () => {
    return dispatch(NavigationActions.navigate({
      routeName: 'Register'
    }))
  }
});

export default connect(null, mapDispatchTopProps)(
  class LoginScreen extends React.Component {
    state = {}

    render() {
      return <ImageBackground source={require('@Assets/images/pattern.png')} style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
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
          <View style={{ flex: 1, paddingHorizontal: 40 }}>
            <View>
              <Field placeholder={'Username'} />
              <Field placeholder={'Password'} />
            </View>
            <View style={{
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
              <TouchableOpacity style={{
                elevation: 5,
                borderRadius: 30,
                paddingVertical: 10,
                paddingHorizontal: 80,
                backgroundColor: ACCENT_COLOR,
              }}>
                <Text style={{
                  color: '#FFF',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular'
                }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={this.props.redirectToRegisterPage} style={{
              marginTop: 30
            }}>
              <Text style={{
                color: MAIN_COLOR,
                textAlign: 'center',
                fontFamily: 'Poppins-Regular'
              }}>
                ¿No tienes una cuenta aún?
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    }
  }
);
