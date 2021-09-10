import { ActiveChatProvider } from 'context/ActiveChatContext';
import { useAuth } from 'context/AuthContext';
import ChatList from './ChatList';
import NewChat from './NewChat';

function AuthenticatedApp() {
  return (
    <ActiveChatProvider>
      <LayoutWrapper>
        <ChatListPanel>
          <ChatListHeader />
          <ChatList />
        </ChatListPanel>
        <ConversationPanel>
          <NewChat />
        </ConversationPanel>
      </LayoutWrapper>
    </ActiveChatProvider>
  );
}

function LayoutWrapper({ children }) {
  return (
    <div className="app-wrapper">
      <div className="app-wrapper__inner">
        <div className="flex w-full h-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
function ChatListPanel({ children }) {
  return (
    <div class="min-w-[300px] h-full flex-[40%] md:flex-[35%] xl:flex-[30%] ">
      <div className="h-full flex flex-col">{children}</div>
    </div>
  );
}
function ConversationPanel({ children }) {
  return (
    <div class="h-full flex-[60%] md:flex-[65%] xl:flex-[70%]">
      <div className="h-full flex flex-col bg-gray-200">{children}</div>
    </div>
  );
}
function ChatListHeader() {
  const { authUser } = useAuth();
  return (
    <div className="px-4 py-2.5 flex items-center justify-between bg-[#ededed]">
      <div className="flex-shrink-0">
        <button className="w-10 h-10 flex items-center justify-center">
          <img
            className="w-full h-full rounded-full"
            src={authUser.photoURL || 'default-avatar.svg'}
            alt={authUser.displayName}
          />
        </button>
      </div>
      <div className="flex flex-shrink-0 ml-4">
        <button
          type="button"
          className="w-10 h-10 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" class="">
            <path
              fill="currentColor"
              d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 ml-2 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" class="">
            <path
              fill="currentColor"
              d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 ml-2 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" class="">
            <path
              fill="currentColor"
              d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default AuthenticatedApp;
