import _ from 'lodash'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import Animated from 'react-native-reanimated'
import { scale as sscale } from '@Theme/constants'
import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native'


const { width } = Dimensions.get('window');
const { interpolate, Extrapolate } = Animated;
const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

export const ADDRESS_HEIGHT = sscale(110);
export const ADDRESS_WIDTH = sscale(100 + 40);
export const ADDRESS_OFFSET = (width - sscale(40) - (ADDRESS_WIDTH)) / 2;

const COLORS = [
  'rgba(73, 156, 201, .4)',
  'rgba(244, 178, 27, .4)',
  'rgba(154, 214, 241, .4)',
  'rgba(241, 133, 31, .4)',
  'rgba(73, 156, 201, .4)',
  'rgba(244, 178, 27, .4)',
  'rgba(154, 214, 241, .4)',
  'rgba(241, 133, 31, .4)',
];

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row'
  },
  addressContainer: {
    width: ADDRESS_WIDTH,
    alignItems: 'center',
    height: ADDRESS_HEIGHT,
    justifyContent: 'center',
  },
  backgroundContainer: {
    borderRadius: 25,
    width: sscale(100),
    alignItems: 'center',
    resizeMode: 'contain',
    height: ADDRESS_HEIGHT,
    justifyContent: 'center',
  },
  addressOverlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
    position: 'absolute',
  },
  addressName: {
    color: '#FFF',
    fontSize: sscale(15),
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold'
  }
});

/**
 * Componente para renderizar las direcciones
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const AddressContainer = ({ x, addresses }) => {
  const [ LIST_OF_COLORS ] = useState(_.concat(
    ...Array.apply(null, { length: 5 }).map(() => COLORS)
  ));

  return <View style={Style.container}>
    <View style={Style.content}>
      {
        addresses.map((address, i) => {
          const currentPosition = i * ADDRESS_WIDTH;
          const nextPosition = (i + 1) * ADDRESS_WIDTH;
          const previousPosition = (i - 1) * ADDRESS_WIDTH;

          const translateX = interpolate(x, {
            inputRange: [0, ADDRESS_WIDTH],
            outputRange: [ADDRESS_OFFSET, ADDRESS_OFFSET + (-1 * ADDRESS_WIDTH)],
          });

          const inputRange = [previousPosition, currentPosition, nextPosition];

          const scale = interpolate(x, {
            inputRange,
            outputRange: [1, 1.1, 1],
            extrapolate: Extrapolate.CLAMP
          });

          const opacity = interpolate(x, {
            inputRange,
            outputRange: [.6, 1, .6],
            extrapolate: Extrapolate.CLAMP
          });

          return (
            <Animated.View key={i} style={[Style.addressContainer, {
              opacity,
              transform: [
                { translateX }
              ]
            }]}>
              <AnimatedImageBackground
                source={require('@Assets/images/city.png')}
                imageStyle={{ resizeMode: 'contain', borderRadius: 25 }}
                style={[Style.backgroundContainer, { transform: [ { scale } ] }]}
              >
                <View style={[Style.addressOverlay, { backgroundColor: LIST_OF_COLORS[i] }]} />
                <Text style={Style.addressName}>
                  { address.name }
                </Text>
              </AnimatedImageBackground>
            </Animated.View>
          )
        })
      }
    </View>
  </View>
}

/**
 * Función para mapear el estado global de Redux como propiedades
 * del componente.
 * 
 * @param {Object} state El estado global de Redux
 */
const mapStateToProps = (state) => ({
  user: state.user.loggedUser,
  addresses: !state.address.data.length ?
    state.address.data:
    [
      { id: 0, name: 'Ubicación actual', ...state.address.currentPosition  },
      ..._.filter(state.address.data, { userId: state.user.loggedUser.id })
    ],
});

export default connect(mapStateToProps)(AddressContainer);
