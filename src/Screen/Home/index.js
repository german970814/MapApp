import _ from 'lodash'
import API from '@Services/Api'
import { connect } from 'react-redux'
import Alert from '@Components/Alert'
import { loading } from '@Actions/tmp'
import { onScroll } from 'react-native-redash'
import { scale, ACCENT_COLOR } from '@Theme/constants'
import MainContainer from '@Components/Containers/Main'
import ModalCreationAddress from './ModalCreationAddress'
import Animated, { Easing } from 'react-native-reanimated'
import React, { useState, useRef, useEffect } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { getCoordinatesFromCurrentLocation, getDistanceBetweenTwoCoordinates } from '@Utils/location'

const { Value, interpolate, Extrapolate } = Animated;

const Style = StyleSheet.create({
  pinContainer: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    marginTop: scale(-48),
    marginLeft: scale(-24),
  },
  pinImage: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'contain',
  },
  scrollViewVertical: {
    left: 0,
    right: 0,
    bottom: 10,
    height: 100,
    position: 'absolute',
    // backgroundColor: 'rgba(200, 120, 400, .4)'
  },
  CTAContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  CTA: {
    // marginBottom: 20,
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
  }
});
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);


/**
 * Componente que se encarga de renderizar el mapa de la aplicación
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const HomeScreen = ({ addresses, currentPosition, getRoute }) => {
  const y = new Value(0);
  const scroll = useRef(null);
  const [ routes, setRoutes ] = useState([]);
  const [ marker, setMarker ] = useState({});
  const [ showMap, setShowMap ] = useState(false);
  const [ userLocation, setUserLocation ] = useState(null);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ region, setRegion ] = useState({
    // latitude: 6.217,
    // longitude: -75.567,
    latitude: currentPosition.latitude,
    latitudeDelta: 0.007832986620123883,
    longitude: currentPosition.longitude,
    longitudeDelta: 0.004916153848171234,
  });

  useEffect(() => {
    getCoordinatesFromCurrentLocation()
      .then(({ latitude, longitude }) => {
        !userLocation && setUserLocation({ latitude, longitude });
        !userLocation && setRegion({ ...region, latitude, longitude });
        setShowMap(true);
      })
      .catch(({ code }) => {
        code === 'ACCESS_DENIED' && Alert.show({
          type: 'error',
          duration: 3000,
          message: 'Por favor activa los servicios de ubicación'
        });
      });
  }, [ ]);

  useEffect(() => {
    (scroll && scroll.current) && scroll.current.getNode().scrollTo({
      y: !marker.id ? 0 : 100
    });
  }, [!marker.id]);

  useEffect(() => {
    if (!!marker.id && !routes.length) {
      const userDistance = getDistanceBetweenTwoCoordinates(
        marker.latitude, marker.longitude, region.latitude, region.longitude
      );
      if (userDistance > 300) {
        (scroll && scroll.current) && scroll.current.getNode().scrollTo({
          y: 0
        });
        setMarker({});
      }
    }
  }, [ region ])

  const opacity = interpolate(y, {
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  return <MainContainer>
    {
      showMap && (
        <React.Fragment>
          <MapView
            showsUserLocation
            initialRegion={region}
            showsPointsOfInterest={false}
            showsMyLocationButton={false}
            onRegionChangeComplete={setRegion}
            style={{ ...StyleSheet.absoluteFillObject }}
          >
            {
              addresses.map((address, index) => (
                <Marker
                  key={index}
                  title={address.name}
                  onPress={() => {
                    setMarker(marker.id === address.id ? {} : address)
                  }}
                  coordinate={{ latitude: address.latitude, longitude: address.longitude }} />
              ))
            }
            {
              (!!routes.length && !!marker.id) && <Polyline
                strokeWidth={4}
                coordinates={routes}
              />
            }
          </MapView>
          <Animated.View
            style={[Style.pinContainer, { opacity }]}
          >
            <AnimatedTouchableOpacity onPress={() => setMarker({})}>
              <Image style={Style.pinImage} source={require('@Assets/images/pin.png')} />
            </AnimatedTouchableOpacity>
          </Animated.View>

          <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20 }}>
            <Animated.ScrollView
              vertical
              ref={scroll}
              scrollEnabled={false}
              decelerationRate="fast"
              scrollEventThrottle={1}
              onScroll={onScroll({ y })}
              style={Style.scrollViewVertical}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ height: 200 }}
            >
              <View style={Style.CTAContainer}>
                <TouchableOpacity activeOpacity={.8} style={Style.CTA} onPress={() => setModalVisible(true)}>
                  <Text style={Style.CTAText}>
                    Agregar nueva dirección
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={Style.CTAContainer}>
                <TouchableOpacity
                  activeOpacity={.8}
                  style={Style.CTA}
                  onPress={() => {
                    if (!!routes.length) {
                      setMarker({});
                      setRoutes([]);
                    } else {
                      !!marker.id && getRoute({
                        destination: `${marker.latitude},${marker.longitude}`,
                        origin: `${userLocation.latitude},${userLocation.longitude}`,
                      }, setRoutes);
                    }
                  }}
                >
                  <Text style={Style.CTAText}>
                    { !!routes.length ? 'Listo' : '¿Cómo llegar?' }
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.ScrollView>
          </View>
        </React.Fragment>
      )
    }
    <ModalCreationAddress region={region} visible={modalVisible} onClose={() => setModalVisible(false)} />
  </MainContainer>
}

/**
 * Función para mapear el estado global de Redux como propiedades
 * del componente.
 * 
 * @param {Object} state El estado global de Redux
 */
const mapStateToProps = (state) => ({
  user: state.user.loggedUser,
  currentPosition: state.address.currentPosition,
  addresses: _.filter(state.address.data, { userId: state.user.loggedUser.id }),
});

/**
 * Función para mapear acciones despachables para el store de Redux, las
 * cuales llegan como <Props> al componente.
 * 
 * @param {Redux.Dispatcher} dispatch Despachador de acciones de Redux
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Obtiene las rutas directamente desde el API de google
   * 
   * @param {Object} param0 Diccionario con posiciones
   * @param {Function} callback Función callback para setear las rutas
   */
  getRoute: ({ origin, destination }, callback) => {
    dispatch(loading(true));
    return API.getRoutesFromGoogle({ origin, destination })
      .then(({ response, rawResponse }) => {
        dispatch(loading(false));
        const routes = API.decode(response.routes[0].overview_polyline.points);
        callback(routes);
      })
      .catch(() => {
        dispatch(loading(false))
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
