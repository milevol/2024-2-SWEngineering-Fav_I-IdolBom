import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ScheduleContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 352px;
  height: 48px;
  background-color: #EAF0F8;
  border-radius: 50px;
  padding: 0 20px;
  margin-top: 10px;
`;

const ScheduleText = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

const ScheduleTextContent = styled.Text`
  font-family: ${({ selected }) => (selected ? 'NanumSquareRoundEB' : 'NanumSquareRoundB')};
  font-size: 16px;
  color: ${({ selected }) => (selected ? '#000000' : '#898989')};
  background-color: ${({ selected }) => (selected ? '#FFFFFF' : 'transparent')};
  padding: 7px 15px;
  border-radius: 50px;
`;

const ScheduleList = styled.View`
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const NoScheduleText = styled.Text`
  font-family: 'NanumSquareRoundR';
  font-size: 16px;
  color: #898989;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ScheduleCardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F3F8FF;
  border-radius: 20px;
  padding: 16px;
  margin-bottom: 10px;
  margin-left: 31px;
  margin-right: 31px;
`;

const TimeText = styled.Text`
  font-family: 'NanumSquareRoundB';
  font-size: 16px;
  color: #000000;
  margin-right: 10px;
`;

const ScheduleInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

const TitleText = styled.Text`
  font-family: 'NanumSquareRoundEB';
  font-size: 18px;
  color: #000000;
  margin-bottom: 4px;
`;

const DetailsText = styled.Text`
  font-family: 'NanumSquareRoundR';
  font-size: 16px;
  color: #000000;
`;

const ArrowIcon = styled(MaterialIcons)`
  color: #BDBDBD;
`;

const ShowMoreButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 5px;
`;

export default function ThreeDaysSchedule({ showAllSchedules, toggleShowAllSchedules }) {
  const [selectedDay, setSelectedDay] = useState('today');
  const [schedules, setSchedules] = useState({ yesterday: [], today: [], tomorrow: [] });

  const BACKEND_URL = process.env.BACKEND_URL;

  useEffect(() => {
    const fetchSchedules = async () => {
      const today = new Date();
      const yesterday = new Date(today);
      const tomorrow = new Date(today);

      yesterday.setDate(today.getDate() - 1);
      tomorrow.setDate(today.getDate() + 1);

      const formatDate = (date) =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

      const formattedYesterday = formatDate(yesterday);
      const formattedToday = formatDate(today);
      const formattedTomorrow = formatDate(tomorrow);

      try {
        const response = await fetch(`${BACKEND_URL}/1/schedule/around?selectedDate=${formattedToday}`);
        if (!response.ok) throw new Error('Failed to fetch schedules');
        const data = await response.json();

        const filteredSchedules = {
          yesterday: [],
          today: [],
          tomorrow: [],
        };

        data.forEach((schedule) => {
          const scheduleDate = new Date(schedule.scheduleDate);
          const scheduleDateString = formatDate(scheduleDate);

          if (scheduleDateString === formattedYesterday) {
            filteredSchedules.yesterday.push(schedule);
          } else if (scheduleDateString === formattedToday) {
            filteredSchedules.today.push(schedule);
          } else if (scheduleDateString === formattedTomorrow) {
            filteredSchedules.tomorrow.push(schedule);
          }
        });

        setSchedules({
          yesterday: filteredSchedules.yesterday.map((schedule) => ({
            time: new Date(schedule.scheduleDate).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            title: schedule.scheduleName,
            details: `${new Date(schedule.scheduleDate).toLocaleDateString('ko-KR')} - ${
              schedule.location || '장소 미정'
            }`,
          })),
          today: filteredSchedules.today.map((schedule) => ({
            time: new Date(schedule.scheduleDate).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            title: schedule.scheduleName,
            details: `${new Date(schedule.scheduleDate).toLocaleDateString('ko-KR')} - ${
              schedule.location || '장소 미정'
            }`,
          })),
          tomorrow: filteredSchedules.tomorrow.map((schedule) => ({
            time: new Date(schedule.scheduleDate).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            title: schedule.scheduleName,
            details: `${new Date(schedule.scheduleDate).toLocaleDateString('ko-KR')} - ${
              schedule.location || '장소 미정'
            }`,
          })),
        });
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };

    fetchSchedules();
  }, []);

  const displayedSchedules = showAllSchedules
    ? schedules[selectedDay]
    : schedules[selectedDay]?.slice(0, 2);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  return (
    <>
      <ScheduleContainer>
        <ScheduleText onPress={() => handleDayChange('yesterday')}>
          <ScheduleTextContent selected={selectedDay === 'yesterday'}>어제</ScheduleTextContent>
        </ScheduleText>
        <ScheduleText onPress={() => handleDayChange('today')}>
          <ScheduleTextContent selected={selectedDay === 'today'}>오늘</ScheduleTextContent>
        </ScheduleText>
        <ScheduleText onPress={() => handleDayChange('tomorrow')}>
          <ScheduleTextContent selected={selectedDay === 'tomorrow'}>내일</ScheduleTextContent>
        </ScheduleText>
      </ScheduleContainer>

      <ScheduleList>
        {displayedSchedules.length > 0 ? (
          displayedSchedules.map((schedule, index) => (
            <ScheduleCard
              key={index}
              time={schedule.time}
              title={schedule.title}
              details={schedule.details}
            />
          ))
        ) : (
          <NoScheduleText>스케줄이 존재하지 않아요</NoScheduleText>
        )}
      </ScheduleList>

      <ShowMoreButton onPress={toggleShowAllSchedules}>
        <Ionicons
          name={showAllSchedules ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={20}
          color="#000"
        />
      </ShowMoreButton>
    </>
  );
}

// ScheduleCard 컴포넌트
function ScheduleCard({ time, title, details }) {
  return (
    <ScheduleCardContainer>
      <TimeText>{time}</TimeText>
      <ScheduleInfo>
        <TitleText>{title}</TitleText>
        <DetailsText>{details}</DetailsText>
      </ScheduleInfo>
      <ArrowIcon name="keyboard-arrow-right" size={24} /> {/* 아이콘 추가 */}
    </ScheduleCardContainer>
  );
}
