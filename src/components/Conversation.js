import { useEffect, useState } from 'react';
import { db, firebase } from 'lib/firebase';
import { useAuth } from 'context/AuthContext';
import { useActiveChat } from 'context/ActiveChatContext';
import useInput from 'utils/useInput';
import { formatMsgDate } from 'utils/dates';

function useConversation() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgs]);

  return msgs;
}

function ConversationHeader() {
  const { contact } = useActiveChat();
  return (
    <div className="px-4 py-2.5 flex-none flex items-center bg-[#ededed]">
      <div className="flex-none pr-4">
        <button className="w-10 h-10 flex items-center justify-center">
          <img
            className="w-full h-full rounded-full object-cover"
            src={contact.photoURL || 'default-avatar.svg'}
            alt={contact.displayName}
          />
        </button>
      </div>
      <div className="flex-1 text-lg text-black leading-6 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {contact.displayName}
      </div>
    </div>
  );
}

function Conversation() {
  const msgs = useConversation();
  // e5ddd5
  // 1 1 0
  // > 100, 100 - flex-col
  // >   overflow-wrap: break-word;
  // >   white-space: pre-wrap;

  return (
    <div className="p-4 relative z-0 flex-1 flex flex-col overflow-x-hidden overflow-y-scroll select-text">
      <div
        className="absolute w-full h-full top-0 bg-chat-tile bg-repeat opacity-10"
        style={{ zIndex: '-1' }}
      ></div>
      {msgs && msgs.map((m) => <Message key={m.id} msg={m} />)}
    </div>
  );
}

function Message({ msg }) {
  //flex end
  //    overflow-wrap: break-word;
  //white-space: pre-wrap;
  //redus 7.5px
  //shadow
  // max-w 95,85,75,65

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

function ComposeBox() {
  const { authUser } = useAuth();
  const { contact } = useActiveChat();
  const composeMsgInput = useInput();

  const getDerivedChatKey = (user1, user2) => {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };

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
    <div className="px-4 py-3 flex-none flex items-center      bg-[#f0f0f0]    [ border-b-4 border-[#666] ]">
      <div>
        <button
          type="button"
          className="w-10 h-10 mr-0.5 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <IconSmiley />
        </button>
        <button
          type="button"
          className="w-10 h-10 mr-3 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <IconClip />
        </button>
      </div>

      <form onSubmit={handleMsgSubmit} className="flex-auto">
        <div className="flex">
          <MsgInput composeMsgInput={composeMsgInput} />
          <button
            type="button"
            className="w-10 h-10  inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
          >
            <IconSend />
          </button>{' '}
        </div>
      </form>
    </div>
  );
}

function MsgInput({ composeMsgInput }) {
  return (
    <div className="flex items-center bg-white rounded-full px-4 py-2">
      <input
        {...composeMsgInput.attrs}
        placeholder="Type a message"
        className="text-[15px] text-gray-700 placeholder-gray-400 outline-none flex-auto"
      />
    </div>
  );
}

function IconSmiley() {
  return (
    <svg className="w-[26px] h-[26px]" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
      />
    </svg>
  );
}

function IconClip() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"
      ></path>
    </svg>
  );
}

function IconSend() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
      />
    </svg>
  );
}

export { ConversationHeader, Conversation, ComposeBox };
