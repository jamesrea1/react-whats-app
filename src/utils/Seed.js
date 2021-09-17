import { db, firebase } from 'lib/firebase';

function Seed() {
  const seedChat = () => {
    const batch = db.batch();

    Object.entries(chatsTestUser).forEach(([id, chatData]) => {
      const chatRef = db.doc(`chats/${id}`);
      batch.set(chatRef, chatData);
    });

    batch.commit().catch((error) => {
      console.log(error);
    });
  };

  const seedMsgs = () => {
    const batch = db.batch();

    Object.entries(msgsData).forEach(([id, msgs]) => {
      const msgsRef = db.collection(`chats/${id}/msgs`);

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
  testUser: '0KnCJwEqiMP9xAMrh5Jomb0qtdE2',
  jim: 'IPy5AoZF7caQgFyOL1X5PlfM5CP2',
  harold: 'VnweQsAZpvZbFJ05MeHL03kErto2',
  lou: 'XfLoq3OnKwUnIWqvZFy1kchfqz83',
  madge: 'CmauC0AoDFagG6pJYlpas0KC9Ej1',
  susan: 'sYV6FpFVqNRdrV0RYaYfWVYrkTv2',
  daphne: 'HZK3CSV0mXYe90wU9ZImT2favQD3',
};

function getDerivedChatKey(user1, user2) {
  return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
}

const chatsData = {
  [getDerivedChatKey(users.james, users.jake)]: {
    members: [users.james, users.jake],
    memberInfo: {
      [users.james]: {
        uid: users.james,
        displayName: 'James',
        photoURL: '/james.jpg',
      },
      [users.jake]: {
        uid: users.jake,
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
  [getDerivedChatKey(users.james, users.ste)]: {
    members: [users.james, users.ste],
    memberInfo: {
      [users.james]: {
        uid: users.james,
        displayName: 'James',
        photoURL: '/james.jpg',
      },
      [users.ste]: {
        uid: users.ste,
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
  [getDerivedChatKey(users.kate, users.ste)]: {
    members: [users.kate, users.ste],
    memberInfo: {
      [users.ste]: {
        uid: users.ste,
        displayName: 'Ste',
        photoURL: '/ste.jpg',
      },
      [users.kate]: {
        uid: users.kate,
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
  [getDerivedChatKey(users.james, users.ste)]: [
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
  [getDerivedChatKey(users.james, users.jake)]: [
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


const members = {
  testUser: {
    uid: users.testUser,
    displayName: 'Test User',
    photoURL: 'testUser.jpg',
  },

  jim: {
    uid: users.jim,
    displayName: 'Jim',
    photoURL: 'jim.jpg',
  },
  harold: {
    uid: users.harold,
    displayName: 'Harold',
    photoURL: 'harold.jpg',
  },
  lou: {
    uid: users.lou,
    displayName: 'Lou',
    photoURL: 'lou.jpg',
  },
  madge: {
    uid: users.madge,
    displayName: 'Madge',
    photoURL: 'madge.jpg',
  },
  susan: {
    uid: users.susan,
    displayName: 'Susan',
    photoURL: 'susan.jpg',
  },
  daphne: {
    uid: users.daphne,
    displayName: 'Daphne',
    photoURL: 'daphne.jpg',
  },
};


const chatsTestUser = {
  [getDerivedChatKey(users.testUser, users.jim)]: {
    members: [users.testUser, users.jim],
    memberInfo: {
      [users.testUser]: members.testUser,
      [users.jim]: members.jim,
    },
  },
  [getDerivedChatKey(users.testUser, users.harold)]: {
    members: [users.testUser, users.harold],
    memberInfo: {
      [users.testUser]: members.testUser,
      [users.harold]: members.harold,
    },
  },
  [getDerivedChatKey(users.testUser, users.lou)]: {
    members: [users.testUser, users.lou],
    memberInfo: {
      [users.testUser]: members.testUser,
      [users.lou]: members.lou,
    },
  },
  [getDerivedChatKey(users.testUser, users.madge)]: {
    members: [users.testUser, users.madge],
    memberInfo: {
      [users.testUser]: members.testUser,
      [users.madge]: members.madge,
    },
  },
  [getDerivedChatKey(users.testUser, users.susan)]: {
    members: [users.testUser, users.susan],
    memberInfo: {
      [users.testUser]: members.testUser,
      [users.susan]: members.susan,
    },
  },
  [getDerivedChatKey(users.testUser, users.daphne)]: {
    members: [users.testUser, users.daphne],
    memberInfo: {
      [users.testUser]: members.testUser,
      [users.daphne]: members.daphne,
    },
  },
};
