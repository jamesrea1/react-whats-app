import { useEffect, useState } from 'react';
import { db } from 'lib/firebase';
import { useAuth } from 'auth/useAuth';

/* COMPONENT */
function Conversation() {
  const { authUser } = useAuth();
  const [msgs, setMsgs] = useState();

  useEffect(() => {
    const chatId = 'VpzicsJYgA0SnJFmsi0t'; //icuPCilCIftrXdR7HT4y
    return db.collection(`chats/${chatId}/msgs`).onSnapshot((snap) => {
      const msgs = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(msgs);
      setMsgs(msgs);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Messages</h1>
      <div className="mt-2"></div>
      {msgs && msgs.map((m) => <Message key={m.id} msg={m} />)}
    </div>
  );
}

function Message({ msg }) {
  return <div>{msg.text}</div>;
}

export default Conversation;
