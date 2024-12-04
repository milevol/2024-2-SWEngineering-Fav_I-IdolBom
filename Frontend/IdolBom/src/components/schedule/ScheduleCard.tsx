import React from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity, View, Text } from 'react-native';

// 카드 전체 컨테이너 스타일
const CardContainer = styled(TouchableOpacity)`
  width: 374px;
  height: 114px;
  margin: 7px 21px;
  background: #ffffff;
  border-radius: 20px;
  position: relative;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

// 텍스트 컨테이너
const TextContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  margin-right: auto;
`;

// 제목 텍스트 스타일
const TitleText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 20px;
  color: #000000;
  margin-bottom: 10px;
  width: 300px;
`;

// 세부정보 텍스트 스타일
const DetailsText = styled.Text`
  font-family: 'NanumSquareRoundR';
  font-size: 16px;
  color: #000000;
`;

// 아이콘 스타일
const ArrowIcon = styled(Feather)`
  color: #888888;
`;

// 신청 버튼 컨테이너
const ActionButtonContainer = styled(View)`
  width: 59px;
  height: 64px;
  background: #3e95ff;
  border-radius: 19px;
  align-items: center;
  justify-content: center;
`;

// 신청 버튼 텍스트 스타일
const ActionButtonText = styled.Text`
  font-family: 'NanumSquareRound';
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
`;

// ScheduleCard 컴포넌트
export default function ScheduleCard({ title, details, onPress, isTicketScreen }) {
  return (
    <CardContainer onPress={onPress}>
      <TextContainer>
        {/* 제목 텍스트 */}
        <TitleText>{title}</TitleText>
        {/* 세부 정보 텍스트 */}
        <DetailsText>{details}</DetailsText>
      </TextContainer>
      {isTicketScreen ? (
        // 티켓 화면일 때만 '신청' 버튼 표시
        <ActionButtonContainer>
          <ActionButtonText>신청</ActionButtonText>
        </ActionButtonContainer>
      ) : (
        // 그렇지 않으면 화살표 아이콘 표시
        <ArrowIcon name="arrow-right-circle" size={30} />
      )}
    </CardContainer>
  );
}
