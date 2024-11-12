// CalendarSchedule.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScheduleCard from './ScheduleCard';

const WhiteRectangle = styled.View`
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 50px;
  padding: 0 24px;
  position: relative;
`;

const CalendarWrapper = styled.View`
  width: 100%;
  padding-top: ${({ calendarExpanded }) => (calendarExpanded ? '40px' : '24px')};
`;

const CollapseButton = styled.TouchableOpacity`
  align-items: center;
  align-self: center;
  position: absolute;
  bottom: -30px;
  z-index: 1;
`;

const CategoryButtonContainer = styled.View`
  position: absolute;
  left: 21px;
  width: 150px;
  background-color: #EAF0F8;
  border-radius: 20px;
  z-index: 1;
`;

const ScheduleCardList = styled(ScrollView)`
  margin-top: 50px;
  max-height: 300px;
  margin-bottom: 70px;
`;

export default function CalendarSchedule({ onDaySelect, onCollapse, calendarExpanded }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // 스케줄 데이터 예시
  const schedules = [
    { title: '미팅', details: '2024-11-15, 서울역' },
    { title: '프로젝트 회의', details: '2024-11-16, 강남구청' },
    { title: '스터디 모임', details: '2024-11-17, 스타벅스' },
    { title: '개발 발표', details: '2024-11-18, 회사 사무실' },
    { title: '회식', details: '2024-11-19, 종로' },
  ];

  return (
    <>
      <WhiteRectangle>
        <CalendarWrapper calendarExpanded={calendarExpanded}>
          {calendarExpanded && (
            <>
              <CategoryButtonContainer>
                <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  style={{ height: 30, color: '#000' }} // 스타일 추가
                >
                  <Picker.Item label="카테고리 선택" value="all" />
                  <Picker.Item label="미팅" value="meeting" />
                  <Picker.Item label="프로젝트" value="project" />
                  <Picker.Item label="스터디" value="study" />
                  <Picker.Item label="개발" value="development" />
                </Picker>
              </CategoryButtonContainer>
              <CollapseButton onPress={onCollapse}>
                <Ionicons name="chevron-up-outline" size={20} color="#000" />
              </CollapseButton>
            </>
          )}
          <Calendar
            current={'2024-11-01'}
            markedDates={{
              '2024-11-15': { selected: true, marked: true, selectedColor: '#3E95FF' },
              '2024-11-20': { marked: true, dotColor: '#3E95FF' },
              '2024-11-25': { marked: true, dotColor: '#3E95FF' },
            }}
            onDayPress={(day) => {
              console.log('selected day', day);
              onDaySelect();
            }}
            theme={{
              selectedDayBackgroundColor: '#3E95FF',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#3E95FF',
              arrowColor: '#3E95FF',
              monthTextColor: '#4A5660',
              textDayFontFamily: 'NanumSquareRound',
              textMonthFontFamily: 'NanumSquareRound',
              textDayHeaderFontFamily: 'NanumSquareRound',
            }}
          />
        </CalendarWrapper>
      </WhiteRectangle>
      {/* WhiteRectangle 아래에 스크롤 가능한 스케줄 카드 리스트 */}
      <ScheduleCardList>
        {schedules.map((schedule, index) => (
          <ScheduleCard key={index} title={schedule.title} details={schedule.details} />
        ))}
      </ScheduleCardList>
    </>
  );
}
