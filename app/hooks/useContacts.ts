import { useState } from 'react';
import * as Contacts from 'expo-contacts';

interface Contact {
  id: string;
  name: string;
  phone: string | undefined;
}

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getContacts = async () => {
    setLoading(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

          if (data.length > 0) {
              setContacts(data.map((contact) => ({
                  id: contact.id,
                  name: contact.name,
                  phone: contact.phoneNumbers?.[0]?.number,
              }) as Contact)
              );
          }
      }
    } finally {
      setLoading(false);
    }
  };

  return { contacts, loading, getContacts };
};

export default useContacts;
