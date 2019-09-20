/**
 * Este archivo define las constantes usadas para el tema.
 * 
 * Al momento de implementar un proveedor de temas, este archivo
 * puede cambiar para exportar los colores de acuerdo al tema usado
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Estas guías están basadas en el estandar de desarrollo
// para moviles con pantalla de ~5"
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => width / guidelineBaseWidth * size;
export const verticalScale = size => height / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

// Define los colores principales de la aplicación
export const MAIN_COLOR = '#D6E2E2';
export const ACCENT_COLOR = '#F1851F';
