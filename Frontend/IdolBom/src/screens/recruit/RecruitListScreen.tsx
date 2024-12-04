import React, { useState } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RecruitListContainer = styled.View`
  flex: 1;
  background-color: #f3f8ff; /* 페이지 배경색 */
`;

const Header = styled.View`
  padding: 20px 15px; /* 양쪽 여백 */
  background-color: #f3f8ff;
  flex-direction: row; /* 제목과 버튼을 가로로 배치 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: space-between; ; /* 제목과 버튼 간격 조정 */
`;

// 동행 만들기 버튼 스타일
const CreateButton = styled.TouchableOpacity`
  padding: 8px 16px; /* 버튼 크기 조정 */
  background-color: #4096ff; /* 버튼 배경색 */
  border-radius: 10px; /* 모서리 둥글기 */
  align-items: center;
  justify-content: center;
  max-width: 120px; /* 버튼 가로 길이 제한 */
  margin-left: -160px;
`;
// 동행 만들기 버튼 텍스트 스타일
const CreateButtonText = styled.Text`
  font-family: "NanumSquareRoundEB";
  font-size: 16px;
  color: #ffffff; /* 텍스트 색상 */
`;

const Title = styled.Text`
  font-family: "NanumSquareRoundEB";
  font-size: 24px;
  color: #000000;
  margin-left:15px;
`;

const FilterContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly; /* 필터 버튼 간 간격 */
  margin-top: 15px;
`;

const FilterButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 8px 16px; /* 버튼 크기 조정 */
  border-radius: 20px;
  border: 2px solid ${({ selected }) => (selected ? "#1FA7DB" : "#D9D9D9")};
  background-color: #ffffff;
`;

const FilterButtonText = styled.Text<{ selected: boolean }>`
  font-family: "NanumSquareRoundEB";
  font-size: 14px;
  color: ${({ selected }) => (selected ? "#1FA7DB" : "#000000")};
`;

const ContentContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
`;

const RecruitCard = styled.View`
  position: relative; /* 내부 요소의 absolute positioning을 위해 설정 */
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  elevation: 3;
`;

const RecruitCardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const RecruitCardTitle = styled.Text`
  font-family: "NanumSquareRoundEB";
  font-size: 18px;
  color: #000000;
`;

const ParticipantsContainer = styled.View`
  position: absolute; /* 위치를 카드 내에서 상대적으로 조정 */
  top: 20px; /* 카드 상단에서 떨어진 거리 */
  right: 10px; /* 카드 오른쪽 여백 */
  align-items: center;
`;

const ParticipantsImage = styled.Image`
  width: 24px;
  height: 24px;
`;

const ParticipantsText = styled.Text`
  font-family: "NanumSquareRoundR";
  font-size: 14px;
  color: #666666;
  margin-top: 5px; /* 아이콘과 텍스트 간격 */
`;

const RecruitCardDetails = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const DetailIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 5px;
`;

const DetailText = styled.Text`
  font-family: "NanumSquareRoundR";
  font-size: 14px;
  color: #666666;
`;

const TagsContainer = styled.View`
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
  font-size: 12px;
  color: #666666;
`;

export default function RecruitListScreen() {
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const navigation = useNavigation();

  const filters = ["전체", "모집중", "완료"];

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleCardPress = (title: string, details: string) => {
    navigation.navigate("RecruitDetail", { title, details });
  };

  const handleCreateButtonPress = () => {
    // 동행 만들기 버튼 클릭 시 CreateRecruit 페이지로 이동
    navigation.navigate("CreateRecruit");
  };

  return (
    <RecruitListContainer>
      {/* 헤더 */}
      <Header>
        <Title>동행 모아보기</Title>
        <CreateButton onPress={handleCreateButtonPress}>
          <CreateButtonText>동행 만들기</CreateButtonText>
        </CreateButton>
      </Header>
      {/* 필터 */}
      <FilterContainer>
        {filters.map((filter) => (
          <FilterButton
            key={filter}
            selected={filter === selectedFilter}
            onPress={() => handleFilterClick(filter)}
          >
            <FilterButtonText selected={filter === selectedFilter}>
              {filter}
            </FilterButtonText>
          </FilterButton>
        ))}
      </FilterContainer>
      {/* 카드 목록 */}
      <ContentContainer>
        {Array.from({ length: 8 }, (_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              handleCardPress(`[콘서트] 동행모집 제목 ${i + 1}`, "2024.00.00 ~ 2024.00.00")
            }
          >
            <RecruitCard>
              <RecruitCardHeader>
                <RecruitCardTitle>
                  [콘서트] 동행모집 제목 {i + 1}
                </RecruitCardTitle>
                <ParticipantsContainer>
                  <ParticipantsImage
                    source={require("../../assets/images/people_icon.png")}
                  />
                  <ParticipantsText>3/6</ParticipantsText>
                </ParticipantsContainer>
              </RecruitCardHeader>
              <DetailText>2024.00.00 ~ 2024.00.00</DetailText>
              <RecruitCardDetails>
                <DetailIcon
                  source={require("../../assets/images/line-md_calendar.png")}
                />
                <DetailText>2024.00.00 요일</DetailText>
              </RecruitCardDetails>
              <TagsContainer>
                <Tag>
                  <TagText>모든 성별</TagText>
                </Tag>
                <Tag>
                  <TagText>희망 나이대</TagText>
                </Tag>
                <Tag>
                  <TagText>희망 지역</TagText>
                </Tag>
              </TagsContainer>
            </RecruitCard>
          </TouchableOpacity>
        ))}
      </ContentContainer>
    </RecruitListContainer>
  );
}
