import { useContext, createContext, useState } from 'react';

const DrawerManagerContext = createContext();

export function DrawerManager({ children }) {
   const [open, setOpen] = useState(false);

  return (
    <DrawerManagerContext.Provider value={[ open, setOpen ]}>
      {children}
    </DrawerManagerContext.Provider>
  );
}

export const useDrawer = () => {
  return useContext(DrawerManagerContext);
};
