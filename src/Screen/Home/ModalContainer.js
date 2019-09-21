import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Animated from 'react-native-reanimated'
import { onGestureEvent, withSpring } from 'react-native-redash'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

const { height } = Dimensions.get('window');

const { Value, Extrapolate, interpolate } = Animated;

export const SNAP_BOTTOM = 0;
export const SNAP_TOP = (height * .4) * -1;


const ModalContainer = ({ children, user }) => {
  const velocityY = new Value(0);
  const translationY = new Value(SNAP_BOTTOM);
  const state = new Value(State.UNDETERMINED);

  const gestureHandler = onGestureEvent({
    state,
    velocityY,
    translationY,
  });

  const translateY = withSpring({
    state,
    velocity: velocityY,
    value: translationY,
    // snapPoints: [SNAP_BOTTOM],
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
  });

  const interpolatedTranslationY = interpolate(translateY, {
    extrapolate: Extrapolate.CLAMP,
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
    outputRange: [SNAP_TOP, SNAP_BOTTOM],
  });

  const opacity = interpolate(translateY, {
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
  });

  return <Animated.View style={{
    left: 0,
    right: 0,
    paddingVertical: 20,
    position: 'absolute',
    paddingHorizontal: 20,
    minHeight: height * .5,
    backgroundColor: 'white',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    transform: [
      { translateY: interpolatedTranslationY }
      // { translateY: translateY }
    ]
  }}>
    <Animated.View style={{
      opacity,
      left: 30,
      width: 80,
      height: 80,
      bottom: -40,
      elevation: 3,
      borderRadius: 100,
      position: 'absolute',
      backgroundColor: '#f1851f',
    }}>
      <Image
        style={{ borderRadius: 100, height: '100%', width: '100%', resizeMode: 'contain' }}
        source={require('@Assets/images/user.png')} />
    </Animated.View>
    <Animated.View style={{  }}>
      { children }
    </Animated.View>
    <PanGestureHandler maxPointers={1} { ...gestureHandler }>
      <Animated.View style={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 70,
        position: 'absolute',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        // backgroundColor: 'rgba(0, 0, 0, .3)',
      }}>
        <Text style={{
          fontSize: 26,
          marginTop: 10,
          color: '#2B2B2B',
          textAlign: 'center',
          fontFamily: 'Poppins-Bold'
        }}>
          { `Hola ${_.capitalize(user.name)}!` }
        </Text>
      </Animated.View>
    </PanGestureHandler>
  </Animated.View>
}

const mapStateToProps = (state) => ({
  user: state.user.loggedUser
});
export default connect(mapStateToProps)(ModalContainer);
