import { useEffect, useState } from 'react';
import { db } from 'lib/firebase';
import { useAuth } from 'context/AuthContext';
import { useActiveChat } from 'context/ActiveChatContext';

function NewChat() {
  const { authUser } = useAuth();
  const [contacts, setContacts] = useState();

  const loadContacts = (users) => {
    const contacts = users.filter((u) => u.uid !== authUser.uid);
    setContacts(contacts);
  };

  /* fetch contacts */
  useEffect(() => {
    if (authUser) {
      db.collection('users')
        // .where('uid', '!=', authUser.uid)
        .orderBy('sortName', 'asc')
        .get()
        .then((res) => {
          const users = res.docs.map((doc) => doc.data());
          loadContacts(users);
        });
    }
  }, [authUser]);

  /* RENDER - list contacts */
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Contacts</h1>
      <div className="mt-2"></div>
      {contacts && contacts.map((c) => <Contact contact={c} key={c.uid} />)}
    </div>
  );
}

/* COMPONENT */
function Contact({ contact }) {
  const { setContact } = useActiveChat();

  const handleOpenChat = (e) => {
    setContact(contact);
  };

  return (
    <button onClick={handleOpenChat} className="mb-4 block text-left">
      <div className="flex">
        <div className="w-12 h-12 mr-4 rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={contact.photoURL}
            alt={contact.displayName}
          />
        </div>
        <div>
          <p className="text-xl">{contact.displayName}</p>
          <p className="text-sm text-gray-500">
            Hey there! I am using WhatsApp.
          </p>
        </div>
      </div>
    </button>
  );
}

export default NewChat;
