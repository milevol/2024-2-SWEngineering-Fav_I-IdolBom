// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopBar from './components/common/TopBar';
import BottomBar from './components/common/BottomBar';
import Header from './components/common/Header';
import HomeScreen from './screens/HomeScreen';
import ScheduleDetailScreen from './screens/ScheduleDetailScreen';
import FindTicketAgentScreen from './screens/ticketing/FindTicketAgentScreen';
import MatchTicketAgentScreen from './screens/ticketing/MatchTicketAgentScreen';
import TicketScreen from './screens/ticketing/TicketScreen';
import ChatListScreen from './screens/chat/ChatListScreen';
import ChatScreen from './screens/chat/ChatScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={() => <BottomBar />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Tickets" component={TicketStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => <TopBar />, // HomeScreen에서는 TopBar 렌더링
        }}
      />
      <Stack.Screen
        name="ScheduleDetail"
        component={ScheduleDetailScreen}
        options={{
          header: () => <Header title="스케줄 상세보기" />, // ScheduleDetail에서 Header 렌더링
        }}
      />
      <Stack.Screen
        name="FindTicketAgent"
        component={FindTicketAgentScreen}
        options={{
          header: () => <Header title="티켓팅 대리 구하기" />,
        }}
      />
      <Stack.Screen
        name="MatchTicketAgent"
        component={MatchTicketAgentScreen}
        options={{
          header: () => <Header title="티켓팅 대리 구하기" />,
        }}
      />
    </Stack.Navigator>
  );
};

const TicketStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TicketScreen"
        component={TicketScreen}
        options={{
          header: () => <TopBar />,
        }}
      />
    </Stack.Navigator>
  );
};

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={{
           headerShown: false
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
