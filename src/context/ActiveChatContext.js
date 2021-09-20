import { useContext, createContext, useState } from 'react';

const ActiveChatContext = createContext();

export function ActiveChatProvider({ children }) {
   const [contact, setContact] = useState();

  return (
    <ActiveChatContext.Provider value={{ contact, setContact }}>
      {children}
    </ActiveChatContext.Provider>
  );
}

export const useActiveChat = () => {
  return useContext(ActiveChatContext);
};
