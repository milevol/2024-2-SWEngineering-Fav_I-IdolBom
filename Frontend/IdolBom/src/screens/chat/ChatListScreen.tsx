import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import ChatRoomItem from '../../components/chat/ChatRoomItem';
import { useNavigation } from '@react-navigation/native';

const mockData = [
  {
    id: '1',
    title: '아임히어로 같이가요~',
    lastMessage: '안녕하세요!! 잘 부탁 드립니다.',
    schedule: '1/17~19 IM HERO - THE STADIUM 콘서트',
    unreadCount: 0,
  },
  {
    id: '2',
    title: '팬미팅 준비 모임',
    lastMessage: '내일 모임 준비 완료!',
    schedule: '2/14 팬미팅 사전 준비',
    unreadCount: 2,
  },
  {
    id: '3',
    title: '응원봉 나눔',
    lastMessage: '응원봉 수량 확인 중이에요.',
    schedule: '1/17~19 IM HERO - THE STADIUM 콘서트',
    unreadCount: 0,
  },
  {
    id: '4',
    title: '안녕하세요',
    lastMessage: '건행건행',
    schedule: '1/20 콘서트 응원 준비',
    unreadCount: 1,
  },
  {
    id: '5',
    title: 'ㅎㅇ',
    lastMessage: '아하',
    schedule: '1/20 콘서트 응원 준비',
    unreadCount: 3,
  },
  {
    id: '6',
    title: '임영웅 짱',
    lastMessage: '그렇군요',
    schedule: '2/14 팬미팅 사전 준비',
    unreadCount: 0,
  },
];

const ToggleContainer = styled.View`
  margin-top: 10px;
  align-self: center;
  width: 250px;
  height: 40px;
  flex-direction: row;
  border: 1px solid #b3b3b3;
  border-radius: 10px;
  background: #ffffff;
  margin-bottom: 10px;
`;

const ToggleButton = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? '#3e95ff' : '#ffffff')};
`;

const ToggleText = styled.Text<{ selected: boolean }>`
  font-family: 'NanumSquareRoundB';
  font-size: 20px;
  color: ${(props) => (props.selected ? '#ffffff' : '#727272')};
`;

const ChatListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread'>('all'); // 토글 상태 추가

  const renderItem = ({ item }: { item: typeof mockData[0] }) => (
    <ChatRoomItem
      title={item.title}
      lastMessage={item.lastMessage}
      schedule={item.schedule}
      unreadCount={item.unreadCount}
      onPress={() => navigation.navigate('ChatScreen', { chatId: item.id, title: item.title })}
    />
  );

  const filteredData = selectedTab === 'all' ? mockData : mockData.filter((item) => item.unreadCount > 0); // 읽지 않은 채팅 필터링

  return (
    <View style={styles.container}>
      <Text style={styles.header}>채팅</Text>
      <ToggleContainer>
        <ToggleButton selected={selectedTab === 'all'} onPress={() => setSelectedTab('all')}>
          <ToggleText selected={selectedTab === 'all'}>티켓팅</ToggleText>
        </ToggleButton>
        <ToggleButton selected={selectedTab === 'unread'} onPress={() => setSelectedTab('unread')}>
          <ToggleText selected={selectedTab === 'unread'}>동행</ToggleText>
        </ToggleButton>
      </ToggleContainer>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    fontFamily: 'NanumSquareRoundEB',
    color: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
});

export default ChatListScreen;
