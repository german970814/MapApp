import _ from 'lodash';

const GOOGLE_API_KEY = 'AIzaSyB3rkqR8bAHa_aN29xkCaFQmmlueWZETw0'

/**
 * Servicio para las llamadas de API
 */
export default class API {

  /**
   * Retorna los Headers principales de cada petición
   * 
   * @param {Object} customHeaders Headers personalizados en la petición
   */
  _getHeaders(customHeaders) {
    const defaultHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    return {
      ...defaultHeaders,
      ...customHeaders,
    }
  }

  /**
   * Retorna la url base para cada petición
   * 
   * @param {String} path Es el recurso de la api a consumir
   */
  _getUrl(path) {
    return `https://maps.googleapis.com/maps/api/${path}/json`;
  }

  /**
   * Parsea un objeto plano a un objeto de url
   * 
   * @param {Object} body El objeto a ser parseado
   */
  static _parseStringToQuery(body={}) {
    return Object.keys(body).map(key => {
      return `${key}=${encodeURIComponent(body[key])}`;
    }).join('&');
  }

  /**
   * Define el comportamiento del cliente
   * 
   * @param {String} path El recurso a consumir
   * @param {String} method Método HTTTP para hacer la petición
   * @param {Object} payload Los datos que se enviarán al servidor
   */
  _defaultClient({ path, method, payload }) {
    let queryParsed = '';
    let customHeaders = {};
    let bodyParsed = JSON.stringify({});

    if (['POST', 'PUT'].indexOf(method.toUpperCase()) !== -1) {
      bodyParsed = JSON.stringify(payload);
    } else if (method.toUpperCase() === 'GET') {
      queryParsed = API._parseStringToQuery(payload);
    }

    const _config = _.omit({
      method,
      body: bodyParsed,
      headers: this._getHeaders(customHeaders)
    }, [ method === 'GET' ? 'body': '' ]);

    return fetch(`${this._getUrl(path)}?${queryParsed}`, _config)
      .then(async response => {
        return {
          rawResponse: response,
          response: await response.json(),
        };
      })
      .catch(error => {
        return {
          status: 500,
          error: true,
          stack: error.stack,
          code: 'E_SERVER_ERROR',
        }
      });
  }

  /**
   * Crea una petición tipo POST
   * 
   * @param {String} path El recurso que se usará
   * @param {Object} body Los parámetros a enviar al servidor
   */
  static async post(path, body) {
    const self = new API();
    return await self._defaultClient({
      path,
      payload: body,
      method: 'POST',
    });
  }

  /**
   * Crea una petición tipo PUT
   * 
   * @param {String} path El recurso que se usará
   * @param {Object} body Los parámetros a enviar al servidor
   */
  static async put(path, body) {
    const self = new API();
    return await self._defaultClient({
      path,
      payload: body,
      method: 'PUT',
    });
  }

  /**
   * Crea una petición tipo GET
   * 
   * @param {String} path El recurso que se usará
   * @param {Object} body Los parámetros a enviar al servidor
   */
  static async get(path, body={}) {
    const self = new API();
    return await self._defaultClient({
      path,
      payload: body,
      method: 'GET',
    });
  }

  /**
   * Acción para decodificar un conjunto de coordenadas de un
   * Componente de vectores SVG
   */
  static decode (t, e) {
    for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})
  }

  /**
   * Peticiona a google la ruta de un punto 'a' a un punto 'b'
   * 
   * @param {Object} payload Los datos a enviar en la url
   */
  static async getRoutesFromGoogle(payload) {
    const query = {
      ...payload,
      mode: 'walking',
      key: GOOGLE_API_KEY,
    };

    return API.get('directions', query);
  }

  /**
   * Peticiona a Google la geolocalización dadas unas coordenadas
   * 
   * @param {Object} payload Los datos a enviar en la url
   */
  static async getCoordinatesDataFromGoogle(payload) {
    const query = { ...payload, key: GOOGLE_API_KEY };

    return API.get('geocode', query);
  }

  /**
   * Peticiona a Google la lista de posibles lugares dado un string
   * 
   * @param {Object} payload Los datos a enviar en la url
   */
  static async getPlacesFromGoogle(payload) {
    const query = { ...payload, key: GOOGLE_API_KEY };

    return API.get('textsearch', query);
  }
}
