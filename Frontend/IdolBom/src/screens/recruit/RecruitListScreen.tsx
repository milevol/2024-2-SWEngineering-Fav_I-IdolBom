import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_URL } from '@env';

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
  margin-bottom: 100px;
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
  const [selectedFilter, setSelectedFilter] = useState("모집중");
  const navigation = useNavigation();

  const filters = ["전체", "모집중", "완료"];
  const [filteredRecruits, setFilteredRecruits] = useState([]);
  const [recruits, setRecruits] = useState([]); {/* 동행 리스트 목록 */}

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

  const getGenderLabel = (value: string) => genderValueToLabel[value] || value;
  const getLocationLabel = (value: string) => locationValueToLabel[value] || value;
  const getAgeLabel = (value: string) => ageValueToLabel[value] || value;


/*
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };
 */

  const handleCardPress = (
    title: string,
    details: string,
    status: number,
    genderPref: string,
    agePref: string,
    locationPref: string,
    additionalNote: string | null,
    currentParticipants: number,
    maxParticipants: number,
    startDate: string,
    expiredDate: string,
    scheduleName: string
  ) => {
    navigation.navigate("RecruitDetail", {
      title,
      details,
      status,
      genderPreference: genderPref,
      agePreference: agePref,
      locationPreference: locationPref,
      additionalNote,
      currentParticipants,
      maxParticipants,
      startDate,
      expiredDate,
      scheduleName
    });
  };

  const handleCreateButtonPress = () => {
    // 동행 만들기 버튼 클릭 시 CreateRecruit 페이지로 이동
    navigation.navigate("CreateRecruit");
  };

  // 필터에 따라 목록 모집글 필터링
  const filterRecruits = (filter: string, recruitList: any[]) => {
    switch (filter) {
      case "모집중":
        return recruitList.filter(recruit => recruit.status === 0);
      case "완료":
        return recruitList.filter(recruit => recruit.status === 1);
      default: // "전체"
        return recruitList;
    }
  };

  // 필터 중 하나 클릭했을 때 처리함수
  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    setFilteredRecruits(filterRecruits(filter, recruits));
  };

  // 동행 목록 가져오기
  useEffect(() => {
    const fetchRecruits = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/recruit`);
        if (!response.ok) {
          throw new Error('Failed to fetch recruits');
        }
        const data = await response.json();
        if (data.code === 'SU') {
          setRecruits(data.recruitList);
          setFilteredRecruits(filterRecruits(selectedFilter, data.recruitList)); // 초기 필터링
        }
      } catch (error) {
        console.error('Error fetching recruits:', error);
      }
    };

    fetchRecruits();
  }, []);


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
        {filteredRecruits.map((recruit) => (
                  <TouchableOpacity
                    key={recruit.id}
                    onPress={() =>
                      handleCardPress(recruit.title, `${recruit.startDate} ~ ${recruit.expiredDate}`,
                          recruit.status,
                          recruit.genderPreference,
                          recruit.agePreference,
                          recruit.locationPreference,
                          recruit.additionalNote,
                          recruit.currentParticipants,
                          recruit.maxParticipants,
                          recruit.startDate,
                          recruit.expiredDate,
                          recruit.scheduleID.scheduleName

                          )
                    }
                  >
                    <RecruitCard>
                      <RecruitCardHeader>
                        <RecruitCardTitle>
                          {recruit.title}
                        </RecruitCardTitle>
                        <ParticipantsContainer>
                          <ParticipantsImage source={require("../../assets/images/people_icon.png")} />
                          <ParticipantsText>{`${recruit.currentParticipants}/${recruit.maxParticipants}`}</ParticipantsText>
                        </ParticipantsContainer>
                      </RecruitCardHeader>
                      {/* 날짜가 같으면 단일 날짜만, 다르면 범위로 표시 */}

                      <RecruitCardDetails>
                        <DetailIcon source={require("../../assets/images/line-md_calendar.png")} />
                        <DetailText>
                            {recruit.startDate === recruit.expiredDate
                               ? recruit.startDate
                               : `${recruit.startDate} ~ ${recruit.expiredDate}`}</DetailText>
                      </RecruitCardDetails>
                      <TagsContainer>
                        <Tag>
                          <TagText>{getGenderLabel(recruit.genderPreference)}</TagText>
                        </Tag>
                        <Tag>
                          <TagText>{getAgeLabel(recruit.agePreference)}</TagText>
                        </Tag>
                        <Tag>
                          <TagText>{getLocationLabel(recruit.locationPreference)}</TagText>
                        </Tag>
                      </TagsContainer>
                    </RecruitCard>
                  </TouchableOpacity>
                ))}
      </ContentContainer>
    </RecruitListContainer>
  );
}
