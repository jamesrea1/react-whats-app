import { useActiveChat } from 'context/ActiveChatContext';
import useChatList from './useChatList';
import { formatChatListDate } from 'utils/dates';

function ChatList() {
  const chats = useChatList();
  return (
    <div className="overflow-y-auto">
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
    <button onClick={handleOpenChat} className="block text-left">
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
            {formatChatListDate(lastMsg.sentAt)}
          </p>
        </div>
      </div>
    </button>
  );
}

export default ChatList;
