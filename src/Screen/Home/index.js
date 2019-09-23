import _ from 'lodash'
import API from '@Services/Api'
import { connect } from 'react-redux'
import Alert from '@Components/Alert'
import { loading } from '@Actions/tmp'
import { runTiming } from '@Utils/animation'
import ModalContainer from './ModalContainer'
import Animated from 'react-native-reanimated'
import MainContainer from '@Components/Containers/Main'
import ModalCreationAddress from './ModalCreationAddress'
import React, { useState, useRef, useEffect } from 'react'
import { scale, MAIN_COLOR, ACCENT_COLOR } from '@Theme/constants'
import { Image, StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Callout, Marker, Polyline, Animated as MapViewAnimated } from 'react-native-maps'
import { getCoordinatesFromCurrentLocation, getDistanceBetweenTwoCoordinates } from '@Utils/location'

const { set, neq, cond, Value, Clock, block, useCode } = Animated;

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
  },
  CTAContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
  loader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: .6,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MAIN_COLOR
  },
  loaderText: {
    color: '#2B2B2B',
    fontSize: scale(18),
    fontFamily: 'Poppins-SemiBold'
  }
});


// Variable incicial
var debouncedAnimation = null

/**
 * Función que retorna una función de _.debounce, con el fin de cancelar
 * animaciones al mapa y evitar que el mapa se mueva cuando no se quiere que se mueva
 * 
 * @param {React.Node} map El nodo del componente mapa renderizado
 * @param {Object} region El objeto que contiene la region donde se animará el mapa
 */
const _debounceAnimateToRegion = (map, region) => {
  return _.debounce(() => {
    (!!map && !!map.current) && map.current.getNode().animateToRegion(region, 100);
  }, 500);
}

/**
 * Función que valida si hay alguna otra función de animación en curso, de ser
 * así la cancela, y de lo contrario crea una nueva y returna su resultado
 * 
 * @param {React.Node} map El nodo del componente mapa renderizado
 * @param {Object} region El objeto que contiene la region donde se animará el mapa
 */
const animateToRegion = (map, region) => {
  !!debouncedAnimation && debouncedAnimation.cancel();
  debouncedAnimation = _debounceAnimateToRegion(map, region);
  return debouncedAnimation();
}

/**
 * Callaout para los markers del mapa
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const CustomCallout = ({ title }) => (
  <View style={{
    padding: 20,
    backgroundColor: '#FFF',
  }}>
    <Text style={{
      fontSize: 13,
      color: '#2B2B2B',
      textAlign: 'center',
      fontFamily: 'Poppins-Bold',
    }}>
      { title }
    </Text>
    <Text style={{
      fontSize: 11,
      color: '#2D2D2D',
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
    }}>
      (Presiona aquí para mostrar la ruta)
    </Text>
  </View>
);

/**
 * Componente que se encarga de renderizar el mapa de la aplicación
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const HomeScreen = ({ loading, addresses, currentPosition, getRoute }) => {
  const map = useRef(null);
  const clock = new Clock();
  const opacity = new Value(1);
  const [ index, setIndex ] = useState(0);
  const [ marker, setMarker ] = useState({});
  const [ routes, setRoutes ] = useState([]);
  const [ showMap, setShowMap ] = useState(false);
  const [ userLocation, setUserLocation ] = useState(null);
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ region, setRegion ] = useState({
    latitude: currentPosition.latitude,
    latitudeDelta: 0.007832986620123883,
    longitude: currentPosition.longitude,
    longitudeDelta: 0.004916153848171234,
  });

  // useEffect que se ejecuta cunado se inicia la aplicación y obtiene la ubicación del usuario
  useEffect(() => {
    getCoordinatesFromCurrentLocation()
      .then(({ latitude, longitude }) => {
        !userLocation && setUserLocation({ latitude, longitude });
        !userLocation && setRegion({ ...region, latitude, longitude });
        setShowMap(true);
      })
      .catch((code) => {
        Alert.show({
          type: 'error',
          duration: 3000,
          message: code !== 'ACCESS_DENIED' ?
            'Ha ocurrido un error inesperado' :
            'Por favor activa los servicios de ubicación'
        });
      });
  }, [ ]);

  // Animación para el pin central
  useCode(block([
    cond(
      !!marker.id,
      cond(
        getDistanceBetweenTwoCoordinates(
          marker.latitude, marker.longitude, region.latitude, region.longitude
        ) > 100,
        cond(neq(opacity, 1), set(opacity, runTiming(clock, 0, 1)), []),
        cond(neq(opacity, 0), set(opacity, runTiming(clock, 1, 0)), [])
      ),
      cond(
        neq(opacity, 1), set(opacity, runTiming(clock, 0, 1), [])
      )
    )
  ]), [ region ]);

  // useEffect para centrar el mapa en una posición específica
  useEffect(() => {
    if (index === 0) {
      setMarker({});
      animateToRegion(map, {
        ...region, ...currentPosition
      });
    } else {
      const address = addresses[index - 1];
      setMarker(address);

      if (!marker.id || address.id !== marker.id) {
        animateToRegion(map, {
          ...region,
          latitude: address.latitude,
          longitude: address.longitude,
        });
      }
    }
  }, [ index ]);

  return <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
    <MainContainer onAddAddress={() => setModalVisible(true)}>
      {
        showMap && (
          <React.Fragment>
            <MapViewAnimated
              ref={map}
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
                    onPress={() => setMarker(address)}
                    onCalloutPress={() => {
                      !!marker.id && getRoute({
                        destination: `${marker.latitude},${marker.longitude}`,
                        origin: `${userLocation.latitude},${userLocation.longitude}`,
                      }, setRoutes);
                    }}
                    coordinate={{ latitude: address.latitude, longitude: address.longitude }}
                  >
                    <Callout>
                      <CustomCallout title={address.name} />
                    </Callout>
                  </Marker>
                ))
              }
              {
                (!!routes.length && !!marker.id) && <Polyline strokeWidth={4} coordinates={routes} />
              }
            </MapViewAnimated>
            <Animated.View style={[Style.pinContainer, { opacity }]}>
              <Image style={Style.pinImage} source={require('@Assets/images/pin.png')} />
            </Animated.View>
            <ModalContainer onGetRoute={() => {
              !!marker.id && getRoute({
                destination: `${marker.latitude},${marker.longitude}`,
                origin: `${userLocation.latitude},${userLocation.longitude}`,
              }, setRoutes);
            }} onSelectedAddress={([ index ]) => setIndex(index)} />
            { loading && <View style={Style.loader}>
              <Text style={Style.loaderText}>
                Cargando...
              </Text>
            </View> }
          </React.Fragment>
        )
      }
      <ModalCreationAddress region={region} visible={modalVisible} onClose={() => setModalVisible(false)} />
    </MainContainer>
  </SafeAreaView>
}

/**
 * Función para mapear el estado global de Redux como propiedades
 * del componente.
 * 
 * @param {Object} state El estado global de Redux
 */
const mapStateToProps = (state) => ({
  loading: state.tmp.loading,
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
        if (!!response.routes.length) {
          const routes = API.decode(response.routes[0].overview_polyline.points);
          callback(routes);
        } else {
          Alert.show({
            duration: 3000,
            type: 'warning',
            message: 'No se encontraron rutas'
          });
        }
      })
      .catch(() => {
        Alert.show({
          type: 'error',
          duration: 3000,
          message: 'Algo no salió bien'
        });
        dispatch(loading(false))
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
