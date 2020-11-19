import * as React from 'react';
import {StyleSheet, FlatList } from 'react-native';
import {View} from '../Components/Themed';
import ChatListItem from '../Components/ChatListItem';
import ChatRooms from '../data/ChatRooms';
import NewMessageButton from '../Components/NewMessageButton';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={ChatRooms}
        renderItem={({ item }) => <ChatListItem chatroom={item}/>}
        keyExtractor={(item) => item.id}
      />
      <NewMessageButton />
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
