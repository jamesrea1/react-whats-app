import { db } from 'lib/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthContext';

function useChatList() {
  const [chats, setChats] = useState([]);
  const { authUser } = useAuth();

  const transformChats = (chats) => {
    const findContact = (memberInfo) =>
      Object.values(memberInfo).find((member) => member.uid !== authUser.uid);

    const transformChat = (c) => ({
      id: c.id,
      lastMsg: {
        ...c.lastMsg,
        sentByMe: c.lastMsg.author === authUser.uid,
        sentAt: c.lastMsg.sentAt.toDate(),
      },
      contact: findContact(c.memberInfo),
    });

    const sortByDate = (a, b) => {
      return a.lastMsg.sentAt > b.lastMsg.sentAt
        ? -1
        : a.lastMsg.sentAt < b.lastMsg.sentAt
        ? 1
        : 0;
    };

    const chatList = chats.map(transformChat).sort(sortByDate);
    return chatList;
  };

  /* observe chats */
  useEffect(() => {
    if (authUser && authUser.uid) {
      return db
        .collection('chats')
        .where('members', 'array-contains', authUser.uid)
        .onSnapshot((snap) => {
          const chats = snap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setChats(transformChats(chats));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.uid]);

  return chats;
}

export default useChatList;
