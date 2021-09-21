import React, { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { formatChatListDate, formatMsgTime, isSameDay } from 'utils/dates';
import { db, firebase } from 'lib/firebase';
import { useAuth } from 'context/AuthContext';
import { useActiveChat } from 'context/ActiveChatContext';
import useInput from 'hooks/useInput';
import { useMsgs } from 'hooks/useMsgs';

function ConversationHeader() {
  const { contact } = useActiveChat();

  return (
    <div className="px-4 py-2.5 flex-none flex items-center bg-[#ededed] border-b border-[#d8d8d8]">
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
  const msgs = useMsgs();

  return (
    <div className="flex-1 w-full relative z-0">

      <div
        className="absolute inset-0 bg-chat-tile bg-repeat opacity-10"
        style={{ zIndex: '-1' }}
      ></div>
      <ChatScroller
        className={`msgs-container pt-3 pb-2 absolute inset-0 flex flex-col justify-end overflow-x-hidden overflow-y-auto select-text`}
      >
        {msgs &&
          msgs.map((msg, idx, arr) => {
            const previous = arr[idx - 1];
            const showDateMarker = shouldShowDateMarker(msg, previous);
            const position = getMsgPosition(msg, idx, arr);

            return (
              <React.Fragment key={msg.id}>
                {showDateMarker && <DateMarker date={msg.sentAt} />}
                <Message msg={msg} position={position} />
              </React.Fragment>
            );
          })}
      </ChatScroller>
    </div>
  );
}

function DateMarker({ date }) {
  return (
    <div className="flex justify-center">
      <div className="mb-3 pt-2 pb-2.5 px-3.5 text-xs text-gray-800 leading-none rounded-md bg-[#e1f3fb] shadow">
        {formatChatListDate(date, "'TODAY'").toUpperCase()}
      </div>
    </div>
  );
}

function shouldShowDateMarker(msg, previous) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isFirstOfDay = !isSameDay(msg.sentAt, previous.sentAt);
  if (isFirstOfDay) {
    return true;
  }

  return false;
}

function getMsgPosition(msg, idx, arr) {
  const prev = arr[idx - 1];
  const next = arr[idx + 1];

  const userPrev =
    prev && prev.author === msg.author && isSameDay(prev.sentAt, msg.sentAt);
  const userNext =
    next && next.author === msg.author && isSameDay(next.sentAt, msg.sentAt);

  const isSingle = !userPrev && !userNext;
  if (isSingle) {
    return 'SINGLE';
  }

  const isFront = !userPrev;
  if (isFront) {
    return 'FRONT';
  }

  const isEnd = !userNext;
  if (isEnd) {
    return 'END';
  }

  return 'MID';
}

function Message({ msg, position }) {
  const hasMargin = ['SINGLE', 'END'].includes(position);
  const hasTail = ['SINGLE', 'FRONT'].includes(position);

  return (
    <div
      className={`flex flex-col ${msg.sentByMe ? 'items-end' : 'items-start'}`}
    >
      <div
        className={`relative max-w-[95%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%]
         ${hasMargin ? 'mb-4' : 'mb-1'}
        `}
      >
        {hasTail && <MsgTail msg={msg} />}
        <div
          className={`rounded-md shadow
            ${
              hasTail && msg.sentByMe
                ? 'rounded-tr-none'
                : hasTail
                ? 'rounded-tl-none'
                : ''
            }
            ${msg.sentByMe ? 'bg-[#dcf8c6]' : 'bg-white'}
          `}
        >
          <div className="pt-1.5 pr-[7px] pb-2 pl-[9px]">
            <MessageText msg={msg} />
            <MessageMeta msg={msg} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MsgTail({ msg }) {
  const tailOut = (
    <svg viewBox="0 0 8 13" width="8" height="13">
      <path
        opacity=".15"
        d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
      ></path>
      <path
        fill="currentColor"
        d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
      ></path>
    </svg>
  );
  const tailIn = (
    <svg viewBox="0 0 8 13" width="8" height="13">
      <path
        opacity=".15"
        fill="#0000000"
        d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
      ></path>
      <path
        fill="currentColor"
        d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"
      ></path>
    </svg>
  );

  return (
    <div
      className={`absolute w-2 h-[13px] top-0
        ${msg.sentByMe ? '-right-2 text-[#dcf8c6]' : '-left-2 text-white'}
      `}
    >
      {msg.sentByMe ? tailOut : tailIn}
    </div>
  );
}

function MessageText({ msg }) {
  return (
    <div className="text-sm text-[#303030] break-words whitespace-pre-wrap">
      <span>{msg.text}</span>
      <span className="inline-block w-16 align-middle"></span>
    </div>
  );
}

function MessageMeta({ msg }) {
  return (
    <div
      className="float-right text-[#8c8c8c] text-[11px] leading-[15px] h-[15px]"
      style={{ margin: '-10px 0 -5px 4px' }}
    >
      {formatMsgTime(msg.sentAt)}
      {msg.sentByMe && <MessageStatus />}
    </div>
  );
}

function MessageStatus() {
  return (
    <div className="ml-1 text-[#4fc3f7] w-4 h-[15px] inline-block align-top">
      <svg viewBox="0 0 16 15" width="16" height="15">
        <path
          fill="currentColor"
          d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
        ></path>
      </svg>
    </div>
  );
}

function MsgComposeBox() {
  const { authUser } = useAuth();
  const { contact } = useActiveChat();
  const input = useInput();

  const getDerivedChatKey = (user1, user2) => {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    const chatId = getDerivedChatKey(authUser.uid, contact.uid);
    db.collection(`chats/${chatId}/msgs`)
      .add({
        author: authUser.uid,
        text: input.value.trim(),
        sentAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        //success
      })
      .catch((error) => {
        console.log(error);
      });
    input.setValue('');
  };

  return (
    <div className="px-4 py-2 flex-none flex items-end bg-[#f0f0f0]">
      <div className="flex-none">
        <button
          type="button"
          className="w-10 h-10 mr-0.5 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <IconSmiley />
        </button>
        <button
          type="button"
          className="w-10 h-10 mr-0.5 inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100"
        >
          <IconClip />
        </button>
      </div>

      <form onSubmit={handleMsgSubmit} className="w-full flex items-end">
        <MsgInput
          value={input.value}
          onChange={input.onChange}
          handleMsgSubmit={handleMsgSubmit}
        />
        <button
          type="submit"
          disabled={!input.value.trim()}
          className="
            w-10 h-10 flex-none inline-flex items-center justify-center rounded-full active:bg-black/10 transition-colors ease-out duration-300 active:duration-100
            disabled:opacity-30 disabled:cursor-default
          "
        >
          <IconSend />
        </button>
      </form>
    </div>
  );
}

function MsgInput({ value, onChange, handleMsgSubmit }) {
  const [isFocussed, setIsFocussed] = useState(false);
  const { contact } = useActiveChat();
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.focus();
  }, [contact]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      handleMsgSubmit(e);
    }
  };

  return (
    <div
      className={`w-full min-h-[40px] px-4 py-2 mx-3 flex items-center rounded-3xl
        ${isFocussed ? 'msg-input--is-focussed' : 'bg-white'}
      `}
    >
      <TextareaAutosize
        value={value}
        onChange={onChange}
        onFocus={(e) => setIsFocussed(true)}
        onBlur={(e) => setIsFocussed(false)}
        // onHeightChange={(height) => console.log(height)}
        cacheMeasurements
        minRows={1}
        maxRows={5}
        // autoFocus
        ref={textAreaRef}
        onKeyDown={handleKeyDown}
        placeholder="Type a message"
        className="flex-1 w-full pr-1 resize-none outline-none bg-transparent
          text-[15px] leading-5 text-gray-700 placeholder-gray-400
        "
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

function ChatScroller({ children, className }) {
  const scrollRef = useRef();
  const shouldScrollRef = useRef(true);

  useEffect(() => {
    if (shouldScrollRef.current) {
      const node = scrollRef.current;
      node.scrollTop = node.scrollHeight - node.clientHeight;
    }
  });

  const handleScroll = () => {
    const node = scrollRef.current;
    const atBottom = node.scrollTop === node.scrollHeight - node.clientHeight;
    shouldScrollRef.current = atBottom;
  };

  return (
    <div ref={scrollRef} onScroll={handleScroll} className={className}>
      {children}
    </div>
  );
}

export { ConversationHeader, Conversation, MsgComposeBox };
