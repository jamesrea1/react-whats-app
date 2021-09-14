import { ActiveChatProvider } from 'context/ActiveChatContext';
import { ChatListHeader, ChatListSearch, ChatList } from './ChatList';
import {
  ConversationHeader,
  Conversation,
  MsgComposeBox,
} from './Conversation';
import { useActiveChat } from 'context/ActiveChatContext';
import NewChat from './NewChat';
import React from 'react';

function AuthenticatedApp() {
  return (
    <ActiveChatProvider>
      <PrimaryLayout />
    </ActiveChatProvider>
  );
}

function PrimaryLayout() {
  const { contact } = useActiveChat();

  return (
    <LayoutWrapper>
      <ChatListPanel>
        <ChatListHeader />
        <ChatListSearch />
        <ChatList />
      </ChatListPanel>
      <ConversationPanel>
        {contact ? (
          <>
            <ConversationHeader />
            <Conversation />
            <MsgComposeBox />
          </>
        ) : (
          <IntroPanel />
        )}
      </ConversationPanel>
    </LayoutWrapper>
  );
}

function LayoutWrapper({ children }) {
  return (
    <div className="app-wrapper">
      <div className="app-wrapper__inner">
        <div className="flex items-stretch w-full h-full overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

function ChatListPanel({ children }) {
  return (
    <div className="min-w-[300px] h-full flex-[40%] md:flex-[35%] xl:flex-[30%] ">
      <div className="h-full flex flex-col">{children}</div>
    </div>
  );
}

function ConversationPanel({ children }) {
  return (
    <div className="h-full flex-[60%] md:flex-[65%] xl:flex-[70%] border-l border-[#dddddd]">
      <div className="h-full flex flex-col items-stretch bg-[#e5ddd5]">
        {children}
      </div>
    </div>
  );
}

function IntroPanel() {
  return (
    <div className="px-8 relative flex-auto flex flex-col justify-center items-center bg-[#f8f9fa]">
      <div className="h-32 w-32">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
          <g fill="none" fillRule="evenodd">
            <path
              d="M30 60c16.569 0 30-13.431 30-30C60 13.431 46.569 0 30 0 13.431 0 0 13.431 0 30c0 16.569 13.431 30 30 30Z"
              fill="#4adf83"
            />
            <path
              d="M30.071 46.221a16.34 16.34 0 0 1-7.885-2.014l-9.032 2.87 2.944-8.685a16.022 16.022 0 0 1-2.34-8.358c0-8.94 7.303-16.188 16.314-16.188 9.009 0 16.313 7.247 16.313 16.188 0 8.94-7.304 16.187-16.314 16.187Zm0-29.797c-7.563 0-13.715 6.105-13.715 13.61 0 2.977.97 5.735 2.612 7.979l-1.713 5.054 5.27-1.675a13.708 13.708 0 0 0 7.546 2.251c7.562 0 13.716-6.105 13.716-13.609s-6.154-13.61-13.716-13.61Zm8.238 17.338c-.1-.165-.367-.265-.766-.463-.4-.199-2.367-1.159-2.733-1.29-.367-.133-.634-.2-.9.198-.266.397-1.033 1.29-1.267 1.555-.233.265-.466.298-.866.1-.4-.199-1.688-.618-3.216-1.97-1.188-1.051-1.991-2.35-2.224-2.747-.233-.397-.025-.612.175-.81.18-.177.4-.463.6-.694.2-.232.267-.397.4-.662s.067-.496-.033-.695c-.1-.199-.9-2.151-1.234-2.946-.333-.794-.665-.661-.9-.661-.233 0-.5-.034-.766-.034s-.7.1-1.066.497c-.367.397-1.4 1.357-1.4 3.31 0 1.952 1.433 3.838 1.633 4.102.2.265 2.766 4.402 6.83 5.99 4.067 1.589 4.067 1.059 4.8.993.733-.066 2.365-.96 2.7-1.886.332-.927.332-1.722.233-1.887Z"
              fill="#FFF"
            />
          </g>
        </svg>
      </div>
      <h1 className="mt-10 text-center text-3xl font-light text-[#525252]">
        Select a contact and start messaging!
      </h1>
      <p className="mt-4 text-center text-sm text-gray-400">
        Open your <span className="text-[#0aa545]">contacts</span> list to start
        a new chat
      </p>
      <div className=""></div>
      <div className="absolute w-full h-1.5 bottom-0 bg-[#4adf83]"></div>
    </div>
  );
}

export default AuthenticatedApp;
