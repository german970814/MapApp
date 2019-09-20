import React from 'react'
import MapView from 'react-native-maps'
import ModalContainer from './ModalContainer'
import Animated from 'react-native-reanimated'
import { onScroll } from 'react-native-redash'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import AddressContainer, { ADDRESS_WIDTH, ADDRESS_OFFSET } from './AddressContainer'


const {
  Value,
} = Animated;

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

const HomeScreen = () => {
  const x = new Value(0);

  return <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
    {/* <MapView
      showsUserLocation
      initialRegion={{
        latitude: 6.217,
        longitude: -75.567,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={{ ...StyleSheet.absoluteFillObject }}
    /> */}
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
        <AddressContainer x={x} />
        <Animated.ScrollView
          horizontal
          decelerationRate="fast"
          scrollEventThrottle={1}
          onScroll={onScroll({ x })}
          snapToInterval={ADDRESS_WIDTH}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: (ADDRESS_OFFSET * 2) + ((ADDRESS_WIDTH) * COLORS.length) }}
          // contentContainerStyle={{ width: ((ADDRESS_WIDTH) * COLORS.length) }}
          style={{
            left: 0,
            right: 0,
            bottom: 0,
            height: 120,
            position: 'absolute',
          }}
        />
      </View>
    </ModalContainer>
  </View>
}

export default HomeScreen;
