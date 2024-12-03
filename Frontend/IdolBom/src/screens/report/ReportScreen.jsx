import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

export default function ReportScreen() {
  const [selectedReason, setSelectedReason] = useState(null);

  const reasons = [
    '스팸 / 유사 투자자문 등',
    '음란 / 성적 행위',
    '성범죄',
    '욕설 / 폭력 / 혐오',
    '사기 / 사칭',
    '명예훼손 / 저작권 등 권리 침해',
    '기타',
  ];

  return (
    <Container>
      <UserInfo>
        <UserAvatar />
        <UserDetails>
          <Nickname>닉네임</Nickname>
          <TrustRow>
            <TrustLevel>신뢰도</TrustLevel>
            <TrustBar>
              <FilledBar />
            </TrustBar>
          </TrustRow>
        </UserDetails>
      </UserInfo>

      <ScrollView>
        <Section>
          <SectionTitle>＃신고 사유를 선택해주세요</SectionTitle>
          {reasons.map((reason, index) => (
            <ReasonWrapper key={index}>
              <RadioButton
                onPress={() => setSelectedReason(index)}
                isSelected={selectedReason === index}
              >
                {selectedReason === index && <RadioInner />}
              </RadioButton>
              <ReasonText>{reason}</ReasonText>
            </ReasonWrapper>
          ))}
        </Section>

        <PhotoSection>
          <SectionTitle>
            ＃사진 첨부 및 설명 <Optional>(선택)</Optional>
          </SectionTitle>
          <PhotoWrapper>
            <AddPhotoBox>
              <AddText>+</AddText>
            </AddPhotoBox>
            <DescriptionBox
              placeholder="신고 사유를 입력해주세요."
              multiline={true}
              numberOfLines={5}
            />
          </PhotoWrapper>
        </PhotoSection>
      </ScrollView>

      <SubmitButton>
        <SubmitText>제출</SubmitText>
      </SubmitButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  left: 10px;
`;

const UserDetails = styled.View`
  flex-direction: column;
  left: 10px;
`;

const TrustRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const UserAvatar = styled.View`
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.09);
  border-radius: 50px;
  margin-right: 20px;
`;

const Nickname = styled.Text`
  font-family: 'NanumSquareRoundEB';
  font-size: 26px;
  color: #000;
`;

const TrustLevel = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 16px;
  color: #000;
`;

const TrustBar = styled.View`
  width: 100px;
  height: 15px;
  background-color: #cce4ff;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 10px;
`;

const FilledBar = styled.View`
  width: 30%;
  border-radius: 10px;
  height: 100%;
  background-color: #3e95ff;
`;

const Section = styled.View`
  margin-top: 15px;
  left: 10px;
`;

const PhotoSection = styled(Section)`
  margin-top: 0px;
`;

const SectionTitle = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 22px;
  color: #000;
  margin-bottom: 15px;
  margin-top: 20px;
`;

const Optional = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 14px;
  color: #858585;
`;

const ReasonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const RadioButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 2px solid #838383;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const RadioInner = styled.View`
  width: 12px;
  height: 12px;
  background-color: #000;
  border-radius: 6px;
`;

const ReasonText = styled.Text`
  font-family: 'NanumSquareRoundR';
  font-size: 18px;
  color: #000;
`;

const PhotoWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
`;

const AddPhotoBox = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: #e8e8e8;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border: 1px dashed #000;
`;

const AddText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 24px;
  color: #727272;
`;

const DescriptionBox = styled.TextInput`
  flex: 1;
  background-color: #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  margin-left: 10px;
  font-family: 'NanumSquareRoundR';
  font-size: 18px;
  color: #000;
  height: 120px;
  text-align-vertical: top;
`;

const SubmitButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 20px;
  height: 50px;
  background-color: #3e95ff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const SubmitText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: #fff;
`;
