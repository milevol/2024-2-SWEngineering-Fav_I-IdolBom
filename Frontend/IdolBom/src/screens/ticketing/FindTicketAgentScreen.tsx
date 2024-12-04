import React, { useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f3f8ff;
`;

const BackgroundRectangle = styled.View`
  position: absolute;
  width: 414px;
  height: 600px;
  left: 2px;
  top: -37px;
  background: #ffffff;
  border-radius: 50px;
`;

const LabelContainer = styled.View`
  position: absolute;
  top: 230px;
  left: 40px;
`;

const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  margin-left: 8px;
`;

const IconLabelContainer = styled.View`
  margin-bottom: 20px;
`;

const OptionList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const OptionButton = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: ${(props) => (props.selected ? '#3e95ff' : '#ffffff')};
  border: 1px solid ${(props) => (props.selected ? '#3e95ff' : '#a6a6a6')};
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const OptionText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 16px;
  color: ${(props) => (props.selected ? '#ffffff' : '#000000')};
`;

const RadioGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const RadioButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const RadioButton = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #3e95ff;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const RadioButtonInner = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #3e95ff;
`;

const RadioLabel = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 18px;
  color: #000000;
`;

const MessageInput = styled.TextInput`
  width: 300px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  padding: 10px;
  font-family: 'NanumSquareRoundB';
  font-size: 14px;
  color: #676767;
  margin-top: 5px;
  text-align-vertical: top;
`;

const ScheduleType = styled.Text`
  position: absolute;
  width: 68px;
  height: 16px;
  left: 48px;
  top: 59px;
  font-family: 'NanumSquareRoundR';
  font-size: 14px;
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
  color: #000000;
`;

const Line = styled.View`
  position: absolute;
  width: 354.01px;
  height: 0px;
  left: 25px;
  top: 120px;
  border: 0.4px solid #000000;
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

const ActionButton = styled.TouchableOpacity`
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

const ActionButtonText = styled.Text`
  font-family: 'NanumSquareRoundEB';
  color: #ffffff;
  font-size: 18px;
`;

const InfoLabel = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 20px;
  color: #000000;
  margin-bottom: 3px;
`;

export default function FindTicketAgentScreen({ route }) {
  const { schedule } = route.params;
  const navigation = useNavigation();

  const [peopleCount, setPeopleCount] = useState('');
  const [preferredArea, setPreferredArea] = useState('');
  const [message, setMessage] = useState('');

  const BACKEND_URL = process.env.BACKEND_URL;

  const handlePeopleSelect = (value) => {
    setPeopleCount(value);
  };

  const handleRadioPress = (value) => {
    setPreferredArea(value);
  };

  const handleActionButtonPress = () => {
    Alert.alert(
      '매칭 확인',
      '입력한 정보를 바탕으로 매칭을 진행하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            try {
              const response = await fetch(`${BACKEND_URL}/ticketing/submit/${schedule.id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ticketNum: peopleCount.replace('명', '') || 0,
                  seatingType: preferredArea || '미정',
                  requestMessage: message || '없음',
                }),
              });

              if (!response.ok) {
                throw new Error(`서버 요청 실패: ${response.status}`);
              }

              Alert.alert('성공', '매칭이 신청되었습니다.');
              navigation.navigate('MatchTicketAgent', {
                schedule: {
                  id: schedule.id,
                  title: schedule.scheduleName,
                  date: schedule.scheduleDate.split('T')[0],
                  location: schedule.location || '위치 정보 없음',
                  peopleCount: peopleCount || '1명',
                  preferredArea: preferredArea || '없음',
                  message: message || '없음',
                },
              });
            } catch (error) {
              console.error('매칭 요청 중 오류 발생:', error);
              Alert.alert('오류', '매칭 요청에 실패했습니다.');
            }
          },
        },
      ]
    );
  };


  return (
    <ScreenContainer>
      <BackgroundRectangle />
      <ScheduleType>{schedule.isTicketing ? '티켓팅' : '일반 일정'}</ScheduleType>
      <TitleContainer>
        <ScheduleTitle>{schedule.scheduleName}</ScheduleTitle>
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

      <LabelContainer>
        <LabelWrapper>
          <Feather name="check-circle" size={24} color="#000000" />
          <Label>입력해주세요 (선택사항)</Label>
        </LabelWrapper>

        {/* 인원 선택 */}
        <IconLabelContainer>
          <InfoLabel>인원</InfoLabel>
          <OptionList>
            {['1명', '2명', '3명', '4명'].map((option) => (
              <OptionButton
                key={option}
                selected={peopleCount === option}
                onPress={() => handlePeopleSelect(option)}
              >
                <OptionText selected={peopleCount === option}>{option}</OptionText>
              </OptionButton>
            ))}
          </OptionList>
        </IconLabelContainer>

        {/* 라디오 버튼 */}
        <IconLabelContainer>
          <InfoLabel>희망구역</InfoLabel>
          <RadioGroup>
            <RadioButtonWrapper onPress={() => handleRadioPress('의자')}>
              <RadioButton>
                {preferredArea === '의자' && <RadioButtonInner />}
              </RadioButton>
              <RadioLabel>의자</RadioLabel>
            </RadioButtonWrapper>
            <RadioButtonWrapper onPress={() => handleRadioPress('스탠딩')}>
              <RadioButton>
                {preferredArea === '스탠딩' && <RadioButtonInner />}
              </RadioButton>
              <RadioLabel>스탠딩</RadioLabel>
            </RadioButtonWrapper>
          </RadioGroup>
        </IconLabelContainer>

        {/* 메시지 입력 */}
        <IconLabelContainer>
          <InfoLabel>대리인에게 할 말</InfoLabel>
          <MessageInput
            placeholder="대리인에게 전달할 메시지를 입력하세요."
            multiline
            value={message}
            onChangeText={setMessage}
          />
        </IconLabelContainer>
      </LabelContainer>

      <ActionButton onPress={handleActionButtonPress}>
        <ActionButtonText>매칭하기</ActionButtonText>
      </ActionButton>
    </ScreenContainer>
  );
}
