import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import TicketingCard from '../components/mypage/TicketingCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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

const ProfileImage = styled.View`
  position: absolute;
  width: 100px;
  height: 100px;
  left: 47px;
  top: 44px;
  background-color: #d9d9d9;
  border-radius: 50px;
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
  const reliabilityScore = 80;

  const mockTickets = [
    {
      id: '1',
      title: '임영웅 겨울콘서트',
      dateRange: '2024.11.10 ~ 2024.11.12',
      meetingDate: '2024.12.12 목요일',
      status: '매칭중',
      attendance: '3/6',
    },
    {
      id: '2',
      title: '콘서트2',
      dateRange: '2024.12.01 ~ 2024.12.02',
      meetingDate: '2024.12.05 금요일',
      status: '신청중',
      attendance: '5/5',
    },
    {
      id: '3',
      title: '콘서트3',
      dateRange: '2024.12.01 ~ 2024.12.02',
      meetingDate: '2024.12.05 금요일',
      status: '신청중',
      attendance: '5/5',
    },
    {
      id: '4',
      title: '콘서트4',
      dateRange: '2024.12.01 ~ 2024.12.02',
      meetingDate: '2024.12.05 금요일',
      status: '신청중',
      attendance: '5/5',
    },
  ];

  return (
    <ScreenContainer>
      <BackgroundRectangle />

      <ProfileImage />
      <Nickname>내 닉네임</Nickname>
      <Introduction>내 한줄 소개를 여기에 표시</Introduction>

      {/* 신뢰도 섹션 */}
      <ReliabilityContainer>
        <ReliabilityLabel>신뢰도</ReliabilityLabel>
        <ReliabilityScore>{reliabilityScore}</ReliabilityScore>
        <ReliabilityBarBackground>
          <ReliabilityBarFill fillWidth={(reliabilityScore / 100) * 100} />
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
        {mockTickets.map((ticket) => (
          <TicketingCard
            key={ticket.id}
            title={ticket.title}
            dateRange={ticket.dateRange}
            meetingDate={ticket.meetingDate}
            status={ticket.status}
            attendance={ticket.attendance}
          />
        ))}
      </TicketListContainer>
    </ScreenContainer>
  );
}
