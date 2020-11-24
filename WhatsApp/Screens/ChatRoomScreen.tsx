import React, { useEffect, useState } from 'react';
import {useRoute} from '@react-navigation/native';
import {View, FlatList, ImageBackground} from 'react-native';
import ChatMessage from '../Components/ChatMessage';
import InputArea from '../Components/ChatMessage/InputArea';

import {API, graphqlOperation, Auth} from 'aws-amplify';
import { createMessage } from '../graphql/mutations';
import chatRoomData from '../data/Chats';
import Bg from '../assets/images/BG.png';

const ChatRoomScreen = () => {
  const route = useRoute();
  return (
    <ImageBackground style={{width: '100%', height: '100%'}} source={Bg}>
      <FlatList
        data={chatRoomData.messages}
        renderItem={({item}) => <ChatMessage message={item} />}
        inverted
      />
      <InputArea chatRoomID={route.params.id} />
    </ImageBackground>
  );
};

export default ChatRoomScreen;
