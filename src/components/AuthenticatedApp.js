import { useEffect, useState } from 'react';
import { auth, db } from 'lib/firebase';
import { useAuth } from 'auth/useAuth';

function AuthenticatedApp() {
  //const [contacts, setContacts] = useState();

  //useEffect(() => {});

  //new chat
  //chats
  //drawer:contacts
  //conversation
  //  msgs
  //  compose msg

  const { auth: user } = useAuth();

  const handleLogOut = (e) => {
    auth.signOut();
  };

  return (
    <>
      <h1 className="text-lg font-bold">Logged In</h1>
      <div className="mb-4">
        {user &&
          Object.entries(user).map(([key, val]) => (
            <div key={key}>
              <span className="inline-block w-24">{key}:</span>{' '}
              <span className="font-bold pl-2">{val}</span>
            </div>
          ))}
        <button
          className="bg-blue-500 px-4 py-2 text-white rounded mt-2"
          onClick={handleLogOut}
        >
          log out
        </button>
      </div>
    </>
  );
}

export default AuthenticatedApp;
