// App.tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopBar from './components/common/TopBar';
import BottomBar from './components/common/BottomBar';
import Header from './components/common/Header';
import ChooseIdolManyScreen from './screens/choose/ChooseIdolManyScreen';
import HomeScreen from './screens/HomeScreen';
import ScheduleDetailScreen from './screens/ScheduleDetailScreen';
import FindTicketAgentScreen from './screens/ticketing/FindTicketAgentScreen';
import MatchTicketAgentScreen from './screens/ticketing/MatchTicketAgentScreen';
import TicketScreen from './screens/ticketing/TicketScreen';
import ChatListScreen from './screens/chat/ChatListScreen';
import ChatScreen from './screens/chat/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import ReportScreen from './screens/report/ReportScreen';

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
        {/* Login이나 선택 화면은 필요한 경우 다시 활성화 */}
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        {/* <Stack.Screen name="Choose" component={ChooseIdolManyScreen} /> */}

        {/* MainTabs는 BottomBar를 포함한 네비게이션 */}
        <Stack.Screen name="Main" component={MainTabs} />

        {/* ReportScreen은 별도로 분리되어 BottomBar 없이 렌더링 */}
        <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{
            header: () => <Header title="" />, // Header 렌더링
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

