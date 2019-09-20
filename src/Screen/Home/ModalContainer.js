import React from 'react'
import Animated from 'react-native-reanimated'
import { onGestureEvent, withSpring } from 'react-native-redash'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

const { height } = Dimensions.get('window');

const { Value, Extrapolate, interpolate } = Animated;

export const SNAP_TOP = height * .4;
export const SNAP_BOTTOM = height * .9;


const ModalContainer = ({ children }) => {
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
    snapPoints: [SNAP_BOTTOM, SNAP_TOP],
  });

  const interpolatedTranslationY = interpolate(translateY, {
    inputRange: [0, height],
    outputRange: [SNAP_TOP, SNAP_BOTTOM],
    extrapolate: Extrapolate.CLAMP
  });

  const opacity = interpolate(translateY, {
    outputRange: [1, 0],
    inputRange: [SNAP_TOP, SNAP_BOTTOM],
    extrapolate: Extrapolate.CLAMP
  });

  return <Animated.View style={{
    left: 0,
    right: 0,
    paddingVertical: 20,
    position: 'absolute',
    paddingHorizontal: 20,
    minHeight: height * .6,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    transform: [
      { translateY: interpolatedTranslationY }
    ]
  }}>
    <Animated.View style={{
      opacity,
      top: -40,
      left: 30,
      width: 80,
      height: 80,
      elevation: 3,
      borderRadius: 100,
      position: 'absolute',
      backgroundColor: '#f1851f',
    }}>
      <Image
        style={{ borderRadius: 100, height: '100%', width: '100%', resizeMode: 'contain' }}
        source={require('@Assets/images/user.png')} />
    </Animated.View>
    <Animated.View style={{ }}>
      { children }
    </Animated.View>
    <PanGestureHandler maxPointers={1} { ...gestureHandler }>
      <Animated.View style={{
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        position: 'absolute',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0)',
      }} />
    </PanGestureHandler>
  </Animated.View>
}

export default ModalContainer;
