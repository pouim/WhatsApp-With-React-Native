import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

import {API, graphqlOperation, Auth} from 'aws-amplify';
import { createMessage } from '../../../graphql/mutations';

const InputArea = (props) => {
  const { chatRoomID } = props;
  const [message, setMessage] = useState('');
  const [myUserId, setMyUserId] = useState(null);

  useEffect(() => {
   const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    setMyUserId(userInfo.attributes.sub);
   };

   fetchUser();
  }, [])
  

  //methods///
  const onButtonClickHandler = () => {
     if(!message) {
         onMicrophonePressHandler();
     } else {
         onSendPressHandler();
     };
  };

  const onMicrophonePressHandler = () => {
      console.warn("microphone button clicked");
      //Send To Backend
  };
   

   const onSendPressHandler = async () => {
      try {
        await API.graphql(
          graphqlOperation(
            createMessage, {
              input: {
                content: message,
                userID: myUserId,
                chatRoomID
              }
            }
          )
        )
      } catch (e) {
        console.log(e);
      }
      setMessage("");
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <FontAwesome5 name="laugh-beam" size={24} color="grey" />
          <TextInput
            placeholder={'Type a message'}
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <Entypo
            name="attachment"
            size={24}
            color="grey"
            style={styles.icon}
          />
          {!message && (
            <Fontisto
              name="camera"
              size={24}
              color="grey"
              style={styles.icon}
            />
          )}
        </View>
        <TouchableOpacity onPress={onButtonClickHandler}>
          <View style={styles.buttonContainer}>
            {!message ? (
              <MaterialCommunityIcons
                name="microphone"
                size={28}
                color="white"
              />
            ) : (
              <MaterialIcons name="send" size={28} color="white" />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default InputArea;
