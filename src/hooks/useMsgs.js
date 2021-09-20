import { useEffect, useState } from 'react';
import { db } from 'lib/firebase';
import { useAuth } from 'context/AuthContext';
import { useActiveChat } from 'context/ActiveChatContext';

export function useMsgs() {
  const { authUser } = useAuth();
  const { contact } = useActiveChat();
  const [msgs, setMsgs] = useState([]);

  const getDerivedChatKey = (user1, user2) => {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };

  const loadMsgs = (msgs) => {
    const transformMsgs = (m) => ({
      ...m,
      sentByMe: m.author === authUser.uid,
      sentAt: m.sentAt.toDate(),
    });
    const chatMsgs = msgs.map(transformMsgs);
    setMsgs(chatMsgs);
  };

  /* observe msgs */
  useEffect(() => {
    if (authUser && contact) {
      const chatId = getDerivedChatKey(authUser.uid, contact.uid);
      return db
        .collection(`chats/${chatId}/msgs`)
        .orderBy('sentAt', 'asc')
        .onSnapshot((snap) => {
          const options = { serverTimestamps: 'estimate' };
          const msgs = snap.docs.map((doc) => ({
            ...doc.data(options),
            id: doc.id,
          }));
          loadMsgs(msgs);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser, contact]);

  useEffect(() => {
    // TODO - cloud function triggers
    if (msgs.length > 0) {
      const chatId = getDerivedChatKey(authUser.uid, contact.uid);

      db.doc(`chats/${chatId}`)
        .set({
          members: [authUser.uid, contact.uid],
          memberInfo: {
            [authUser.uid]: {
              uid: authUser.uid,
              displayName: authUser.displayName,
              photoURL: authUser.photoURL,
            },
            [contact.uid]: {
              uid: contact.uid,
              displayName: contact.displayName,
              photoURL: contact.photoURL,
            },
          },
          lastMsg: msgs[msgs.length - 1],
        })
        .then(() => { })
        .catch((error) => console.log(error.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs]);

  return msgs;
}
