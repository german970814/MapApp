import { Drawer } from 'native-base'
import React, { createRef, useEffect } from 'react'

/**
 * Componenete de Drawer
 * 
 * @param {Object} param0 Las propiedades del componente
 */
const DrawerComponent = ({ visible, contentDrawer, children, onClose }) => {
  const drawer = createRef();

  useEffect(() => {
    (visible && drawer) && drawer.current._root.open();
  }, [visible]);

  return <Drawer
    ref={drawer}
    content={contentDrawer}
    onClose={() => {
      drawer && drawer.current._root.close()
      onClose && onClose()
    }}
  >
    { children }
  </Drawer>
}

export default DrawerComponent;
