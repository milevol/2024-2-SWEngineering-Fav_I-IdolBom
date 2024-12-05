import React, { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';
import TicketingCard from '../components/mypage/TicketingCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #FFFFFF;
`;

const BackgroundRectangle = styled.View`
  position: absolute;
  width: 414px;
  height: 600px;
  left: 0px;
  top: 170px;
  background: #F3F8FF;
  border-radius: 40px;
`;

const ProfileImage = styled.Image`
  position: absolute;
  width: 100px;
  height: 100px;
  left: 47px;
  top: 44px;
  border-radius: 50px;
  background-color: #d9d9d9;
`;

const Nickname = styled.Text`
  position: absolute;
  width: 200px;
  height: 23px;
  left: 171px;
  top: 57px;
  font-family: 'NanumSquareRoundB';
  font-size: 20px;
  line-height: 23px;
  color: #000000;
`;

const Introduction = styled.Text`
  position: absolute;
  width: 200px;
  height: 18px;
  left: 171px;
  top: 84px;
  font-family: 'NanumSquareRoundR';
  font-size: 16px;
  line-height: 18px;
  color: #000000;
`;

const ReliabilityContainer = styled.View`
  position: absolute;
  left: 171px;
  top: 120px;
  flex-direction: row;
  align-items: center;
`;

const ReliabilityLabel = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 14px;
  color: #000000;
  margin-right: 8px;
`;

const ReliabilityScore = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 14px;
  color: #000000;
  margin-right: 10px;
`;

const ReliabilityBarBackground = styled.View`
  width: 100px;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
`;

const ReliabilityBarFill = styled.View<{ fillWidth: number }>`
  width: ${(props) => props.fillWidth || 0}px;
  height: 8px;
  background-color: #3e95ff;
  border-radius: 4px;
`;

const TicketListContainer = styled.ScrollView`
  flex: 1;
  margin-top: 190px;
  padding: 0 20px;
`;

const RecordContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  align-self: flex-start;
  padding-left: 20px;
`;

const RecordIcon = styled(MaterialCommunityIcons).attrs({
  name: 'clipboard-text-outline',
  size: 24,
  color: '#3e95ff',
})`
  margin-right: 10px;
`;

const RecordText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 20px;
  color: #000000;
`;

export default function MyPageScreen() {
  const [userInfo, setUserInfo] = useState(null);
  const [ticketingList, setTicketingList] = useState([]);
  const navigation = useNavigation();

   const BACKEND_URL = process.env.BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/my`);
        const data = await response.json();
        if (data.code === 'SU') {
          setUserInfo(data.userInfo);
          setTicketingList(data.ticketingList);
        } else {
          console.error('API Error:', data.message);
        }
      } catch (error) {
        console.error('Network Error:', error);
      }
    };

    fetchData();
  }, []);


  const handleTicketPress = (ticket) => {
    navigation.navigate('MatchTicketAgentScreen', {
      schedule: {
        date: new Date(ticket.scheduleID.scheduleDate).toLocaleDateString(),
        title: ticket.scheduleID.scheduleName,
        peopleCount: ticket.ticketNum,
        preferredArea: ticket.preferredArea || '없음',
        message: ticket.message || '없음'
      }
    });
  };


  if (!userInfo) {
    return null;
  }

  return (
    <ScreenContainer>
      <BackgroundRectangle />

      {/* 프로필 정보 */}
      <ProfileImage source={{ uri: userInfo.profileImage || 'https://via.placeholder.com/100' }} />
      <Nickname>{userInfo.userName || '닉네임 없음'}</Nickname>
      <Introduction>{userInfo.bio || '건강하세요!'}</Introduction>

      {/* 신뢰도 */}
      <ReliabilityContainer>
        <ReliabilityLabel>신뢰도</ReliabilityLabel>
        <ReliabilityScore>{userInfo.trustScore || 0}</ReliabilityScore>
        <ReliabilityBarBackground>
          <ReliabilityBarFill fillWidth={(userInfo.trustScore || 0)} />
        </ReliabilityBarBackground>
      </ReliabilityContainer>

      {/* '내 기록' 섹션 */}
      <TicketListContainer
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 70,
        }}
      >
        <RecordContainer>
          <RecordIcon />
          <RecordText>내 기록</RecordText>
        </RecordContainer>
        {ticketingList.map((ticket) => (
            <TouchableOpacity
               key={ticket.id}
               onPress={() => handleTicketPress(ticket)}
               >
                <TicketingCard
                  title={ticket.scheduleID.scheduleName}
                  dateRange={new Date(ticket.scheduleID.scheduleDate).toLocaleDateString()}
                  meetingDate={ticket.scheduleID.description}
                  status={ticket.ticketingStatus === 0 ? '매칭중' : '완료'}
                  />
             </TouchableOpacity>
        ))}
      </TicketListContainer>
    </ScreenContainer>
  );
}
