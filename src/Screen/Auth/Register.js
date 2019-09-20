import React from 'react';
import { Content } from 'native-base';
import Field from '@Components/Field';
import { connect } from 'react-redux';
import MainContainer from '@Components/Containers/Main';
import { MAIN_COLOR, ACCENT_COLOR } from '@Theme/constants';
import { View, Image, Text, TouchableOpacity } from 'react-native';


export default connect()(
  class RegisterScreen extends React.Component {
    state = {
      formData: {
        name: {
          placeholder: 'Nombres',
        },
        lastName: {
          placeholder: 'Apellidos',
        },
        identificationNumber: {
          placeholder: 'Número de identificación',
        },
        password: {
          placeholder: 'Contraseña'
        }
      }
    }

    onChangeField = (field, value) => {
      this.setState({
        formData: Object.assign({}, this.state.formData, {
          [field]: Object.assign({}, this.state.formData[field], { value })
        })
      })
    }

    render() {
      return <MainContainer headerStyle={{ backgroundColor: 'transparent' }}>
        <Content style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 20 }}>
            <Image style={{
              flex: 1,
              width: 300,
              height: 100,
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
          <View style={{ marginVertical: 20 }}>
            <Text style={{
              fontSize: 30,
              textAlign: 'center',
              color: ACCENT_COLOR,
              fontFamily: 'Poppins-Bold'
            }}>
              Registrate
            </Text>
          </View>
          <View style={{ paddingHorizontal: 40 }}>
            <View>
              {
                Object.keys(this.state.formData).map((field, index) => (
                  <Field
                    key={`field__${field}__${index}`}
                    { ...this.state.formData[field] }
                    onChange={this.onChangeField.bind(this, field)} />
                ))
              }
            </View>
            <View style={{
              marginTop: 30,
              marginBottom: 10,
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
          </View>
        </Content>
      </MainContainer>
    }
  }
)
