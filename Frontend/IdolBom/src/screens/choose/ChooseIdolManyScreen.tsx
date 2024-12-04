import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ChanwonImage from '../../assets/images/chanwon.svg';
import DongwonImage from '../../assets/images/dongwon.svg';
import HwijaeImage from '../../assets/images/hwijae.svg';
import MinhoImage from '../../assets/images/minho.svg';
import YoungtakImage from '../../assets/images/youngtak.svg';
import YoungungImage from '../../assets/images/youngung.svg';
import OneImage from '../../assets/images/1.svg';
import TwoImage from '../../assets/images/2.svg';
import ThreeImage from '../../assets/images/3.svg';

const idols = [
  { id: 1, name: '임영웅', image: YoungungImage },
  { id: 2, name: '장민호', image: MinhoImage },
  { id: 3, name: '이찬원', image: ChanwonImage },
  { id: 4, name: '영탁', image: YoungtakImage },
  { id: 5, name: '정동원', image: DongwonImage },
  { id: 6, name: '김희재', image: HwijaeImage },
  { id: 7, name: '임영우', image: OneImage },
  { id: 8, name: '임여웅', image: TwoImage },
  { id: 9, name: '임영움', image: ThreeImage },
];

export default function IdolSelection() {
  const [selectedIdol, setSelectedIdol] = useState(null);
  const navigation = useNavigation(); // Navigation 객체 가져오기

  const BACKEND_URL = process.env.BACKEND_URL;

  const handleSelect = (idol) => {
    setSelectedIdol(idol);
  };

const handleConfirmSelection = async () => {
  if (selectedIdol) {
    try {
      const response = await fetch(`${BACKEND_URL}/idol/${selectedIdol.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // JSON 응답을 명시적으로 요청
        },
      });

      if (!response.ok) {
        // 응답 Content-Type 확인
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          // JSON 형식 응답 처리
          const errorData = await response.json();
          console.error('Server Error (JSON):', errorData);
          alert(`서버 오류: ${errorData.message || '서버에서 문제가 발생했습니다.'}`);
        } else {
          // HTML 형식 응답 처리
          const errorText = await response.text();
          console.error('Server Error (HTML):', errorText);
          alert('서버에서 문제가 발생했습니다. 관리자에게 문의하세요.');
        }
        return;
      }

      // 정상 응답 처리
      const data = await response.json();
      console.log('API Response:', data);
      navigation.navigate('Main', { screen: 'Home', idolData: data });
    } catch (error) {
      console.error('Fetch Error:', error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  } else {
    alert('아이돌을 선택해주세요!');
  }
};


  return (
    <Container>
      {selectedIdol && (
        <BackgroundSVGWrapper>
          {/* 배경 SVG */}
          <selectedIdol.image
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: 'absolute',
              opacity: 0.5,
            }}
          />

          {/* 상단 그라데이션 */}
          <TopGradient
            colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
            locations={[0, 1]}
          />

          {/* 하단 그라데이션 */}
          <BottomGradient
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
            locations={[0, 1]}
          />
        </BackgroundSVGWrapper>
      )}

      <Header>
        <Title>아이돌 선택하기</Title>
      </Header>
      <SubTitle>
        좋아하는 가수를
        {"\n"}선택해주세요
      </SubTitle>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        <IdolGrid>
          {idols.map((idol, index) => (
            <IdolButton
              key={index}
              onPress={() => handleSelect(idol)}
              isSelected={selectedIdol?.name === idol.name}
            >
              <IdolImage isSelected={selectedIdol?.name === idol.name}>
                <idol.image width="110" height="110" />
              </IdolImage>
              <IdolName>{idol.name}</IdolName>
            </IdolButton>
          ))}
        </IdolGrid>
      </ScrollView>
      {selectedIdol && <SelectedIdol>{selectedIdol.name}</SelectedIdol>}
      <SelectButton onPress={handleConfirmSelection}>
        <ButtonText>선택하기</ButtonText>
      </SelectButton>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

/* 배경을 감싸는 Wrapper */
const BackgroundSVGWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

/* 상단 그라데이션 */
const TopGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 20%; /* 상단 그라데이션 높이 */
`;

/* 하단 그라데이션 */
const BottomGradient = styled(LinearGradient)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%; /* 하단 그라데이션 높이 */
`;

const Header = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Title = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 24px;
  color: #000;
  top: 10px;
`;

const SubTitle = styled.Text`
  text-align: left;
  align-self: flex-start;
  margin-left: 35px; /* 왼쪽 여백 추가 */
  font-family: 'NanumSquareRoundR';
  font-size: 20px;
  color: #000;
  top: 70px;
  line-height: 30px;
`;

const IdolGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;
  width: 90%;
  margin-top: 80px;
`;

const IdolButton = styled.TouchableOpacity`
  width: 30%;
  margin: 1%;
  align-items: center;
`;

const IdolImage = styled.View`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 30px;
  overflow: hidden;
  margin-top: 10px;
  border-width: ${(props) => (props.isSelected ? '5px' : '0')};
  border-color: ${(props) => (props.isSelected ? '#3E95FF' : 'transparent')};
`;

const IdolName = styled.Text`
  margin-top: 5px;
  font-family: 'NanumSquareRoundR';
  font-size: 16px;
  color: #000;
  text-align: center;
`;

const SelectedIdol = styled.Text`
  position: absolute;
  bottom: 140px;
  align-self: center;
  font-family: 'NanumSquareRoundB';
  font-size: 24px;
  color: #000;
  text-align: center;
`;

const SelectButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 70px;
  align-self: center;
  width: 192px;
  height: 56px;
  background-color: #3e95ff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 20px;
  color: #fff;
`;