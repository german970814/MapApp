import _ from 'lodash'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import Animated from 'react-native-reanimated'
import { scale, ACCENT_COLOR } from '@Theme/constants'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { onGestureEvent, withSpring, onScroll } from 'react-native-redash'
import AddressContainer, { ADDRESS_WIDTH, ADDRESS_OFFSET } from './AddressContainer'
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'


const { height } = Dimensions.get('window');

const {
  call,
  Value,
  round,
  divide,
  Extrapolate,
  interpolate,
} = Animated;

export const SNAP_TOP = height * .45;
export const SNAP_BOTTOM = height * .8;


const Style = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    elevation: 3,
    paddingVertical: 20,
    position: 'absolute',
    paddingHorizontal: 20,
    minHeight: height * .55,
    borderTopLeftRadius: 40,
    backgroundColor: 'white',
    borderTopRightRadius: 40,
  },
  imageContainer: {
    top: -40,
    left: 30,
    width: 80,
    height: 80,
    elevation: 3,
    borderRadius: 100,
    position: 'absolute',
    backgroundColor: ACCENT_COLOR,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 26,
    marginTop: 10,
    color: '#2B2B2B',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold'
  },
  addressContainer: {
    marginTop: 10,
    height: scale(130),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scroll: {
    left: 0,
    top: 10,
    right: 0,
    height: scale(120),
    position: 'absolute',
  },
  CTA: {
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 60,
    backgroundColor: ACCENT_COLOR
  },
  CTAText: {
    color: '#FFF',
    fontSize: scale(18),
    textAlign: 'center',
    fontFamily: 'Poopins-SemiBold'
  },
  CTAContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAddressContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noAddressText: {
    color: '#2B2B2B',
    fontSize: scale(18),
    textAlign: 'center',
    fontFamily: 'Poopins-SemiBold'
  }
});

/**
 * Componente para mostrar una carta flotante con las direcciones del usuario
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const ModalContainer = ({ addresses, user, onSelectedAddress, onGetRoute }) => {
  const [ x ] = useState(new Value(0));
  const [ velocityY ] = useState(new Value(0));
  const [ translationY ] = useState(new Value(0));
  const [ state ] = useState(new Value(State.UNDETERMINED));
  const [ translationYOffset ] = useState(new Value(SNAP_BOTTOM));

  const index = round(divide(x, ADDRESS_WIDTH));

  const gestureHandler = onGestureEvent({
    state,
    velocityY,
    translationY,
  });

  const [ translateY ] = useState(withSpring({
    state,
    velocity: velocityY,
    value: translationY,
    config: { damping: 12 },
    offset: translationYOffset,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
  }));

  const interpolatedTranslationY = interpolate(translateY, {
    extrapolate: Extrapolate.CLAMP,
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
    outputRange: [SNAP_TOP, SNAP_BOTTOM],
  });

  const opacity = interpolate(interpolatedTranslationY, {
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
  });

  const ctaOpacity = interpolate(index, {
    inputRange: [0, 1, 100],
    outputRange: [0, 1, 1]
  });

  Animated.useCode(
    Animated.block([
      call([index], onSelectedAddress)
    ]),
    [index]
  );

  return <Animated.View
    style={[Style.container, {
      transform: [
        { translateY: interpolatedTranslationY }
      ]
    }]}
  >
    <Animated.View style={[Style.imageContainer, { opacity }]}>
      <Image style={Style.image} source={require('@Assets/images/user.png')} />
    </Animated.View>
    <Text style={Style.name}>
      { `Hola ${_.capitalize(user.name)}!` }
    </Text>
    <Animated.View style={Style.addressContainer}>
      {
        !addresses.length ?
          (
            <View style={Style.noAddressContainer}>
              <Text style={Style.noAddressText}>
                No tienes direcciones agregadas, por favor agrega una dirigiendote al menú
              </Text>
            </View>
          ) : (
            <React.Fragment>
              <AddressContainer x={x} />
              <Animated.ScrollView
                horizontal
                style={Style.scroll}
                decelerationRate="fast"
                scrollEventThrottle={500}
                onScroll={onScroll({ x })}
                snapToInterval={ADDRESS_WIDTH}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ width: (ADDRESS_OFFSET * 2) + ((ADDRESS_WIDTH) * (addresses.length + 1)) }}
              />
            </React.Fragment>
          )
      }
    </Animated.View>
    { !!addresses.length && <Animated.View style={[Style.CTAContainer, { opacity: ctaOpacity }]}>
      <TouchableOpacity onPress={onGetRoute} activeOpacity={.8} style={Style.CTA}>
        <Text style={Style.CTAText}>
          ¿Cómo llegar?
        </Text>
      </TouchableOpacity>
    </Animated.View> }
    <PanGestureHandler maxPointers={1} { ...gestureHandler }>
      <Animated.View style={{
        top: 0,
        left: 0,
        right: 0,
        height: scale(90),
        position: 'absolute',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        // backgroundColor: 'rgba(0, 0, 0, .3)',
      }}>
      </Animated.View>
    </PanGestureHandler>
  </Animated.View>
}

/**
 * Función para mapear el estado global de Redux como propiedades
 * del componente.
 * 
 * @param {Object} state El estado global de Redux
 */
const mapStateToProps = (state) => ({
  user: state.user.loggedUser,
  addresses: _.filter(state.address.data, { userId: state.user.loggedUser.id }),
});

export default connect(mapStateToProps)(ModalContainer);
