import React from "react";
import styled from "styled-components/native";
import { ScrollView, Image } from "react-native";
import FloatingButton from "../../components/recruit/FloatingButton";

const Container = styled.View`
  flex: 1;
  background-color: #f3f8ff;

`;

const DetailCard = styled.View`
  width: 358px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  elevation: 5; /* Android 그림자 */
  padding: 30px;
  margin-top: -10px; /* 상단 여백 제거 */
`;

const TitleContainer = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-family: "NanumSquareRoundEB";
  font-size: 20px;
  color: #000000;
`;

const StatusButton = styled.View`
  padding: 5px 10px;
  background-color: #e8f4fc;
  border-radius: 15px;
`;

const StatusText = styled.Text`
  font-family: "NanumSquareRoundR";
  font-size: 14px;
  color: #4096ff;
`;

const Section = styled.View`
  margin-bottom: 15px;
`;

const SectionTitle = styled.Text`
  font-family: "NanumSquareRoundEB";
  font-size: 16px;
  color: #000000;
  margin-bottom: 5px;
`;

const SectionRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const SectionText = styled.Text`
  font-family: "NanumSquareRoundR";
  font-size: 14px;
  color: #666666;
`;

const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.View`
  padding: 5px 10px;
  background-color: #ededed;
  border-radius: 15px;
  margin-right: 10px;
  margin-bottom: 5px;
`;

const TagText = styled.Text`
  font-family: "NanumSquareRoundR";
  font-size: 14px;
  color: #666666;
`;

const JoinButton = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  background-color: #4096ff;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
`;

const JoinButtonText = styled.Text`
  font-family: "NanumSquareRoundEB";
  font-size: 18px;
  color: #ffffff;
`;

export default function RecruitDetailScreen({ route }) {
  const {
      title,
      details,
      status,
      genderPreference,
      agePreference,
      locationPreference,
      additionalNote,
      currentParticipants,
      maxParticipants,
      startDate,
      expiredDate,
      scheduleName
    } = route.params;

  const genderValueToLabel = {
    'all': '모든 성별',
    'female': '여자만',
    'male': '남자만'
  };

  const locationValueToLabel = {
    'seoul': '서울',
    'gyeonggi': '경기',
    'daegu': '대구',
    'busan': '부산',
    'gwangju': '광주'
  };

  const ageValueToLabel = {
    'all': '연령 무관',
    '10': '10대',
    '20': '20대',
    '30': '30대',
    '40': '40대',
    '50': '50대',
    '60': '60대',
    '70': '70대 이상'
  };

  // value를 label로 변환하는 함수들
  const getGenderLabel = (value: string) => genderValueToLabel[value] || value;
  const getLocationLabel = (value: string) => locationValueToLabel[value] || value;
  const getAgeLabel = (value: string) => ageValueToLabel[value] || value;

  const StatusButtonStyle = styled.View`
      padding: 5px 10px;
      background-color: ${status === 0 ? '#e8f4fc' : '#EDEDED'};

      border-radius: 15px;
    `;

    const StatusTextStyle = styled.Text`
      font-family: "NanumSquareRoundR";
      font-size: 14px;
      color: ${status === 0 ? '#4096ff' : '#5F5F5F'};
    `;

  return (
    <Container>
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingTop: 0 }}>
        <DetailCard>
          {/* Title and Status */}
          <TitleContainer>
            <Title>{title}</Title>
            <StatusButtonStyle>
              <StatusTextStyle>
                {status === 0 ? "모집중" : "완료"}
              </StatusTextStyle>
            </StatusButtonStyle>
          </TitleContainer>

          {/* Schedule Info */}
          <Section>
            <SectionTitle>관련된 스케줄 정보</SectionTitle>
            <SectionText>{scheduleName}</SectionText>
          </Section>

          {/* Recruitment Period */}
          <Section>
            <SectionTitle>모집 기간</SectionTitle>
            <SectionText>
                {startDate === expiredDate
                    ? startDate
                    : `${startDate} ~ ${expiredDate}`}

            </SectionText>
          </Section>

          {/* Participants Info */}
          <Section>
            <SectionTitle>현재 인원/최대 인원 명</SectionTitle>
            <SectionRow>
              <Icon source={require("../../assets/images/people_icon.png")} />
              <SectionText>{`${currentParticipants}/${maxParticipants}`}</SectionText>
            </SectionRow>
          </Section>

          {/* Tags */}
          <Section>
            <TagContainer>
              <Tag>
                <TagText>{getGenderLabel(genderPreference)}</TagText>
              </Tag>
              <Tag>
                <TagText>{getAgeLabel(agePreference)}</TagText>
              </Tag>
              <Tag>
                <TagText>{getLocationLabel(locationPreference)}</TagText>
              </Tag>
            </TagContainer>
          </Section>

          {/* User Notes */}
          <Section>
            <SectionTitle>하고싶은 말</SectionTitle>
            <SectionText> {additionalNote === null || additionalNote === '' ? '없음' : additionalNote}</SectionText>
          </Section>

          {/* Rules */}
          {/*
          <Section>
            <SectionTitle>규칙</SectionTitle>
            <SectionText>사용자가 작성한 간단한 규칙</SectionText>
          </Section>
          */}

          {/* Join Button */}
          <JoinButton>
            <JoinButtonText>동행 참여</JoinButtonText>
          </JoinButton>
        </DetailCard>
      </ScrollView>
    </Container>
  );
}
