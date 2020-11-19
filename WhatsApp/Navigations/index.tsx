import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {ColorSchemeName, View, Text} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotFoundScreen from '../Screens/NotFoundScreen';
import ChatRoomScreen from '../Screens/ChatRoomScreen';
import { RootStackParamList } from '../types';
import MainTabNavigator from './MainTabNavigator';
import Colors from "../Constants/Colors";
import ContactsScreen from "../Screens/ContactsScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const linking = {
    prefixes: ['/'],
    config: {
      screens: {
        Root: {
          screens: {
            TabOne: {
              screens: {
                TabOneScreen: 'one',
              },
            },
            TabTwo: {
              screens: {
                TabTwoScreen: 'two',
              },
            },
          },
        },
        NotFound: '*',
      },
    },
  };
  return (
    <NavigationContainer
      linking={linking}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: "WhatsApp",
          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  width: 60,
                  justifyContent: "space-between",
                  marginRight: 10,
                }}
              >
                <Octicons name="search" size={20} color="white" />
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={22}
                  color="white"
                />
              </View>
            );
          },
        }}
      />
       <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options= {({route}) => (
          {
            title: route.params.name,
            headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  width: 100,
                  justifyContent: "space-between",
                  marginRight: 10,
                }}
              >
                <FontAwesome5 name="video" size={20} color="white"  />
                <MaterialIcons name="call" size={20} color="white" />
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={20}
                  color="white"
                />
              </View>
            );
          },
          }
        ) }
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}