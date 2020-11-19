import React from 'react';
import {View, Text, Image} from 'react-native';
import {ChatRoom} from '../../types';
import styles from './styles';
import moment from 'moment';

interface ChatListItemProps {
  chatroom: ChatRoom;
}

const ChatListItem = (props: ChatListItemProps) => {
  const {chatroom} = props;
  const user = chatroom.users[1];
  const today = moment().endOf('day').format("DD/MM/YY");
  const yesterday = moment().add(-1, 'day').endOf('day').format("DD/MM/YY");
  const lastweek = moment().add(-7, 'day').endOf('day').format("DD/MM/YY");
  console.log(today);
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image source={{uri: user.imageUri}} style={styles.avatar} />
        <View style={styles.midContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.lastMessage}>{chatroom.lastMessage.content}</Text>
        </View>
      </View>

      <Text style={styles.time}>
        {moment(chatroom.lastMessage.createdAt).format('DD/MM/YY') === today
          ? 'today'
          : moment(chatroom.lastMessage.createdAt).format('DD/MM/YY') ===
            yesterday
          ? 'yesterday'
          //Shoud be Fixed//
          : moment(chatroom.lastMessage.createdAt).format('DD/MM/YY') <=
            lastweek
          ? moment(chatroom.lastMessage.createdAt).format('dddd')  
          : moment(chatroom.lastMessage.createdAt).format('DD/MM/YY')}
      </Text>
    </View>
  );
};

export default ChatListItem;
