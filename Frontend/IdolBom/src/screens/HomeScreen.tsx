// HomeScreen.tsx
// 홈화면

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import ThreeDaysSchedule from '../components/schedule/ThreeDaysSchedule';
import CalendarSchedule from '../components/schedule/CalendarSchedule';
import { kakaoUserIDState } from '../atoms/userAtom';
const HomeScreenContainer = styled.View`
  flex: 1;
  background-color: #F3F8FF;
  align-items: center;
  padding-top: 20px;
`;

const WhiteRectangle = styled.View`
  position: absolute;
  width: 414px;
  height: ${({ calendarExpanded }) => (calendarExpanded ? '480px' : '720px')};
  top: -63px;
  background-color: #FFFFFF;
  border-radius: 50px;
  z-index: 0;
`;

export default function HomeScreen() {
  const [showAllSchedules, setShowAllSchedules] = useState(false);
  const [calendarExpanded, setCalendarExpanded] = useState(false);
  const navigation = useNavigation();
  const kakaoUserID = useRecoilValue(kakaoUserIDState);


  const toggleShowAllSchedules = () => {
    setShowAllSchedules(!showAllSchedules);
  };

  const handleDaySelect = () => {
    setCalendarExpanded(true);
  };

  const handleCollapse = () => {
    setCalendarExpanded(false);
  };

  return (
    <HomeScreenContainer>
      <WhiteRectangle calendarExpanded={calendarExpanded} />
      {!calendarExpanded && (
        <ThreeDaysSchedule
          showAllSchedules={showAllSchedules}
          toggleShowAllSchedules={toggleShowAllSchedules}
          userID={kakaoUserID}
        />
      )}
      {!showAllSchedules && (
        <CalendarSchedule
          navigation={navigation}
          onDaySelect={handleDaySelect}
          onCollapse={handleCollapse}
          calendarExpanded={calendarExpanded}
          userID={kakaoUserID}
        />
      )}
    </HomeScreenContainer>
  );
}
