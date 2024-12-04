import React from 'react';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// 전체 화면 배경 스타일
const Container = styled.View`
  flex: 1;
  background-color: #f3f8ff; /* 전체 배경색 설정 */
`;

const BackgroundRectangle = styled.View`
  position: absolute;
  width: 414px;
  height: 420px;
  left: 2px;
  top: -37px;
  background: #ffffff;
  border-radius: 50px;
`;

const ScheduleType = styled.Text`
  position: absolute;
  width: 68px;
  height: 16px;
  left: 48px;
  top: 59px;
  font-family: 'NanumSquareRoundR';
  font-size: 14px;
  line-height: 16px;
  color: #1fa7db;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 85px;
  padding: 0 48px;
  justify-content: space-between;
  width: 100%;
`;

const ScheduleTitle = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 20px;
  line-height: 23px;
  color: #000000;
`;

const Line = styled.View`
  position: absolute;
  width: 330px;
  height: 0px;
  left: 40px;
  top: 120px;
  border: 0.5px solid #000000;
`;

const DateContainer = styled.View`
  position: absolute;
  width: 200px;
  height: 24.31px;
  left: 48px;
  top: 142px;
  flex-direction: row;
  align-items: center;
`;

const DateText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 16px;
  color: #000000;
  margin-left: 10px;
`;

const LocationContainer = styled.View`
  position: absolute;
  width: 500px;
  height: 23px;
  left: 48px;
  top: 175px;
  flex-direction: row;
  align-items: center;
`;

const LocationText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 16px;
  color: #000000;
  margin-left: 10px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  left: 47px;
  top: 233px;
`;

const Button = styled.TouchableOpacity`
  width: 323px;
  height: 40px;
  background: ${(props) => (props.disabled ? '#d3d3d3' : '#ffffff')};
  border: 1px solid ${(props) => (props.disabled ? '#a6a6a6' : '#1fa7db')};
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 16px;
  color: ${(props) => (props.disabled ? '#a6a6a6' : '#1fa7db')};
`;

const LinkButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 100px;
  width: 323px;
  height: 65px;
  background-color: #3e95ff;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const LinkButtonText = styled.Text`
  font-family: 'NanumSquareRoundEB';
  color: #ffffff;
  font-size: 18px;
`;

const DescriptionText = styled.Text`
  margin-top: 390px;
  padding: 30px;
  font-family: 'NanumSquareRoundR';
  font-size: 16px;
  line-height: 24px;
  color: #333333;
`;

export default function ScheduleDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  // `route.params`로 전달받은 데이터
  const { schedule } = route.params;

  // 현재 날짜와 스케줄 날짜 비교
  const isPastDate = new Date(schedule.scheduleDate) < new Date();

  const handleLinkPress = () => {
    if (schedule.originUrl) {
      Linking.openURL(schedule.originUrl).catch((err) =>
        console.error("Couldn't load page", err)
      );
    }
  };

  return (
    <Container>
      <BackgroundRectangle />
      <ScheduleType>{schedule.isTicketing ? '티켓팅' : '일반 일정'}</ScheduleType>

      <TitleContainer>
        <ScheduleTitle>{schedule.scheduleName}</ScheduleTitle>
        <MaterialCommunityIcons name="bell-plus-outline" size={28} color="#000" />
      </TitleContainer>

      <Line />
      <DateContainer>
        <MaterialCommunityIcons name="calendar-text" size={24} color="#B3B3B3" />
        <DateText>{schedule.scheduleDate.split('T')[0]}</DateText>
      </DateContainer>
      <LocationContainer>
        <MaterialIcons name="place" size={24} color="#FF6868" />
        <LocationText>{schedule.location || '위치 정보 없음'}</LocationText>
      </LocationContainer>
      <ButtonContainer>
        <>
          <Button
            onPress={() => navigation.navigate('FindTicketAgent', { schedule })}
            disabled={!schedule.isTicketing || isPastDate} // 비활성화 조건 추가
          >
            <ButtonText disabled={!schedule.isTicketing || isPastDate}>
              티켓팅 대리 구하기
            </ButtonText>
          </Button>
          <Button onPress={() => navigation.navigate('FindTicketAgent', { schedule })}>
            <ButtonText>동행</ButtonText>
          </Button>
        </>
      </ButtonContainer>
      <DescriptionText>{schedule.description || '설명이 없습니다.'}</DescriptionText>
      <LinkButton onPress={handleLinkPress}>
        <LinkButtonText>링크 바로가기</LinkButtonText>
      </LinkButton>
    </Container>
  );
}
