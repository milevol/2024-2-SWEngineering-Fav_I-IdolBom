import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import styled from 'styled-components/native';
import ScheduleCard from '../../components/schedule/ScheduleCard';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { BACKEND_URL } from '@env';

const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: #f3f8ff;
`;

const BackgroundRectangle = styled.View`
  position: absolute;
  width: 420px;
  height: ${(props) => (props.short ? '200px' : '420px')};
  left: 0px;
  top: -63px;
  background: #FFFFFF;
  border-radius: 50px;
`;

const ToggleContainer = styled.View`
  margin-top: 40px;
  align-self: center;
  width: 370px;
  height: 40px;
  flex-direction: row;
  border: 1px solid #b3b3b3;
  border-radius: 10px;
  background: #ffffff;
`;

const ToggleButton = styled(TouchableOpacity)<{ selected: boolean }>`
  width: 183px;
  height: 38px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => (props.selected ? '#3e95ff' : '#ffffff')};
`;

const ToggleText = styled.Text<{ selected: boolean }>`
  font-family: 'NanumSquareRoundB';
  font-size: 16px;
  color: ${(props) => (props.selected ? '#ffffff' : '#727272')};
`;

const CalendarContainer = styled.View`
  overflow: hidden;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-top: 10px;
`;

const ScrollableScheduleContainer = styled(ScrollView)`
  padding-top: 20px;
  max-height: 300px;
  padding-bottom: 70px;
`;

export default function TicketScreen() {
  const [activeToggle, setActiveToggle] = useState<'구하기' | '하기'>('구하기');
  const navigation = useNavigation();

  // [api] API 데이터를 저장할 상태들
  const [markedDates, setMarkedDates] = useState<{[key: string]: {marked: boolean; dotColor: string}}>({});
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());


  const handleFindTicketPress = (schedule: Schedule) => {
    const formattedSchedule = {
      type: schedule.isTicketing ? '콘서트' : '일반 일정',
      title: schedule.scheduleName,
      date: schedule.scheduleDate.split('T')[0],
      location: schedule.location || '장소 미정',
    };

    // navigation.getParent()로 Tab.Navigator에 접근하고,
    // 그 다음 'Home' 탭으로 이동한 후 FindTicketAgent 스크린으로 이동
    navigation.getParent()?.navigate('Home', {
      screen: 'FindTicketAgent',
      params: {
        schedule: formattedSchedule
      }
    });
  };

  const handleProvideTicketPress = () => {
    Alert.alert("매칭 요청", "이 티켓팅 대리를 신청하시겠습니까?");
  };
  // [api] 스케줄 데이터를 가져오는 함수
  const fetchSchedules = async (year: number, month: number) => {
    try {
      // [api] 스케줄 데이터 API 호출
      const response = await fetch(`${BACKEND_URL}/1/schedule/exists?year=${year}&month=${month}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Schedule[] = await response.json();

      // Filter schedules where isTicketing is true
      const ticketingSchedules = data.filter(schedule => schedule.isTicketing);

      // Create marked dates object
      const newMarkedDates: {[key: string]: {marked: boolean; dotColor: string}} = {};
      ticketingSchedules.forEach(schedule => {
        const dateStr = schedule.scheduleDate.split('T')[0]; // Format: YYYY-MM-DD
        newMarkedDates[dateStr] = {
          marked: true,
          dotColor: '#3e95ff'
        };
      });

      setMarkedDates(newMarkedDates);
      setSchedules(ticketingSchedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      Alert.alert('Error', '일정을 불러오는데 실패했습니다.');
    }
  };

    // 월 변경 핸들러 추가
    const handleMonthChange = (date: { year: number; month: number }) => {
      setCurrentDate(new Date(date.year, date.month - 1));  // month는 0-based이므로 1을 빼줍니다
    };


  // [api] 컴포넌트 마운트 시와 월 변경 시 API 호출
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // JavaScript months are 0-based
    fetchSchedules(year, month);
  }, [currentDate]);


  // [api] API 응답 타입 정의
  interface Schedule {
    id: number;
    idolID: number;
    scheduleName: string;
    scheduleDate: string;
    originUrl: string;
    description: string;
    location: string | null;
    isTicketing: boolean;
  }

  return (
    <ScreenContainer>
      <BackgroundRectangle short={activeToggle === '하기'} />

      <ToggleContainer>
        <ToggleButton selected={activeToggle === '구하기'} onPress={() => setActiveToggle('구하기')}>
          <ToggleText selected={activeToggle === '구하기'}>티켓팅 대리 구하기</ToggleText>
        </ToggleButton>
        <ToggleButton selected={activeToggle === '하기'} onPress={() => setActiveToggle('하기')}>
          <ToggleText selected={activeToggle === '하기'}>티켓팅 대리하기</ToggleText>
        </ToggleButton>
      </ToggleContainer>

      {activeToggle === '구하기' ? (
        <View>
          <CalendarContainer>
            <Calendar
              monthFormat={'yyyy년 MM월'}
              onDayPress={(day) => {
                console.log('selected day', day);
              }}
              onMonthChange={handleMonthChange}
              theme={{
                todayTextColor: '#3e95ff',
                arrowColor: '#3e95ff',
              }}
              markedDates={markedDates}
              current={currentDate.toISOString().split('T')[0]}
            />
          </CalendarContainer>
          <ScrollableScheduleContainer>
            {/* [api] API로 받아온 스케줄 데이터 렌더링 */}
            {schedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                title={schedule.scheduleName}
                details={`${schedule.scheduleDate.split('T')[0]}, ${schedule.location || '장소 미정'}`}
                onPress={() => handleFindTicketPress(schedule)}
                isTicketScreen={true}
              />
            ))}
          </ScrollableScheduleContainer>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingTop: 60, paddingBottom: 100 }}>
          <ScheduleCard
            title="대리 구함 - 콘서트 C"
            details="2023-11-20, 대구 공연장"
            onPress={handleProvideTicketPress}
            isTicketScreen={true}
          />
          <ScheduleCard
            title="대리 구함 - 콘서트 D"
            details="2023-12-05, 제주 공연장"
            onPress={handleProvideTicketPress}
            isTicketScreen={true}
          />
           <ScheduleCard
             title="대리 구함 - 콘서트 D"
             details="2023-12-05, 제주 공연장"
             onPress={handleProvideTicketPress}
             isTicketScreen={true}
           />
          <ScheduleCard
            title="대리 구함 - 콘서트 D"
            details="2023-12-05, 제주 공연장"
            onPress={handleProvideTicketPress}
            isTicketScreen={true}
          />
          <ScheduleCard
            title="대리 구함 - 콘서트 D"
            details="2023-12-05, 제주 공연장"
            onPress={handleProvideTicketPress}
            isTicketScreen={true}
          />
        </ScrollView>
      )}
    </ScreenContainer>
  );
}
