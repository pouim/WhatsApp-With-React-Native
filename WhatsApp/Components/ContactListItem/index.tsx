import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {User} from '../../types';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createChatRoom, createChatRoomUser} from '../../graphql/mutations';

export type ContactListItemProps = {
  user: User;
};

const ContactListItem = (props: ContactListItemProps) => {
  const {user} = props;

  const navigation = useNavigation();

  const onClick = async () => {
    try {
      //1. Create a New Chatroom
      const newChatroomData = await API.graphql(
        graphqlOperation(createChatRoom, {input: {}}),
      );

      if (!newChatroomData.data) {
        console.log('failed to create a chat room');
        return;
      }

      const newChatRoom = newChatroomData.data.createChatRoom;

      //2. Add this user to the chatroom
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: user.id,
            chatRoomID: newChatRoom.id,
          },
        }),
      );

      //3. Add authenticated user to the chatroom
      const userInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        }),
      );
      //4. Navigate to the chat room
      navigation.navigate('ChatRoom', {
        id: newChatRoom.id,
        name: 'Hardcoded name',
      });

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{uri: user.imageUri}} style={styles.avatar} />

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>
              {user.status}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContactListItem;
