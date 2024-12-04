import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, TextInput, TouchableOpacity, Text, Image, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Container = styled.View`
  flex: 1;
  background-color: #f3f8ff;
`;

const DetailCard = styled.View`
  width: 358px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  elevation: 5;
  padding: 20px;
  padding-top: 100px;
  margin: 20px auto;
  margin-top: -100px;
  margin-bottom: 120px;

`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  justify-content: flex-start;
  gap: 8px;
`;

const Section = styled.View`
  margin-bottom: 15px;
  padding-left: 10px;
`;

const SectionTitle = styled.Text`
  font-family: "NanumSquareRoundEB";
  font-size: 20px;
  color: #000000;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const HintText = styled.Text`
  font-family: "NanumSquareRoundR";
  font-size: 16px;
  color: #999999;

`;

const Input = styled.TextInput`
  height: 50px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const DropdownContainer = styled.View`
  margin-top: 10px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Button = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid ${({ selected }) => (selected ? '#3E95FF' : '#d9d9d9')};
  background-color: ${({ selected }) => (selected ? '#E8F4FF' : '#EDEDED')};
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  font-family: "NanumSquareRoundR";
  font-size: 16px;
  color: #000000;
`;

const CalendarSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  padding-left: 10px;
`;

const CalendarIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const PeopleSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const PeopleIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const PeopleDropdown = styled(Dropdown)`
  flex: 1;
`;

const PlaceholderText = styled.Text`
  font-size: 16px;
  color: #999999;
  margin-left: 8px;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  background-color: #4096ff;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
`;

const SubmitButtonText = styled.Text`
  font-family: "NanumSquareRoundEB";
  font-size: 18px;
  color: #ffffff;
`;

const TitleWithLogo = styled.Text`
   font-family: "NanumSquareRoundEB";
   font-size: 16px;
   color: #000000;
   justify-content: space-between;

`;


export default function CreateRecruitScreen({ navigation }) {
  const [gender, setGender] = useState(null);
  const [peopleCnt, setPeopleCnt] = useState('2'); /*  희망 인원수 기본 시작값 2명  */
  const [region, setRegion] = useState('seoul');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedAges, setSelectedAges] = useState(['all']); /* 희망 연령 복수개 선택 가능 */
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showPeriodCalendar, setShowPeriodCalendar] = useState(false); /* 모집기간 */
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const genderOptions = [
    { label: '모든 성별', value: 'all' },
    { label: '여자만', value: 'female' },
    { label: '남자만', value: 'male' },
  ];

  const regionOptions = [
    { label: '서울', value: 'seoul' },
    { label: '경기', value: 'gyeonggi' },
    { label: '대구', value: 'daegu' },
    { label: '부산', value: 'busan' },
    { label: '광주', value: 'gwangju' },
  ];

const peopleCntOptions = [
  { label: '2 명', value: '2' },
  { label: '3 명', value: '3' },
  { label: '4 명', value: '4' },
  { label: '5 명', value: '5' },
  { label: '6 명', value: '6' },
  { label: '7 명', value: '7' },
  { label: '8 명', value: '8' },
  { label: '9 명', value: '9' },
  { label: '10 명', value: '10' },
];

const ageOptions = [
    { label: '연령 무관', value: 'all' },
    { label: '10대', value: '10'},
    { label: '20대', value: '20'},
    { label: '30대', value: '30'},
    { label: '40대', value: '40'},
    { label: '50대', value: '50'},
    { label: '60대', value: '60'},
    { label: '70대 이상', value: '70' },
 ];


  const handleGenderSelect = (value) => {
    setSelectedGender(value);
  };

/* 희망 연령 선택  */
  const handleAgeSelect = (value, event) => {
    if (value === 'all') {
      setSelectedAges(['all']);
    } else {
      if (selectedAges.includes('all')) {
        setSelectedAges([value]);
      } else {
        setSelectedAges((prev) => {
          if (prev.includes(value)) {
            return prev.filter((age) => age !== value);
          } else {
            return [...prev, value];
          }
        });
      }
    }
  };

  // 날짜 범위 계산 함수
  const getDatesInRange = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <DetailCard>
          {/* 동행 모집 제목 */}
          <Section>
            <Input placeholder="동행 모집 제목을 작성해주세요." />
          </Section>

          {/* 관련된 스케줄 정보 */}
          <Section>
            <SectionTitle>관련된 스케줄 정보</SectionTitle>
          </Section>

          {/* 모집 기간 */}
          <Section>
            <SectionTitle>모집 정보</SectionTitle>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => setShowPeriodCalendar(true)}
              >
                <CalendarIcon source={require('../../assets/images/line-md_calendar.png')} />
                <TitleWithLogo>
                  {startDate && endDate
                    ? `${startDate} ~ ${endDate}`
                    : '모집 시작일 ~ 종료일 선택'}
                </TitleWithLogo>
              </TouchableOpacity>
          </Section>

          {/* 모임 날짜 */}
          <CalendarSection>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => setShowCalendar(true)}
              >
                <CalendarIcon source={require('../../assets/images/line-md_calendar.png')} />
                <TitleWithLogo>
                  {selectedDate ? selectedDate : '모임 날짜 고르기'}
                </TitleWithLogo>
              </TouchableOpacity>
          </CalendarSection>

          {/* 모집 인원 */}
          <PeopleSection>
            <PeopleIcon source={require('../../assets/images/people_icon.png')} style={{ marginLeft: 10 }}/>
            <TitleWithLogo> 인원  </TitleWithLogo>

           <Dropdown
               style={{
                 height: 40,
                 width: 80,
                 borderColor: '#d9d9d9',
                 borderWidth: 1,
                 borderRadius: 10,
                 paddingHorizontal: 10,
                 backgroundColor: '#ffffff',
               }}
               data={peopleCntOptions}
               labelField="label"
               valueField="value"
               value={peopleCnt}
               onChange={(item) => {
                 setPeopleCnt(item.value);
               }}
               selectedTextStyle={{
                 fontSize: 16,
                 color: '#000000',
               }}

               renderSelectedItem={(item) => (
                 <Text style={{
                   fontSize: 16,
                   color: '#000000',
                 }}>
                   {item.value}
                 </Text>
               )}
               dropdownStyle={{
                 borderRadius: 10,
                 backgroundColor: '#ffffff',
                 borderColor: '#d9d9d9',
                 borderWidth: 1,
               }}
               renderItem={(item) => (
                 <Text
                   style={{
                     fontSize: 16,
                     color: '#000000',
                     paddingVertical: 8,
                     paddingHorizontal: 12,
                   }}
                 >
                   {item.label}
               </Text>
             )}
           />
            <PlaceholderText>최대 10명이에요</PlaceholderText>
          </PeopleSection>

          {/* 희망 성별 */}
          <Section>
            <TitleContainer>
                <SectionTitle>희망 성별</SectionTitle>
                <HintText>(1개 선택)</HintText>
            </TitleContainer>
            <ButtonGroup>
              {genderOptions.map((option) => (
                <Button
                  key={option.value}
                  selected={selectedGender === option.value}
                  onPress={() => handleGenderSelect(option.value)}
                >
                  <ButtonText>{option.label}</ButtonText>
                </Button>
              ))}
            </ButtonGroup>
          </Section>

          {/* 희망 연령 */}
          <Section>
            <TitleContainer>
                <SectionTitle>희망 연령</SectionTitle>
                <HintText>(복수 선택 가능)</HintText>
            </TitleContainer>
            <ButtonGroup>
                {ageOptions.map((option) => (
                 <Button
                   key={option.value}
                   selected={selectedAges.includes(option.value)}
                   onPress={(e) => {
                     e.preventDefault();
                     e.stopPropagation();
                     handleAgeSelect(option.value);
                   }}
                 >
                   <ButtonText>{option.label}</ButtonText>
                 </Button>
                ))}
              </ButtonGroup>
          </Section>

          {/* 희망 지역 */}
          <Section>
              <PeopleSection>
                <SectionTitle>희망 지역</SectionTitle>
                <Dropdown
                  style={{
                    height: 40,
                    width: 100,
                    marginLeft: 20,
                    borderColor: '#d9d9d9',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    backgroundColor: '#ffffff',
                  }}
                  data={regionOptions}
                  labelField="label"
                  valueField="value"
                  value={region}
                  onChange={(item) => {
                    setRegion(item.value);
                  }}
                  selectedTextStyle={{
                    fontSize: 16,
                    color: '#000000',
                  }}
                  renderSelectedItem={(item) => (
                    <Text style={{
                      fontSize: 16,
                      color: '#000000',
                    }}>
                      {item.value === 'seoul' ? '서울' :
                       item.value === 'gyeonggi' ? '경기' :
                       item.value === 'daegu' ? '대구' :
                       item.value === 'busan' ? '부산' : '광주'}
                    </Text>
                  )}
                  dropdownStyle={{
                    borderRadius: 10,
                    backgroundColor: '#ffffff',
                    borderColor: '#d9d9d9',
                    borderWidth: 1,
                  }}
                  renderItem={(item) => (
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#000000',
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                      }}
                    >
                      {item.label}
                    </Text>
                  )}
                />
            </PeopleSection>
          </Section>

          {/* 하고 싶은 말 */}
          <Section>
            <TitleContainer>
                <SectionTitle>하고 싶은 말</SectionTitle>
                <HintText>(선택)</HintText>
            </TitleContainer>
            <Input placeholder="동행원들에게 하고 싶은 말을 간단히 작성해주세요." />
          </Section>


          {/* 한줄 규칙 */}
          <Section>
            <TitleContainer>
              <SectionTitle>한줄 규칙 </SectionTitle>
              <HintText>(선택)</HintText>
            </TitleContainer>
            <Input placeholder="동행원들과 지키고 싶은 규칙을 작성해주세요." />
          </Section>

          {/* 동행 만들기 버튼 */}
          <SubmitButton onPress={() => {
              // 여기에 나중에 백엔드 연동 로직이 들어갈 자리

              // RecruitListScreen으로 이동
              navigation.navigate('Recruit');
          }}>
              <SubmitButtonText>동행 만들기</SubmitButtonText>
          </SubmitButton>
        </DetailCard>
      </ScrollView>
      {/* 모집 정보 - 시작일 종료일 선택 */}
        <Modal
          transparent={true}
          visible={showCalendar}
          animationType="fade"
          onRequestClose={() => setShowCalendar(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowCalendar(false)}
          >
            <View style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
            }}>
              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  setShowCalendar(false);
                }}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: '#4096FF' }
                }}
                theme={{
                  todayTextColor: '#4096FF',
                  selectedDayBackgroundColor: '#4096FF',
                  arrowColor: '#4096FF',
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
        {/* 모집기간 시작일 ~ 종료일 선택용 */}
        <Modal
          transparent={true}
          visible={showPeriodCalendar}
          animationType="fade"
          onRequestClose={() => setShowPeriodCalendar(false)}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowPeriodCalendar(false)}
          >
            <View style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 20,
            }}>
              <Calendar
                current={startDate || new Date()}
                onDayPress={(day) => {
                  if (!startDate || (startDate && endDate)) {
                    // 새로운 기간 선택 시작
                    setStartDate(day.dateString);
                    setEndDate('');
                  } else {
                    // 기간 선택 완료
                    if (new Date(day.dateString) >= new Date(startDate)) {
                      setEndDate(day.dateString);
                      setShowPeriodCalendar(false);
                    } else {
                      // 시작일보다 이전 날짜 선택 시
                      setStartDate(day.dateString);
                      setEndDate('');
                    }
                  }
                }}
                markingType={'period'}
                markedDates={{
                  [startDate]: { startingDay: true, color: '#4096FF', textColor: 'white' },
                  [endDate]: { endingDay: true, color: '#4096FF', textColor: 'white' },
                  ...(startDate && endDate
                    ? getDatesInRange(startDate, endDate).reduce((acc, date) => ({
                        ...acc,
                        [date]: { color: '#E8F4FF' },
                      }), {})
                    : {}),
                }}
                theme={{
                  todayTextColor: '#4096FF',
                  selectedDayBackgroundColor: '#4096FF',
                  arrowColor: '#4096FF',
                }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
    </Container>
     );
    }

