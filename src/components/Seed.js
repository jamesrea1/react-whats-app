import { db, firebase } from 'lib/firebase';

function Seed() {
  const seedChat = () => {
    const chatsRef = db.collection('chats');

    chatsRef
      .add(chats[2])
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const seedMsgs = () => {
    const chatId = 'icuPCilCIftrXdR7HT4y';
    const msgsRef = db.collection(`chats/${chatId}/msgs`);
    const batch = db.batch();

    msgsJake.forEach((msg) => {
      const msgRef = msgsRef.doc();
      batch.set(msgRef, msg);
    });

    batch
      .commit()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
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

const chats = [
  {
    users: ['IPy5AoZF7caQgFyOL1X5PlfM5CP2', 'VnweQsAZpvZbFJ05MeHL03kErto2'],
    userProfiles: {
      IPy5AoZF7caQgFyOL1X5PlfM5CP2: {
        displayName: 'James',
        photoURL: '/james.jpg',
      },
      VnweQsAZpvZbFJ05MeHL03kErto2: {
        displayName: 'Jake',
        photoURL: '/jake.jpg',
      },
    },
    lastMsg: {
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-08-30T00:32:00')
      ),
      text: 'Time to make rabbit stew!',
    },
  },

  {
    users: ['IPy5AoZF7caQgFyOL1X5PlfM5CP2', 'XfLoq3OnKwUnIWqvZFy1kchfqz83'],
    userProfiles: {
      IPy5AoZF7caQgFyOL1X5PlfM5CP2: {
        displayName: 'James',
        photoURL: '/james.jpg',
      },
      XfLoq3OnKwUnIWqvZFy1kchfqz83: {
        displayName: 'Ste',
        photoURL: '/ste.jpg',
      },
    },
    lastMsg: {
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-09-04T18:52:00')
      ),
      text: 'Oh awesome!  Yeah yeah all good dude 😁 xx',
    },
  },
  {
    users: ['XfLoq3OnKwUnIWqvZFy1kchfqz83', 'sYV6FpFVqNRdrV0RYaYfWVYrkTv2'],
    userProfiles: {
      XfLoq3OnKwUnIWqvZFy1kchfqz83: {
        displayName: 'Ste',
        photoURL: '/ste.jpg',
      },
      sYV6FpFVqNRdrV0RYaYfWVYrkTv2: {
        displayName: 'Kate',
        photoURL: '/kate.jpg',
      },
    },
    lastMsg: {
      sentAt: firebase.firestore.Timestamp.fromDate(
        new Date('2021-09-05T22:43:00')
      ),
      text:
        "Yeah! I'm rewatching Disney's fantasia. Psychedelic trip without taking anything! Xx",
    },
  },
];

const msgsJake = [
  {
    author: 'IPy5AoZF7caQgFyOL1X5PlfM5CP2',
    sentAt: firebase.firestore.Timestamp.fromDate(
      new Date('2021-08-30T00:31:00')
    ),
    text:
      'I don wanna talk to you no more.. youuu empty headed.. animal food trough.. wippperrr',
  },

  {
    author: 'VnweQsAZpvZbFJ05MeHL03kErto2',
    sentAt: firebase.firestore.Timestamp.fromDate(
      new Date('2021-08-30T00:32:00')
    ),
    text: 'Time to make rabbit stew',
  },
];

const msgsSte = [
  {
    author: 'IPy5AoZF7caQgFyOL1X5PlfM5CP2',
    sentAt: firebase.firestore.Timestamp.fromDate(
      new Date('2021-09-04T18:52:00')
    ),
    text: 'Oh awesome! Yeah yeah all good dude 😁 xx',
  },
  {
    author: 'XfLoq3OnKwUnIWqvZFy1kchfqz83',
    sentAt: firebase.firestore.Timestamp.fromDate(
      new Date('2021-09-04T17:42:30')
    ),
    text: 'How you doing? Xx',
  },
  {
    author: 'XfLoq3OnKwUnIWqvZFy1kchfqz83',
    sentAt: firebase.firestore.Timestamp.fromDate(
      new Date('2021-09-04T17:42:20')
    ),
    text: 'At Neighbourhood Weekender with Kate x',
  },
];
