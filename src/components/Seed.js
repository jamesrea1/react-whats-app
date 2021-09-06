import { db, firebase } from 'lib/firebase';

function Seed() {
  const seedChat = () => {
    const batch = db.batch();

    Object.entries(chatsData).forEach(([chatId, chatData]) => {
      const chatRef = db.doc(`chats/${chatId}`);
      batch.set(chatRef, chatData);
    });

    batch.commit().catch((error) => {
      console.log(error);
    });
  };

  const seedMsgs = () => {
    const batch = db.batch();

    Object.entries(msgsData).forEach(([chatId, msgs]) => {
      const msgsRef = db.collection(`chats/${chatId}/msgs`);

      msgs.forEach((msg) => {
        const msgRef = msgsRef.doc();
        batch.set(msgRef, msg);
      });
    });

    batch.commit().catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="p-4 bg-red-400">
      <button className="px-2 py-1 bg-red-700 text-white" onClick={seedChat}>
        seed chat
      </button>
      <button className="px-2 py-1 bg-red-700 text-white" onClick={seedMsgs}>
        seed msgs
      </button>
    </div>
  );
}

export default Seed;

const users = {
  james: 'IPy5AoZF7caQgFyOL1X5PlfM5CP2',
  ste: 'XfLoq3OnKwUnIWqvZFy1kchfqz83',
  jake: 'VnweQsAZpvZbFJ05MeHL03kErto2',
  kate: 'sYV6FpFVqNRdrV0RYaYfWVYrkTv2',
};

function createChatId(user1, user2) {
  return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
}

const chatsData = {
  [createChatId(users.james, users.jake)]: {
    members: [users.james, users.jake],
    memberInfo: {
      [users.james]: {
        displayName: 'James',
        photoURL: '/james.jpg',
      },
      [users.jake]: {
        displayName: 'Jake',
        photoURL: '/jake.jpg',
      },
    },
    lastMsg: {
      author: users.jake,
      text: 'Time to make rabbit stew!',
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-08-30T00:32:00')
      ),
    },
  },
  [createChatId(users.james, users.ste)]: {
    members: [users.james, users.ste],
    memberInfo: {
      [users.james]: {
        displayName: 'James',
        photoURL: '/james.jpg',
      },
      [users.ste]: {
        displayName: 'Ste',
        photoURL: '/ste.jpg',
      },
    },
    lastMsg: {
      author: users.james,
      text: 'Oh awesome!  Yeah yeah all good dude 😁 xx',
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-09-04T18:52:00')
      ),
    },
  },
  [createChatId(users.kate, users.ste)]: {
    members: [users.kate, users.ste],
    memberInfo: {
      [users.ste]: {
        displayName: 'Ste',
        photoURL: '/ste.jpg',
      },
      [users.kate]: {
        displayName: 'Kate',
        photoURL: '/kate.jpg',
      },
    },
    lastMsg: {
      author: users.kate,
      text: "Hi steve, it's kate here!",
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-09-06T12:43:00')
      ),
    },
  },
};

const msgsData = {
  [createChatId(users.james, users.ste)]: [
    {
      author: users.james,
      text: 'Oh awesome! Yeah yeah all good dude 😁 xx',
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-09-04T18:52:00')
      ),
    },
    {
      author: users.ste,
      text: 'How you doing? Xx',
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-09-04T17:42:30')
      ),
    },
    {
      author: users.ste,
      text: 'At Neighbourhood Weekender with Kate x',
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-09-04T17:42:20')
      ),
    },
  ],

  [createChatId(users.james, users.jake)]: [
    {
      author: users.james,
      text:
        'I don wanna talk to you no more.. youuu empty headed.. animal food trough.. wippperrr',
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-08-30T00:31:00')
      ),
    },
    {
      author: users.jake,
      text: 'Time to make rabbit stew',
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-08-30T00:32:00')
      ),
    },
  ],
};
