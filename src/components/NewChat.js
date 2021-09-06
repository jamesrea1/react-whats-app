import { useEffect, useState } from 'react';
import { db } from 'lib/firebase';
import { useAuth } from 'auth/useAuth';

/* COMPONENT */
function NewChat() {
  const { authUser } = useAuth();
  const [contacts, setContacts] = useState();

  /* fetch contacts */
  useEffect(() => {
    if (authUser) {
      db.collection('users')
        .where('uid', '!=', authUser.uid)
        .get()
        .then((res) => {
          const users = res.docs.map((doc) => doc.data());
          setContacts(users);
        });
    }
  }, [authUser]);

  /* RENDER - list contacts */
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Contacts</h1>
      <div className="mt-2"></div>
      {contacts && contacts.map((c) => <Contact user={c} key={c.uid} />)}
    </div>
  );
}

/* COMPONENT */
function Contact({ user }) {
  return (
    <div>
      <p className="mb-2">{user.displayName}</p>
    </div>
  );
}

export default NewChat;
