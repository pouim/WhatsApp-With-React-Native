import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { User } from "../../types";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';



export type ContactListItemProps = {
  user: User;
}

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;

  const navigation = useNavigation();

  

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: 'https://lkbkspro.s3.amazonaws.com/atelier-management/gs_58d933b8-98b4-468e-b229-43100a9620a7.jpg' }} style={styles.avatar}/>

          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default ContactListItem;