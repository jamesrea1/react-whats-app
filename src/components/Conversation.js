import { useEffect, useState } from 'react';
import { db, firebase } from 'lib/firebase';
import { useAuth } from 'context/AuthContext';
import { useActiveChat } from 'context/ActiveChatContext';
import useInput from 'utils/useInput';
import { formatMsgDate } from 'utils/dates';

function Conversation() {
  const { authUser } = useAuth();
  const { contact } = useActiveChat();
  const [msgs, setMsgs] = useState([]);
  const composeMsgInput = useInput();

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
  }, [authUser, contact]);

  /* set chat document after new msg */
  useEffect(() => {
    // TRIGGER - CREATE CHAT DOC & UPDATE LASTMSG INFO
    //
    // only set a chat obj when first message is posted (dont wnat a chat object if no messages)
    // update chat.lastMsg obj with every new msg
    //
    // OR.. set both after every msg? (same object - 1 write)
    //
    // CLOUD FUNCTIONS???

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
        .then(() => {})
        .catch((error) => console.log(error.message));
    }
  }, [msgs]);

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    const chatId = getDerivedChatKey(authUser.uid, contact.uid);
    db.collection(`chats/${chatId}/msgs`)
      .add({
        author: authUser.uid,
        text: composeMsgInput.value,
        sentAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        //success
      })
      .catch((error) => {
        console.log(error);
      });
    composeMsgInput.setValue('');
  };

  return (
    <div className="p-4 flex-auto">
      <h1 className="text-xs font-bold text-gray-700 -ml-4">
        ConversationPanel
      </h1>
      <div className="mb-8">
        <h1 className="text-lg font-bold">ConversationHeader</h1>
        <p className="mt-2 text-3xl">{contact && contact.displayName}</p>
      </div>
      <div className="mb-8">
        <h1 className="text-lg font-bold">MsgList</h1>
        <div className="mt-2">
          {msgs && msgs.map((m) => <Message key={m.id} msg={m} />)}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-lg font-bold">ComposeBox</h1>
        <form onSubmit={handleMsgSubmit} className="mt-2">
          <input {...composeMsgInput.attrs} />
          <button>send</button>
        </form>
      </div>
    </div>
  );
}

function Message({ msg }) {
  return (
    <div className="flex mb-8">
      <div
        className={`rounded-md ${
          msg.sentByMe ? 'ml-auto bg-green-100' : 'bg-white'
        }`}
      >
        <div className="max-w-sm  px-3 py-2  text-sm}">
          <p>{msg.text}</p>
          <p>{formatMsgDate(msg.sentAt)}</p>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
