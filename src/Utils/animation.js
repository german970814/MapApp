import Animated, { Easing } from 'react-native-reanimated'

const { Value, block, cond, clockRunning, set, startClock, timing, stopClock } = Animated;

/**
 * Función para crear la animación de timing
 * 
 * @param {Animated.Clock} clock El reloj de la animación
 * @param {Number} value El valor desde donde empieza la animación
 * @param {Number} dest El valor donde debe terminar la animación
 * @param {Object} configuration La configuración que se desea sobreescribir
 */
export const runTiming = (clock, value, dest, configuration={}) => {
  const state = {
    time: new Value(0),
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 100,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
    ...configuration,
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
    cond(state.finished, stopClock(clock)),
    state.position
  ]);
}
