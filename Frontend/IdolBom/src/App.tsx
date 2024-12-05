// App.tsx
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
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
import RecruitListScreen from "./screens/recruit/RecruitListScreen";
import RecruitDetailScreen from "./screens/recruit/RecruitDetailScreen";
import CreateRecruitScreen from "./screens/recruit/CreateRecruitScreen";
import ReportScreen from './screens/report/ReportScreen';
import LoadingScreen from './screens/LoadingScreen';
import MyPageScreen from './screens/MyPageScreen';
import ChatProfileScreen from './screens/chat/ChatProfileScreen';




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
      <Tab.Screen name="Recruit" component={RecruitStack} />
      <Tab.Screen name="Chat" component={ChatStack} />
      <Tab.Screen name="Profile" component={MyPageStack} />
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
    <Stack.Navigator
          initialRouteName="ChatListScreen"
          screenOptions={{
            headerShown: false
          }}
        >
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
      <Stack.Screen
        name="ChatProfile"
        component={ChatProfileScreen}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

const RecruitStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Recruit"
        component={RecruitListScreen}
        options={{
          header: () => <TopBar />,
        }}
      />
      <Stack.Screen
        name="RecruitDetail"
        component={RecruitDetailScreen}
        options={{
          header: () => <Header title="동행 상세정보" />,
        }}
      />
     <Stack.Screen
            name="CreateRecruit"
            component={CreateRecruitScreen}
            options={{
              header: () => <Header title="동행 만들기" />,
            }}
          />
   </Stack.Navigator>
  );
};

const MyPageStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{
          header: () => <TopBar />,
        }}
      />
      <Stack.Screen
        name="MatchTicketAgentScreen"
        component={MatchTicketAgentScreen}
        options={{
          header: () => <Header title="대리인 매칭" />,
        }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
   <RecoilRoot>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Loading" component={LoadingScreen} />*/}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Choose" component={ChooseIdolManyScreen} />
        <Stack.Screen name="Main" component={MainTabs} />

            <Stack.Screen
              name="ReportScreen"
              component={ReportScreen}
              options={{
                header: () => <Header title="" />,
                headerShown: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </RecoilRoot>
  );
}

