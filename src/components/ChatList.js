import { formatChatListDate } from 'utils/dates';
import { useAuth } from 'context/AuthContext';
import { useActiveChat } from 'context/ActiveChatContext';
import useChatList from 'hooks/useChatList';
import { useDrawer } from 'context/DrawerManager';
import ChatListHeaderDropdown from 'components/ChatListHeaderDropdown';
import SearchBox from './SearchBox';

function ChatListHeader() {
  const { authUser } = useAuth();
  const { setOpen } = useDrawer();

  const handleNewChatClick = () =>{
    setOpen(true);
  }

  return (
    <div className="px-4 py-2.5 flex items-center justify-between bg-[#ededed]">
      <div className="flex-none">
        <button className="w-10 h-10 flex items-center justify-center">
          <img
            className="w-full h-full rounded-full object-cover"
            src={authUser.photoURL || 'default-avatar.svg'}
            alt={authUser.displayName}
          />
        </button>
      </div>
      <div className="flex flex-none ml-4">
        <button
          type="button"
          className="w-10 h-10 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          onClick={handleNewChatClick}
          className="w-10 h-10 ml-2 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
            ></path>
          </svg>
        </button>
        <ChatListHeaderDropdown />
      </div>
    </div>
  );
}

function ChatListSearch() {
  return <SearchBox />;
}

function ChatList() {
  const chats = useChatList();

  return (
    <div className="flex-auto overflow-y-auto bg-white border-t border-[#ebebeb]">
      {chats && chats.map((c) => <Chat chat={c} key={c.id} />)}
    </div>
  );
}

function Chat({ chat }) {
  const { contact, lastMsg } = chat;

  const {
    contact: activeContact,
    setContact: setActiveContact,
  } = useActiveChat();

  const handleOpenChat = (e) => {
    setActiveContact(contact);
  };

  return (
    <button
      onClick={handleOpenChat}
      className={`chat-list-item h-[72px] w-full block flex-none text-left transition-colors
        ${
          activeContact && contact.uid === activeContact.uid
            ? 'bg-[#ebebeb] hover:bg-[#ebebeb]'
            : 'bg-white hover:bg-[#f5f5f5]'
        }
      `}
    >
      <div className="w-full h-full flex items-stretch">
        {/* avatar */}
        <div className="pl-3.5 pr-4 flex items-center flex-none">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              className="w-full h-full rounded-full object-cover"
              src={contact.photoURL || 'default-avatar.svg'}
              alt={contact.displayName}
            />
          </div>
        </div>
        {/* chat details */}
        <div
          className={`chat-list-item__details pr-4 flex flex-col justify-center flex-auto min-w-0 border-t
          ${
            activeContact && contact.uid === activeContact.uid
              ? 'border-[#ebebeb]'
              : 'border-[#f5f5f5]'
          }
        `}
        >
          {/* contact */}
          <div className="flex justify-between items-center">
            <span className="inline-block text-lg text-black leading-6 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {contact.displayName}
            </span>
            <span className="inline-block ml-4 pt-1 text-xs text-black/40 leading-none">
              {formatChatListDate(lastMsg.sentAt)}
            </span>
          </div>
          {/* last msg */}
          <div className="mt-0.5 flex justify-between items-center">
            <div className="flex items-center flex-1 min-w-0">
              {lastMsg.sentByMe && <MsgStatus msg={lastMsg} />}
              <span className="block text-sm text-black/60 leading-5  [ overflow-hidden overflow-ellipsis whitespace-nowrap ]">
                {lastMsg.text}
              </span>
            </div>
            {/* <span className="inline-block ml-4">UNREAD STATUS</span> */}
          </div>
        </div>
      </div>
    </button>
  );
}

function MsgStatus() {
  return (
    <div className="w-18 h-18 inline-block mr-0.5 text-[#4fc3f7]">
      <svg viewBox="0 0 18 18" width="18" height="18">
        <path
          fill="currentColor"
          d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
        ></path>
      </svg>
    </div>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
      ></path>
    </svg>
  );
}

// eslint-disable-next-line no-unused-vars
function IconCancel() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <path
        fill="currentColor"
        d="M17.25 7.8L16.2 6.75l-4.2 4.2-4.2-4.2L6.75 7.8l4.2 4.2-4.2 4.2 1.05 1.05 4.2-4.2 4.2 4.2 1.05-1.05-4.2-4.2 4.2-4.2z"
      ></path>
    </svg>
  );
}

// eslint-disable-next-line no-unused-vars
function IconBackArrow() {
  return (
    <div className="text-[#33b7f6]">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <path
          fill="currentColor"
          d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"
        ></path>
      </svg>
    </div>
  );
}

export { ChatListHeader, ChatListSearch, ChatList };
