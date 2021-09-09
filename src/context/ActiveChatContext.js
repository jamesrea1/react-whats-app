import { useContext, createContext, useState } from 'react';

const ActiveChatContext = createContext();

export function ActiveChatProvider({ children }) {
  // const [state, dispatch] = useReducer(
  //   (state, action) => {
  //     switch (action.type) {
  //       case 'LOAD_CHAT':
  //         return { ...action.chat };
  //       case 'LOAD_CONTACT':
  //         return { contact: action.contact };
  //       default:
  //         return state;
  //     }
  //   },
  //   { id: null, lastMsg: null, contact: null }
  // );

  // const contextValue = {
  //   ...state,
  //   loadActiveChat(chat) {
  //     dispatch({ type: 'LOAD_CHAT', chat });
  //   },
  // };

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
