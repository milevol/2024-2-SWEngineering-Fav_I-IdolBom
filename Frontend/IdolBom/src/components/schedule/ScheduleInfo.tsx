// ScheduleInfo.tsx
import React from 'react';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
import { Linking } from 'react-native';

const Container = styled.View`
  padding: 16px;
  background-color: #FFFFFF;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 8px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const Icon = styled(Feather)`
  margin-right: 8px;
`;

const InfoText = styled.Text`
  font-size: 16px;
  color: #666666;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 16px;
`;

const Button = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #3E95FF;
  margin-bottom: 8px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: #3E95FF;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #333333;
  margin-top: 16px;
  line-height: 24px;
`;

const LinkButton = styled.TouchableOpacity`
  background-color: #3E95FF;
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  margin-top: 16px;
`;

const LinkButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
`;

export default function ScheduleInfo({ title, date, location, type, description, link }) {
  const handleLinkPress = () => {
    if (link) {
      Linking.openURL(link).catch(err => console.error("Couldn't load page", err));
    }
  };

  return (
    <Container>
      <InfoRow>
        <InfoText>{type}</InfoText>
      </InfoRow>
      <Title>{title}</Title>
      <InfoRow>
        <Icon name="calendar" size={16} color="#3E95FF" />
        <InfoText>{date}</InfoText>
      </InfoRow>
      <InfoRow>
        <Icon name="map-pin" size={16} color="#3E95FF" />
        <InfoText>{location}</InfoText>
      </InfoRow>
      <ButtonContainer>
        <Button>
          <ButtonText>동행</ButtonText>
        </Button>
        <Button>
          <ButtonText>티켓팅 대리 구하기</ButtonText>
        </Button>
      </ButtonContainer>
      <Description>{description}</Description>
      {link && (
        <LinkButton onPress={handleLinkPress}>
          <LinkButtonText>링크 바로가기</LinkButtonText>
        </LinkButton>
      )}
    </Container>
  );
}
