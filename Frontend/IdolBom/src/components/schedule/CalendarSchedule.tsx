import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ScheduleCard from './ScheduleCard';

// Locale 설정
LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월',
  ],
  monthNamesShort: [
    '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월',
  ],
  dayNames: ['일요일', '월요일', '화요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

const WhiteRectangle = styled.View`
  width: 100%;
  background-color: #ffffff;
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

const ScheduleCardList = styled.ScrollView`
  margin-top: 50px;
  max-height: 300px;
  margin-bottom: 70px;
`;

export default function CalendarSchedule({ navigation, onDaySelect, onCollapse, calendarExpanded }) {
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.BACKEND_URL;

  useEffect(() => {
    const fetchSchedules = async () => {
      const { year, month } = currentMonth;
      try {
        const response = await fetch(`${BACKEND_URL}/1/schedule/exists?year=${year}&month=${month}`);
        if (!response.ok) throw new Error('Failed to fetch schedules');
        const data = await response.json();

        setSchedules(data);

        const marked = {};
        data.forEach(schedule => {
          const date = schedule.scheduleDate.split('T')[0];
          marked[date] = { marked: true, dotColor: '#3E95FF' };
        });

        setMarkedDates(marked);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [currentMonth]);

  const handleMonthChange = (month) => {
    setCurrentMonth({ year: month.year, month: month.month });
    setSelectedDate(null);
    setFilteredSchedules([]);
  };

  const handleDayPress = (day) => {
    const selected = day.dateString;
    setSelectedDate(selected);

    const filtered = schedules.filter(
      (schedule) => schedule.scheduleDate.split('T')[0] === selected
    );
    setFilteredSchedules(filtered);

    onDaySelect && onDaySelect(selected);
  };

  const handleCollapse = () => {
    setSelectedDate(null);
    setFilteredSchedules([]);
    onCollapse && onCollapse();
  };

  const handleSchedulePress = (schedule) => {
    navigation.navigate('ScheduleDetail', { schedule });
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#3E95FF"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }

  return (
    <>
      <WhiteRectangle>
        <CalendarWrapper calendarExpanded={calendarExpanded}>
          {calendarExpanded && (
            <CollapseButton onPress={handleCollapse}>
              <Ionicons name="chevron-up-outline" size={20} color="#000" />
            </CollapseButton>
          )}
          <Calendar
            monthFormat={'yyyy년 MM월'}
            markedDates={{
              ...markedDates,
              [selectedDate]: { selected: true, selectedColor: '#3E95FF' },
            }}
            onDayPress={handleDayPress}
            onMonthChange={handleMonthChange}
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
      {calendarExpanded && selectedDate && (
        <ScheduleCardList>
          {filteredSchedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              title={schedule.scheduleName}
              details={`${schedule.scheduleDate.split('T')[0]}, ${schedule.location || '위치 정보 없음'}`}
              onPress={() => handleSchedulePress(schedule)}
            />
          ))}
        </ScheduleCardList>
      )}
    </>
  );
}
