import { Platform, PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

/**
 * Función para obtener los permisos de localización.
 * Una vez consigue los permisos, esta función resuelve una promesa
 * y retorna como resultado las coordenadas de donde se encuentra el usuario.
 */
export const getCoordinatesFromCurrentLocation = () => {
  if (Platform.OS === 'android') {
    return new Promise(async (resolver, reject) => {
      let hasPermissionToLocation = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  
      if (!hasPermissionToLocation) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
          buttonNeutral: 'Ignorar',
          buttonPositive: 'Aceptar',
          buttonNegative: 'Cancelar',
          title: 'Permisos de ubicación',
          message: 'Necesitamos permisos de ubicación para poder localizarte',
        });
  
        hasPermissionToLocation = granted === PermissionsAndroid.RESULTS.GRANTED;
      }
  
      if (hasPermissionToLocation) {
        await Geolocation.getCurrentPosition((response, error) => {
          !!error ? reject(error) : resolver(response.coords);
        });
      } else {
        reject({ code: 'ACCESS_DENIED' });
      }
    });
  }
  return (async () => {
    const response = {};
    await Geolocation.requestAuthorization();
    await Geolocation.getCurrentPosition((response, error) => {
      response.error = error;
      response.response = response;
    });
    return response
  })();
  // return new Promise((resolve, reject) => reject({ code: 'PLATFORM_NOT_SUPPORTED' }))
}

/**
 * Función para obetener la distancia entre dos coordenadas.
 * 
 * @param {Number} latitudeOrigin La latitud de origen
 * @param {Number} longitudeOrigin La longitud de origin
 * @param {Number} latitudeDestination La latitud de destino
 * @param {Number} longitudeDestination La longitud de destino
 */
export const getDistanceBetweenTwoCoordinates = (
  latitudeOrigin,
  longitudeOrigin,
  latitudeDestination,
  longitudeDestination
) => {
	var R = 6371;
	var dLat = (latitudeDestination - latitudeOrigin) * Math.PI / 180;
	var dLon = (longitudeDestination - longitudeOrigin) * Math.PI / 180;
	var a = (
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(latitudeOrigin * Math.PI / 180 ) *
    Math.cos(latitudeDestination * Math.PI / 180 ) * Math.sin(dLon/2) * Math.sin(dLon/2)
  );
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	if (d > 1) return Math.round(d * 1000);
	else if (d <= 1) return Math.round(d * 1000);
	return d;
}
