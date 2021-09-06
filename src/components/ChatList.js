import { db } from 'lib/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from 'auth/useAuth';

function ChatList() {
  const [chats, setChats] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser && authUser.uid) {
      db.collection('chats')
        .where('users', 'array-contains', authUser.uid)
        .onSnapshot((snap) => {
          const chats = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setChats(chats);
        });
    }
  }, [authUser.uid]);

  /* RENDER */
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Chat List</h1>
      <div className="mt-2"></div>
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
    </div>
  );
}

/* COMPONENT */
function Chat({ chat }) {
  return (
    <div>
      <p className="mb-2">
        {chat.userProfiles[chat.users[0]].displayName} -{' '}
        {chat.userProfiles[chat.users[1]].displayName}
      </p>
    </div>
  );
}

export default ChatList;
