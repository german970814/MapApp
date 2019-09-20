import React from 'react'
import { Icon } from 'native-base'
import Field from '@Components/Field'
import { View, Text, ImageBackground, TouchableOpacity, Image, Modal, Dimensions } from 'react-native'

const { height } = Dimensions.get('window');


const ModalLoader = () => (
  <View style={{
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, .6)',
  }}>
    <Image style={{ width: 90, height: 90 }} source={require('@Assets/images/loader.gif')} />
  </View>
);

const LoginModal = ({ visible, onCreateNewAccount }) => {
  return <Modal
    transparent
    visible={visible}
    animationType="slide"
  >
    <View style={{
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'transparent'
    }}>
      <View style={{
        paddingVertical: 20,
        paddingHorizontal: 20,
        minHeight: height * .6,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
      }}>
        <Text style={{
          fontSize: 26,
          color: '#2B2B2B',
          textAlign: 'center',
          fontFamily: 'Poppins-Bold'
        }}>
          Bienvenido
        </Text>
        <Text style={{
          fontSize: 16,
          // marginTop: 10,
          color: '#B0B0B0',
          textAlign: 'center',
          fontFamily: 'Poppins-Regular'
        }}>
          Ingresa para continuar
        </Text>
        <View>
          <Field icon="idcard" placeholder={'Email'} value={''} />
          <Field icon="lock" placeholder={'Contraseña'} value={''} />
          <TouchableOpacity onPress={onCreateNewAccount} style={{ backgroundColor: 'transparent', paddingVertical: 5 }}>
            <Text style={{
              fontSize: 13,
              color: '#4a9dca',
              fontFamily: 'Poppins-Regular'
            }}>
              Crear una cuenta
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 60,
            backgroundColor: '#f1851f'
          }}>
            <Text style={{
              fontSize: 18,
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Poopins-SemiBold'
            }}>
              LOGIN
            </Text>
          </View>
        </View>
        {/* <ModalLoader /> */}
      </View>
    </View>
  </Modal>
}


const RegisterModal = ({ visible, onLogin }) => {
  return <Modal
    transparent
    visible={visible}
    animationType="slide"
  >
    <View style={{
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'transparent'
    }}>
      <View style={{
        height: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 20,
        minHeight: height * .7,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'white',
      }}>
        <Text style={{
          fontSize: 26,
          color: '#2B2B2B',
          textAlign: 'center',
          fontFamily: 'Poppins-Bold'
        }}>
          Regístrate
        </Text>
        <Text style={{
          fontSize: 16,
          // marginTop: 10,
          color: '#B0B0B0',
          textAlign: 'center',
          fontFamily: 'Poppins-Regular'
        }}>
          Ingresa para continuar
        </Text>
        <View>
          <Field icon="user" placeholder={'Nombres'} value={''} />
          <Field icon="user" placeholder={'Apellidos'} value={''} />
          <Field icon="idcard" placeholder={'Identificación'} value={''} />
          <Field icon="lock" placeholder={'Contraseña'} value={''} />
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={{
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 60,
            backgroundColor: '#f1851f'
          }}>
            <Text style={{
              fontSize: 18,
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'Poopins-SemiBold'
            }}>
              REGISTRARSE
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onLogin} style={{
          top: 25,
          right: 25,
          padding: 5,
          position: 'absolute',
        }}>
          <Icon name="close" type="AntDesign" style={{
            color: '#2B2B2B',
          }} />
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
}


export default class IntroScreen extends React.Component {
  state = { isLogin: true }

  toggleModals = () => {
    this.setState({ isLogin: !this.state.isLogin });
  }

  render() {
    return <View style={{
      flex: 1,
      backgroundColor: '#D6E2E2',
    }}>
      <View style={{ width: '100%', height: height * .4 }}>
        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('@Assets/images/background.png')} />
      </View>
      <LoginModal
        visible={this.state.isLogin}
        onCreateNewAccount={this.toggleModals} />
      <RegisterModal
        onLogin={this.toggleModals}
        visible={!this.state.isLogin} />
    </View>
  }
}