import { useActiveChat } from 'context/ActiveChatContext';
import useChatList from './useChatList';
import { formatChatListDate } from 'utils/dates';

function ChatList() {
  const chats = useChatList();

  return (
    <div className="overflow-y-auto bg-white border-t border-[#ebebeb]">
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
    </div>
  );
}

function Chat({ chat }) {
  const { contact, lastMsg } = chat;
  const { setContact } = useActiveChat();

  const handleOpenChat = (e) => {
    setContact(chat.contact);
  };

  return (
    <button
      onClick={handleOpenChat}
      className="chat-list-item h-[72px] w-full block text-left bg-white hover:bg-[#f5f5f5]"
    >
      <div className="w-full h-full flex items-stretch">
        <div className="pl-3.5 pr-4 flex items-center flex-none">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              className="w-full h-full rounded-full object-cover"
              src={contact.photoURL || 'default-avatar.svg'}
              alt={contact.displayName}
            />
          </div>
        </div>

        <div className="chat-list-item__details pr-4 flex flex-col justify-center flex-auto min-w-0 border-t border-[#f5f5f5]">
          <div className="flex justify-between items-center">
            <span className="inline-block text-lg text-black leading-6 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {contact.displayName}
            </span>
            <span className="inline-block ml-4 pt-1 text-xs text-black/40 leading-none">
              {formatChatListDate(lastMsg.sentAt)}
            </span>
          </div>
          <div className="mt-0.5 flex justify-between items-center">
            <span className="inline-block text-sm text-black/60 leading-5 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {lastMsg.text}
            </span>
            <span className="inline-block ml-4">x</span>
          </div>
        </div>
      </div>
    </button>
  );
}

// function Avatar() {
//   return (
//     <img
//       className="w-full h-full object-cover"
//       src={contact.photoURL}
//       alt={contact.displayName}
//     />
//   );
// }

// function Button() {
//   return (
//     <button className="w-10 h-10 flex items-center justify-center">
//       <img
//         className="w-full h-full rounded-full"
//         src={authUser.photoURL || 'default-avatar.svg'}
//         alt={authUser.displayName}
//       />
//     </button>
//   );
// }

export default ChatList;
