// import { useEffect, useState } from 'react';
// import { db, auth, firebase } from 'lib/firebase';
// import { useAuth } from 'auth/useAuth';
import NewChat from './NewChat';
import Header from './Header';
import ChatList from './ChatList';
import Seed from './Seed';
import Conversation from './Conversation';

function AuthenticatedApp() {
  // const handleNewChat = () => {};

  return (
    <>
      <Header />
      <NewChat />
      <ChatList />
      <Conversation />
      <Seed />
    </>
  );
}

export default AuthenticatedApp;
