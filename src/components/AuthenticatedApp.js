import { useState } from 'react';
/* components */
// import NewChat from './NewChat';
// import Header from './Header';
// import ChatList from './ChatList';
// import Conversation from './Conversation';
// import Profile from './Profile';
// import Seed from './Seed';
/* context */
import { ActiveChatProvider } from 'context/ActiveChatContext';

function AuthenticatedApp() {
  return (
    <ActiveChatProvider>
      <LayoutWrapper>
        <ChatListPanel>asd</ChatListPanel>
        <ConversationPanel>asd</ConversationPanel>
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
    <div class="min-w-[300px] flex-[40%] md:flex-[35%] xl:flex-[30%] ">
      {children}
    </div>
  );
}
function ConversationPanel({ children }) {
  return (
    <div class="flex-[60%] md:flex-[65%] xl:flex-[70%] border-2 border-gray-800">
      {children}
    </div>
  );
}

export default AuthenticatedApp;
