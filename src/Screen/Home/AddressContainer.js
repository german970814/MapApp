import React from 'react';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';
import { Icon } from 'native-base'
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native'

const { width } = Dimensions.get('window');

const {
  Value,
  interpolate,
  Extrapolate,
  event,
  cond,
  lessOrEq
} = Animated;

export const ADDRESS_WIDTH = 100 + 40;
export const ADDRESS_OFFSET = (width - 40 - (ADDRESS_WIDTH)) / 2;

const COLORS = [
  'rgba(73, 156, 201, .4)',
  'rgba(244, 178, 27, .4)',
  'rgba(154, 214, 241, .4)',
  'rgba(241, 133, 31, .4)',
  'rgba(73, 156, 201, .4)',
  'rgba(244, 178, 27, .4)',
  'rgba(154, 214, 241, .4)',
  'rgba(241, 133, 31, .4)',
]

const AddressContainer = ({ x }) => {
  return <View style={{
    flex: 1,
    justifyContent: 'center',
  }}>
    <View style={{ flexDirection: 'row' }}>
      {
        COLORS.map((item, i) => {
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
            <Animated.View key={i} style={{
              opacity,
              height: 120,
              width: ADDRESS_WIDTH,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'rgba(0,0,0,.2)',
              transform: [
                // { scale },
                { translateX }
              ]
            }}>
              <Animated.View style={{
                width: 100,
                height: 120,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: item,
                transform: [
                  { scale }
                ]
              }}>
                <Icon style={{ fontSize: 42, color: '#DCDCDC' }} name="location-pin" type="SimpleLineIcons" />
              </Animated.View>
              {/* <View style={{
                top: 10,
                left: 10,
                right: 0,
                bottom: 0,
                borderRadius: 25,
                position: 'absolute',
                backgroundColor: item
              }} /> */}
            </Animated.View>
          )
        })
      }
    </View>
  </View>
}

export default AddressContainer