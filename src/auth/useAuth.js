import { useEffect, useContext, createContext, useReducer } from 'react';
import { auth } from 'lib/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    return auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const user = {
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
        };
        dispatch({ type: 'AUTH_CHANGE', auth: user });
      } else {
        dispatch({ type: 'AUTH_CHANGE', auth: null });
      }
    });
  }, []);

  return { ...state, dispatch };
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_CHANGE':
      return { ...state, authAttempted: true, auth: action.auth };
    case 'LOAD_USER':
      return { ...state, user: action.user };
    default:
      throw new Error('Unexpected action');
  }
};

const initialState = { authAttempted: false, auth: null, user: null };
