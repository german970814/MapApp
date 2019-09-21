import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import LoaderScreen from '@Screens/LoaderScreen'
import { NavigationActions } from 'react-navigation'

/**
 * Componente usado para verificar la sesión del usuario
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const SessionService = ({ loggedUser, redirectToLogin, redirectToApp }) => {

  useEffect(() => {
    (!!loggedUser && !!loggedUser.id) ? redirectToApp() : redirectToLogin()
  }, []);

  return <LoaderScreen />
}

/**
 * Función para mapear el estado global de Redux como propiedades
 * del componente.
 * 
 * @param {Object} state El estado global de Redux
 */
const mapStateToProps = (state) => ({
  loggedUser: state.user.loggedUser
});

/**
 * Función para mapear acciones despachables para el store de Redux, las
 * cuales llegan como <Props> al componente.
 * 
 * @param {Redux.Dispatcher} dispatch Despachador de acciones de Redux
 */
const mapDispatchToProps = (dispatch) => ({
  /**
   * Callback para redireccionar al stack de Auth
   */
  redirectToLogin: () => {
    dispatch(NavigationActions.navigate({
      routeName: 'Auth'
    }));
  },
  /**
   * Callback para redireccionar al stack de App
   */
  redirectToApp: () => {
    dispatch(NavigationActions.navigate({
      routeName: 'App'
    }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionService);
