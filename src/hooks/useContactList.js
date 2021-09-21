import { db } from 'lib/firebase';
import { useEffect, useState } from 'react';
import { useAuth } from 'context/AuthContext';

function useContactList() {
  const [contacts, setContacts] = useState([]);
  const { authUser } = useAuth();

  const transformContacts = contacts =>{
    let contactsGrouped = contacts.reduce((r, c) => {
      // get first letter of name of current element
      let alphabet = c.sortName[0];

      // if there is no property in accumulator with this letter create it
      if (!r[alphabet]) r[alphabet] = { alphabet, record: [c] };
      // if there is push current element to children array for that letter
      else r[alphabet].record.push(c);

      return r;
    }, {});

    return Object.values(contactsGrouped);
  }

  /* get contacts */
  useEffect(() => {
    if (authUser && authUser.uid) {
      return db
        .collection('users')
        .orderBy('sortName', 'asc')
        .get()
        .then(snap => {

          const contacts = snap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })).filter(c => c.uid !== authUser.uid);

          setContacts(transformContacts(contacts));

        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser.uid]);

  return contacts;
}

export default useContactList;
