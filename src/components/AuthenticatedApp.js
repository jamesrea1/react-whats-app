// import { useEffect, useState } from 'react';
// import { db, auth, firebase } from 'lib/firebase';
// import { useAuth } from 'auth/useAuth';
import NewChat from './NewChat';
import Header from './Header';
import ChatList from './ChatList';
import Seed from './Seed';
import Conversation from './Conversation';
import { useState } from 'react';

import Profile from './Profile';

function AuthenticatedApp() {
  const [activeChatContact, setActiveChatContact] = useState();

  return (
    <>
      <Header />
      <div className="flex">
        <NewChat setActiveChatContact={setActiveChatContact} />
        <ChatList setActiveChatContact={setActiveChatContact} />
        <Conversation contact={activeChatContact} />
      </div>
      <Profile />
      {/* <Seed /> */}
    </>
  );
}

export default AuthenticatedApp;
