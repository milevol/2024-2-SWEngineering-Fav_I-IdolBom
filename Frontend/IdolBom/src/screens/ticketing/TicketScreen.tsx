import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, TouchableOpacity, ScrollView, Modal, Text } from 'react-native';
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

// 신청인 정보 출력 위한 모달 관련 스타일 컴포넌트
const ModalContainer = styled.View`
 flex: 1;
 justify-content: center;
 align-items: center;
 background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
 background-color: white;
 padding: 20px;
 border-radius: 15px;
 width: 80%;
 align-items: center;
 shadow-color: #000;
 shadow-offset: 0px 2px;
 shadow-opacity: 0.25;
 shadow-radius: 4px;
 elevation: 5;
`;

const ModalTitle = styled.Text`
 font-family: 'NanumSquareRoundEB';
 font-size: 20px;
 color: #333;
 margin-bottom: 20px;
`;

const ModalText = styled.Text`
 font-family: 'NanumSquareRoundR';
 font-size: 16px;
 color: #666;
 margin-bottom: 12px;
 text-align: center;
 width: 100%;
`;

const ModalImage = styled.Image`
 width: 120px;
 height: 120px;
 border-radius: 60px;
 margin: 15px 0;
 border-width: 3px;
 border-color: #3e95ff;
`;

const ModalButton = styled(TouchableOpacity)`
 background-color: #3e95ff;
 padding: 12px 40px;
 border-radius: 10px;
 margin-top: 20px;
`;

const ModalButtonText = styled.Text`
 color: white;
 font-family: 'NanumSquareRoundB';
 font-size: 16px;
`;

interface Schedule {
 id: number;
 idolID: number;
 scheduleName: string;
 scheduleDate: string;
 originUrl: string;
 description: string;
 location: string | null;
 isTicketing: boolean;
 scheduleType?: string;
}

interface ModalDataType {
 userName: string;
 profileImage: string | null;
 bio: string | null;
}

export default function TicketScreen() {
 const [activeToggle, setActiveToggle] = useState<'구하기' | '하기'>('구하기');
 const navigation = useNavigation();
 const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked: boolean; dotColor: string } }>({});
 const [schedules, setSchedules] = useState<Schedule[]>([]);
 const [currentDate, setCurrentDate] = useState(new Date());
 const [modalData, setModalData] = useState<ModalDataType | null>(null);
 const [isModalVisible, setModalVisible] = useState(false);
 const isMounted = useRef(false);

 // 티켓팅 대리 구하기 스케줄 데이터 조회
 const fetchSchedules = async (year: number, month: number) => {
   try {
     const response = await fetch(`${BACKEND_URL}/1/schedule/exists?year=${year}&month=${month}`);
     if (!response.ok) {
       throw new Error('Network response was not ok');
     }
     const data: Schedule[] = await response.json();

     const ticketingSchedules = data.filter(schedule => schedule.isTicketing);
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
   }
 };

 // 티켓팅 대리하기 스케줄 데이터 조회
 const fetchConcertSchedules = async () => {
   try {
     const url = `${BACKEND_URL}/ticketing/list`;
     const response = await fetch(url);

     if (!response.ok) {
       if (response.status === 500) {
         setSchedules([]);
         return;
       }
       throw new Error(`Network response was not ok. Status: ${response.status}`);
     }

     const data = await response.json();
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

     setSchedules(ticketingList);
   } catch (error) {
     console.error('Error fetching concert schedules:', error);
     setSchedules([]);
   }
 };

 const handleFindTicketPress = (schedule: Schedule) => {
   navigation.getParent()?.navigate('Home', {
     screen: 'FindTicketAgent',
     params: { schedule },
   });
 };

const handleProvideTicketPress = async (schedule: Schedule) => {
  try {
    const response = await fetch(`${BACKEND_URL}/ticketing/match/${schedule.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`서버 요청 실패: ${response.status}`);
    }

    const matchData = await response.json();
    console.log('매칭 응답 데이터:', matchData);

    if (matchData.code === "SU" && matchData.matched) {
      // 신청인 정보 설정
      const applicant = matchData.matched.applicantID;
      setModalData({
        userName: applicant.userName,
        profileImage: applicant.profileImage,
        bio: applicant.bio || '소개가 없습니다.',
      });

      // 모달 표시
      setModalVisible(true);

      // 스케줄 리스트에서 해당 항목 제거
      setSchedules((prevSchedules) =>
        prevSchedules.filter((item) => item.id !== schedule.id)
      );
    }
  } catch (error) {
    console.error('매칭 요청 중 오류 발생:', error);
  }
};

 const handleMonthChange = (date: { year: number; month: number }) => {
   setCurrentDate(new Date(date.year, date.month - 1));
 };

 useEffect(() => {
   if (activeToggle === '하기') {
     fetchConcertSchedules();
   }
 }, [activeToggle]);

 useEffect(() => {
   if (activeToggle === '구하기') {
     const year = currentDate.getFullYear();
     const month = currentDate.getMonth() + 1;
     fetchSchedules(year, month);
   }
 }, [activeToggle, currentDate]);

 useEffect(() => {
   isMounted.current = true;
   return () => {
     isMounted.current = false;
   };
 }, []);

 const renderModal = () => (
   <Modal
     animationType="none"
     transparent={true}
     visible={isModalVisible}
     onRequestClose={() => setModalVisible(false)}
   >
     <ModalContainer>
       <ModalContent>
         <ModalTitle>신청자 정보</ModalTitle>
         {modalData?.profileImage ? (
           <ModalImage
             source={{ uri: modalData.profileImage }}
           />
         ) : (
           <View style={{
             width: 120,
             height: 120,
             borderRadius: 60,
             backgroundColor: '#E8E8E8',
             margin: 15,
             borderWidth: 3,
             borderColor: '#3e95ff',
             justifyContent: 'center',
             alignItems: 'center'
           }}>
             <Text style={{
               fontFamily: 'NanumSquareRoundR',
               fontSize: 16,
               color: '#666'
             }}>
               프로필 없음
             </Text>
           </View>
         )}
         <ModalText>이름: {modalData?.userName || '이름 없음'}</ModalText>
         <ModalText>소개: {modalData?.bio || '소개가 없습니다.'}</ModalText>
         <ModalButton onPress={() => setModalVisible(false)}>
           <ModalButtonText>확인</ModalButtonText>
         </ModalButton>
       </ModalContent>
     </ModalContainer>
   </Modal>
 );

 return (
   <ScreenContainer>
     <BackgroundRectangle short={activeToggle === '하기'} />

     <ToggleContainer>
       <ToggleButton
         selected={activeToggle === '구하기'}
         onPress={() => setActiveToggle('구하기')}
       >
         <ToggleText selected={activeToggle === '구하기'}>
           티켓팅 대리 구하기
         </ToggleText>
       </ToggleButton>
       <ToggleButton
         selected={activeToggle === '하기'}
         onPress={() => setActiveToggle('하기')}
       >
         <ToggleText selected={activeToggle === '하기'}>
           티켓팅 대리하기
         </ToggleText>
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
               details={`${schedule.scheduleDate?.split('T')[0] || '날짜 없음'}, ${schedule.location || '장소 미정'}`}
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
     {renderModal()}
   </ScreenContainer>
 );
}