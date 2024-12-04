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
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked: boolean; dotColor: string } }>({});
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 모달 상태 추가
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);

  const handleFindTicketPress = (schedule: Schedule) => {
    // `schedule` 객체를 그대로 전달
    navigation.getParent()?.navigate('Home', {
      screen: 'FindTicketAgent',
      params: { schedule }, // schedule 전체 객체 전달
    });
  };

const handleProvideTicketPress = async (schedule: Schedule) => {
  try {
    // 매칭 API 호출
    const response = await fetch(`${BACKEND_URL}/ticketing/match/${schedule.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`서버 요청 실패: ${response.status}`);
    }

    // 성공적으로 매칭 완료
    Alert.alert('성공', '매칭이 완료되었습니다.');

    // 매칭 완료된 스케줄을 리스트에서 제거
    setSchedules((prevSchedules) =>
      prevSchedules.filter((item) => item.id !== schedule.id)
    );
  } catch (error) {
    console.error('매칭 요청 중 오류 발생:', error);
    Alert.alert('오류', '티켓팅 매칭 요청에 실패했습니다.');
  }
};



  // [api] "티켓팅 대리 구하기" 스케줄 데이터를 가져오는 함수
  const fetchSchedules = async (year: number, month: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/1/schedule/exists?year=${year}&month=${month}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Schedule[] = await response.json();

      // Filter schedules where isTicketing is true
      const ticketingSchedules = data.filter(schedule => schedule.isTicketing);

      // Create marked dates object
      const newMarkedDates: { [key: string]: { marked: boolean; dotColor: string } } = {};
      ticketingSchedules.forEach(schedule => {
        const dateStr = schedule.scheduleDate.split('T')[0];
        newMarkedDates[dateStr] = {
          marked: true,
          dotColor: '#3e95ff',
        };
      });

      setMarkedDates(newMarkedDates);
      setSchedules(ticketingSchedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      Alert.alert('Error', '일정을 불러오는데 실패했습니다.');
    }
  };

  // [api] "티켓팅 대리하기" 스케줄 데이터를 가져오는 함수
  const fetchConcertSchedules = async () => {
    try {
      // API 호출
      const url = `${BACKEND_URL}/ticketing/list`;
      console.log('Request URL:', url);

      const response = await fetch(url);
      console.log('Response status:', response.status);

      if (!response.ok) {
        if (response.status === 500) {
          // 500 에러인 경우 처리
          setSchedules([]); // 스케줄 비우기
          return;
        }
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const data = await response.json();

      // "ticketing_list"에서 필요한 데이터를 추출
      const ticketingList = data.ticketing_list.map((item: any) => ({
        id: item.id,
        scheduleName: item.scheduleID?.scheduleName || '스케줄 이름 없음',
        scheduleDate: item.scheduleID?.scheduleDate || '날짜 정보 없음',
        location: item.scheduleID?.location || '장소 미정',
        applicantID: item.applicantID || {},
        ticketNum: item.ticketNum || 0,
        seatingType: item.seatingType || '미정',
        requestMessage: item.requestMessage || '없음',
      }));

      console.log('Filtered schedules:', ticketingList);

      setSchedules(ticketingList); // 가져온 스케줄 리스트 저장
    } catch (error) {
//       console.error('Error fetching concert schedules:', error);
//       setSchedules([]); // 스케줄 비우기
//       Alert.alert('Error', '콘서트 스케줄 리스트를 가져오는데 실패했습니다.');
    }
  };



useEffect(() => {
  if (activeToggle === '하기') {
    console.log('Fetching concert schedules...');
    fetchConcertSchedules();
  }
}, [activeToggle]);



// "하기" 탭 활성화 시 호출
useEffect(() => {
  if (activeToggle === '하기') {
    fetchConcertSchedules();
  }
}, [activeToggle]);


  // "하기" 탭 활성화 시 호출
  useEffect(() => {
    if (activeToggle === '하기') {
      fetchConcertSchedules();
    }
  }, [activeToggle]);


  // 월 변경 핸들러 추가
  const handleMonthChange = (date: { year: number; month: number }) => {
    setCurrentDate(new Date(date.year, date.month - 1)); // month는 0-based
  };

  // "구하기" 탭에서 데이터 로드
  useEffect(() => {
    if (activeToggle === '구하기') {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      fetchSchedules(year, month);
    } else if (activeToggle === '하기') {
      fetchConcertSchedules();
    }
  }, [activeToggle, currentDate]);

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
    scheduleType?: string; // "콘서트", "뮤지컬", 등등
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
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <ScheduleCard
                  key={schedule.id}
                  title={schedule.scheduleName}
                  details={`${schedule.scheduleDate?.split('T')[0] || '날짜 없음'}, ${schedule.location || '장소 미정'}`}
                  onPress={() => handleFindTicketPress(schedule)}
                  isTicketScreen={true}
                />
              ))
            ) : (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <ToggleText selected={false}>대리할 수 있는 스케줄이 없어요.</ToggleText>
              </View>
            )}
          </ScrollableScheduleContainer>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingTop: 60, paddingBottom: 100 }}>
          {schedules.length > 0 ? (
            schedules.map((schedule) => (
              <ScheduleCard
                key={schedule.id}
                title={schedule.scheduleName}
                details={`${
                  schedule.scheduleDate?.split('T')[0] || '날짜 없음'
                }, ${schedule.location || '장소 미정'}`}
                onPress={() => handleProvideTicketPress(schedule)}
                isTicketScreen={true}
              />
            ))
          ) : (
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <ToggleText selected={false}>대리할 수 있는 티켓팅이 없어요.</ToggleText>
            </View>
          )}
        </ScrollView>
      )}
    </ScreenContainer>
  );



  }

