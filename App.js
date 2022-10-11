import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Contacts from'expo-contacts';
import { useState } from 'react';

export default function App() {

  const [contact, setContact] = useState({});


  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers], }
        ); 
      if (data.length > 0) {
        setContact(data); 
      }
    }
  }


  return (
    <SafeAreaView style={styles.container}>
        <FlatList 
          data={contact} 
          renderItem={({item}) =>
          <View style={styles.flatlist}>
            <Text>{item.name} {item.phoneNumbers[0].number}</Text>
          </View>
        } />
        <Button 
          title="Get contacts" 
          onPress={getContacts} 
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlist: {
    flexDirection: 'row',
    marginTop: 10,
   },
});
