import { db } from 'lib/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from 'auth/useAuth';
import { chatListDate } from 'utils/dates';

function ChatList({ setActiveChatContact }) {
  const [chats, setChats] = useState([]);
  const { authUser } = useAuth();

  const loadChats = (chats) => {
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
    setChats(chatList);
  };

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
          loadChats(chats);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.uid]);

  return (
    <div className="p-4 flex-initial max-w-xs">
      <h1 className="text-lg font-bold">Chat List</h1>
      <div className="mt-2">
        {chats &&
          chats.map((c) => (
            <Chat
              chat={c}
              setActiveChatContact={setActiveChatContact}
              key={c.id}
            />
          ))}
      </div>
    </div>
  );
}

/* COMPONENT */
function Chat({ chat, setActiveChatContact }) {
  const { contact, lastMsg } = chat;

  const handleOpenChat = (e) => {
    setActiveChatContact(contact);
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
          <p className="text-sm text-gray-500">{lastMsg.text}</p>
          <p className="text-xs text-gray-500">
            {chatListDate(lastMsg.sentAt)}
          </p>
        </div>
      </div>
    </button>
  );
}

export default ChatList;
