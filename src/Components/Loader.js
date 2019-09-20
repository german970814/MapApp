import { connect } from 'react-redux'
import React, { useState } from 'react'
import { View, Image } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'


const AnimatedImage = Animated.createAnimatedComponent(Image);

const {
  eq,
  set,
  cond,
  Value,
  Clock,
  block,
  timing,
  useCode,
  stopClock,
  startClock,
  interpolate,
  clockRunning,
} = Animated

/**
 * Function to create timing animation on map
 * 
 * @param {Animated.Clock} clock The clock
 * @param {Number} value The value from animation starts
 * @param {Number} dest The value to animation finish
 */
const runTiming = (clock, value, dest) => {
  const state = {
    time: new Value(0),
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, [
      stopClock(clock),
      set(state.finished, 0),
      set(state.position, value),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    state.position
  ]);
}


const LoaderComponent = ({ loading=true }) => {
  const clock = new Clock();
  const isAnimating = new Value(0);

  useCode(
    block([
      cond(
        !!loading,
        set(isAnimating, runTiming(clock, 0, 1)),
        stopClock(clock)
      )
    ]),
    [ loading ]
  );

  const scale = interpolate(isAnimating, {
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
  });

  return !loading ? null : <View style={{
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  }}>
    <View style={{
      padding: 30,
      borderRadius: 15,
      backgroundColor: 'white',
    }}>
      <AnimatedImage style={{
        width: 90,
        height: 90,
        alignSelf: 'center',
        resizeMode: 'contain',
        transform: [
          { scale }
        ]
      }} source={require('@Assets/images/logo.png')} />
    </View>
  </View>
};

export default connect((state) => ({ loading: state.tmp.loading }))(LoaderComponent);
