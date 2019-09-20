import React from 'react'
import { Icon } from 'native-base'
import MapView from 'react-native-maps'
import Animated from 'react-native-reanimated'
import { onGestureEvent, withSpring } from 'react-native-redash'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native'

const { height } = Dimensions.get('window');

const {
  Value,
  interpolate,
  Extrapolate,
  event,
  cond,
  lessOrEq
} = Animated;

const COLORS = [
  'rgba(73, 156, 201, .4)',
  'rgba(244, 178, 27, .4)',
  'rgba(154, 214, 241, .4)',
  'rgba(241, 133, 31, .4)',
]

const SNAP_TOP = height * .4;
const SNAP_BOTTOM = height * .9;

const ModalContainer = ({ children }) => {
  const velocityY = new Value(0);
  const translationY = new Value(SNAP_BOTTOM);
  const state = new Value(State.UNDETERMINED);

  const gestureHandler = onGestureEvent({
    state,
    velocityY,
    translationY,
  });

  // const interpolatedTranslationY = interpolate(translationY, {
  //   inputRange: [0, height],
  //   outputRange: [SNAP_TOP, SNAP_BOTTOM],
  //   extrapolate: Extrapolate.CLAMP
  // });

  const translateY = withSpring({
    state,
    velocity: velocityY,
    value: translationY,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
  });

  const interpolatedTranslationY = interpolate(translateY, {
    inputRange: [0, height],
    outputRange: [SNAP_TOP, SNAP_BOTTOM],
    extrapolate: Extrapolate.CLAMP
  });

  const opacity = 1
  // const opacity = interpolate(translateY, {
  //   outputRange: [1, 0],
  //   inputRange: [SNAP_TOP, SNAP_BOTTOM],
  //   extrapolate: Extrapolate.CLAMP
  // });

  return <Animated.View style={{
    left: 0, right: 0,
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
    <View style={{
      top: -40,
      left: 30,
      width: 80,
      height: 80,
      elevation: 3,
      borderRadius: 100,
      position: 'absolute',
      backgroundColor: '#f1851f'
    }}>
      <Image style={{ borderRadius: 100, height: '100%', width: '100%', resizeMode: 'contain' }} source={require('@Assets/images/user.png')} />
    </View>
    <Animated.View style={{ opacity }}>
      { children }
    </Animated.View>
    <PanGestureHandler
      maxPointers={1}
      { ...gestureHandler }
    >
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
};

export default class HomeScreen extends React.Component {
  render() {
    return <View style={{ flex: 1 }}>
      <MapView
        showsUserLocation
        initialRegion={{
          latitude: 6.217,
          longitude: -75.567,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <ModalContainer>
        <Text style={{
          fontSize: 26,
          color: '#2B2B2B',
          textAlign: 'center',
          fontFamily: 'Poppins-Bold'
        }}>
          Hola usuario!
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <FlatList
            horizontal
            data={COLORS}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => `address_option__${index}`}
            renderItem={({ item }) => (
              <View style={{
                width: 100,
                height: 120,
                marginRight: 10,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
                <Icon style={{ fontSize: 42, color: '#DCDCDC' }} name="location-pin" type="SimpleLineIcons" />
                <View style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 25,
                  position: 'absolute',
                  backgroundColor: item
                }} />
              </View>
            )}
          />
        </View>
      </ModalContainer>
    </View>
  }
}
