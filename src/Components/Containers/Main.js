import { View } from 'react-native'
import React, { useState } from 'react'
import Drawer from '@Components/Drawer'
import Header from '@Components/Header'
import SidebarComponent from '@Components/Sidebar';


/**
 * Componente usado como contenedor de la aplicación
 * 
 * @param {Object} props Las propiedades del componente
 */
const MainContainer = ({ children, onAddAddress }) => {
  const [ visible, setVisibility ] = useState(false);

  return <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .2)' }}>
    <Drawer
      style={{  }}
      visible={visible}
      contentDrawer={(<SidebarComponent onAddAddress={onAddAddress} />)}
      onClose={() => { setVisibility(false) }}
    >
      <View bounces={false} style={{ flex: 1 }}>
        <Header onOpenDrawer={() => { setVisibility(true) }} />
        { children }
      </View>
    </Drawer>
  </View>
};

export default MainContainer;
