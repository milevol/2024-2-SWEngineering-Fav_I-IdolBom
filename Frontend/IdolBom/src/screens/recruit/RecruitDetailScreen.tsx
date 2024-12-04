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
  height: 600px;
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
  const { title, details } = route.params;

  return (
    <Container>
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingTop: 0 }}>
        <DetailCard>
          {/* Title and Status */}
          <TitleContainer>
            <Title>{title}</Title>
            <StatusButton>
              <StatusText>모집중</StatusText>
            </StatusButton>
          </TitleContainer>

          {/* Schedule Info */}
          <Section>
            <SectionTitle>관련된 스케줄 정보</SectionTitle>
            <SectionText>{details}</SectionText>
          </Section>

          {/* Recruitment Period */}
          <Section>
            <SectionTitle>모집 기간</SectionTitle>
            <SectionText>시작일 ~ 종료일</SectionText>
          </Section>

          {/* Participants Info */}
          <Section>
            <SectionTitle>현재 인원/최대 인원 명</SectionTitle>
            <SectionRow>
              <Icon source={require("../../assets/images/people_icon.png")} />
              <SectionText>3/6</SectionText>
            </SectionRow>
          </Section>

          {/* Tags */}
          <Section>
            <TagContainer>
              <Tag>
                <TagText>모든 성별</TagText>
              </Tag>
              <Tag>
                <TagText>희망 나이대</TagText>
              </Tag>
              <Tag>
                <TagText>희망 지역</TagText>
              </Tag>
            </TagContainer>
          </Section>

          {/* User Notes */}
          <Section>
            <SectionTitle>하고싶은 말</SectionTitle>
            <SectionText>사용자가 간단히 작성한 하고싶은 말</SectionText>
          </Section>

          {/* Rules */}
          <Section>
            <SectionTitle>규칙</SectionTitle>
            <SectionText>사용자가 작성한 간단한 규칙</SectionText>
          </Section>

          {/* Join Button */}
          <JoinButton>
            <JoinButtonText>동행 참여</JoinButtonText>
          </JoinButton>
        </DetailCard>
      </ScrollView>
    </Container>
  );
}
