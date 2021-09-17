import { useEffect, useContext, createContext, useState } from 'react';
import { auth, db } from 'lib/firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [authAttempted, setAuthAttempted] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL, //`https://i.pravatar.cc/100?u=${firebaseUser.uid}`,
        };
        setAuthUser(user);
        db.doc(`users/${user.uid}`)
          .set(user, { merge: true })
          .catch((error) => console.log('Error: ' + error.message));
      } else {
        setAuthUser(null);
      }
      setAuthAttempted(true);
    });
  }, []);

  return { authAttempted, authUser };
}
