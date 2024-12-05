import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ScreenContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #FFF;
`;

const BackgroundGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

const ProfileContainer = styled.View`
  align-items: center;
  width: 100%;
  z-index: 1;
`;

const ProfileImageContainer = styled.View`
  width: 143px;
  height: 143px;
  border-radius: 71.5px;
  background-color: rgba(0, 0, 0, 0.09);
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileText = styled.Text`
  font-family: 'NanumSquareRound';
  font-size: 16px;
  color: #000000;
`;

const Nickname = styled.Text`
  font-family: 'NanumSquareRound';
  font-weight: 700;
  font-size: 35px;
  color: #000000;
  margin-bottom: 10px;
`;

const Introduction = styled.Text`
  font-family: 'NanumSquareRound';
  font-size: 20px;
  color: #585858;
  margin-bottom: 20px;
`;

const ActivityContainer = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const ActivityText = styled.Text`
  font-family: 'NanumSquareRound';
  font-size: 20px;
  color: #000000;
  text-align: center;
`;

const TrustContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 30px;
`;

const TrustLabel = styled.Text`
  font-family: 'NanumSquareRound';
  font-size: 16px;
  color: #000000;
  margin-right: 10px;
`;

const TrustScore = styled.Text`
  font-family: 'NanumSquareRound';
  font-size: 16px;
  color: #000000;
  margin-right: 10px;
`;

const TrustBarContainer = styled.View`
  width: 100px;
  height: 8px;
  background-color: rgba(180, 214, 255, 0.68);
  border-radius: 4px;
  overflow: hidden;
`;

const TrustBarFill = styled.View`
  width: 50%;
  height: 100%;
  background-color: #3e95ff;
  border-radius: 4px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  top: 40px;
  z-index: 2;
`;

const ReportButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 20px;
`;

const ReportText = styled.Text`
  font-family: 'NanumSquareRound';
  font-size: 20px;
  color: #000000;
  margin-top: 5px;
`;

const SirenIcon = styled.Image`
  width: 38px;
  height: 38px;
`;

const ChatProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { nickname } = route.params;

  const handleReport = () => {
    navigation.navigate('ReportScreen', {
       nickname: nickname  // 신고할 사용자의 닉네임 전달
    });
   };

  return (
    <ScreenContainer>
      <BackgroundGradient
        colors={['#FFF', '#FCFEFF', '#EBF4FF', '#BFDDFF']}
        locations={[0.214, 0.364, 0.839, 1.0]}
      />

      <CloseButton onPress={() => navigation.goBack()}>
        <Icon name="close" size={30} color="#000000" />
      </CloseButton>

      <ProfileContainer>
        <ProfileImageContainer>
          <ProfileText>프로필 사진</ProfileText>
        </ProfileImageContainer>
        <Nickname>{nickname || '닉네임'}</Nickname>
        <Introduction>한줄 소개</Introduction>
        <ActivityContainer>
          <ActivityText>OOO 팬</ActivityText>
          <ActivityText>활동 지역 OOO</ActivityText>
        </ActivityContainer>
        <TrustContainer>
          <TrustLabel>신뢰도</TrustLabel>
          <TrustScore>50</TrustScore>
          <TrustBarContainer>
            <TrustBarFill />
          </TrustBarContainer>
        </TrustContainer>
        <ReportButton onPress={handleReport}>
          <SirenIcon source={require('../../assets/images/siren_icon.png')} />
          <ReportText>신고하기</ReportText>
        </ReportButton>
      </ProfileContainer>
    </ScreenContainer>
  );
};

export default ChatProfileScreen;