import { useState } from 'react';
/* components */
import NewChat from './NewChat';
import Header from './Header';
import ChatList from './ChatList';
import Conversation from './Conversation';
import Profile from './Profile';
import Seed from './Seed';
/* context */
import { ActiveChatProvider } from 'context/ActiveChatContext';

function AuthenticatedApp() {
  return (
    <ActiveChatProvider>
      <Header />
      <div className="flex">
        <NewChat />
        <ChatList />
        <Conversation />
      </div>
      <Profile />
      {/* <Seed /> */}
    </ActiveChatProvider>
  );
}

export default AuthenticatedApp;
