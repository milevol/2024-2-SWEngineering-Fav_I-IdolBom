// HomeScreen.tsx
import React, { useState } from 'react';
import styled from 'styled-components/native';
import ThreeDaysSchedule from '../../components/schedule/ThreeDaysSchedule';
import CalendarSchedule from '../../components/schedule/CalendarSchedule';

const HomeScreenContainer = styled.View`
  flex: 1;
  background-color: #F3F8FF;
  align-items: center;
  padding-top: 20px;
`;

const WhiteRectangle = styled.View`
  position: absolute;
  width: 414px;
  height: ${({ calendarExpanded }) => (calendarExpanded ? '480px' : '720px')}; /* 펼쳐졌을 때 높이 줄이기 */
  top: -63px;
  background-color: #FFFFFF;
  border-radius: 50px;
  z-index: 0;
`;

export default function HomeScreen() {
  const [showAllSchedules, setShowAllSchedules] = useState(false);
  const [calendarExpanded, setCalendarExpanded] = useState(false);

  const toggleShowAllSchedules = () => {
    setShowAllSchedules(!showAllSchedules);
  };

  const handleDaySelect = () => {
    setCalendarExpanded(true); // 특정 날짜 선택 시 CalendarSchedule을 확장
  };

  const handleCollapse = () => {
    setCalendarExpanded(false); // CalendarSchedule의 화살표 버튼 클릭 시 CalendarSchedule 접기
  };

  return (
    <HomeScreenContainer>
      <WhiteRectangle calendarExpanded={calendarExpanded} />
      {!calendarExpanded && (
        <ThreeDaysSchedule
          showAllSchedules={showAllSchedules}
          toggleShowAllSchedules={toggleShowAllSchedules}
        />
      )}
      {!showAllSchedules && (
        <CalendarSchedule
          onDaySelect={handleDaySelect}
          onCollapse={handleCollapse}
          calendarExpanded={calendarExpanded}
        />
      )}
    </HomeScreenContainer>
  );
}
