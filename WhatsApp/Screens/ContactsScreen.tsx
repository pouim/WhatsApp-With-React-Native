import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import ContactListItem from '../Components/ContactListItem';
import Users from '../data/Users';

export default function ContactsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={Users}
        renderItem={({item}) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
