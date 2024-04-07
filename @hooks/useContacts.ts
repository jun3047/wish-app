import { MutableRefObject, useState } from 'react';
import * as Contacts from 'expo-contacts';

interface Contact {
  id: string;
  name: string;
  phone: string | undefined;
}

const useContacts = (webViewRef?: MutableRefObject<any>) => {

  const [contacts, setContacts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getContacts = async () => {
    setLoading(true);

    let newContacts = [];
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

          if (data.length > 0) {
              newContacts = data.map((contact) => (
                  contact.phoneNumbers?.[0]?.number
              ))
          }
      }

      setContacts(newContacts);

      return newContacts;

      // const message = `연락처${JSON.stringify(contacts)}`
      // webViewRef.current.postMessage(message);


    } finally {
      setLoading(false);
    }
  };

  return { contacts, loading, getContacts };
};

export default useContacts;
