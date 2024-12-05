// components/TicketingCard.tsx
import React from 'react';
import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CardContainer = styled.View`
  width: 358px;
  height: 145px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  padding: 15px;
  margin-bottom: 20px;
`;

const RecruitmentTitle = styled.Text`
  font-family: 'Inter';
  font-size: 17px;
  font-weight: 600;
  color: #000000;
`;

const RecruitmentDateRange = styled.Text`
  font-family: 'Inter';
  font-size: 12px;
  color: #5b5b5b;
  margin-top: 10px;
`;

const MeetingDateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

const CalendarIcon = styled(MaterialCommunityIcons).attrs({
  name: 'calendar-range',
  size: 24,
  color: '#b2b2b2',
})``;

const MeetingDateText = styled.Text`
  font-family: 'Inter';
  font-size: 14px;
  color: #000000;
  margin-left: 8px;
`;

const StatusContainer = styled.View`
  position: absolute;
  width: 109px;
  height: 28px;
  right: 20px;
  bottom: 20px;
  background: rgba(255, 255, 255, 0.99);
  border: 1px solid #c1c0c0;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const StatusText = styled.Text<{ status: string }>`
  font-family: 'Noto Sans KR';
  font-size: 14px;
  color: ${(props) =>
    props.status === '신청중' ? '#3e95ff' : 'rgba(255, 71, 62, 0.99)'};
`;

const AttendanceContainer = styled.View`
  position: absolute;
  right: 20px;
  top: 20px;
  align-items: center;
`;

const AttendanceIcon = styled(MaterialCommunityIcons).attrs({
  name: 'account-multiple',
  size: 24,
  color: '#898989',
})``;

const AttendanceCount = styled.Text`
  font-family: 'Inter';
  font-size: 14px;
  color: #5b5b5b;
  margin-top: 5px;
`;

interface TicketingCardProps {
  title: string;
  dateRange: string;
  meetingDate: string;
  status: string;
  attendance: string;
}

const TicketingCard: React.FC<TicketingCardProps> = ({
  title,
  dateRange,
  meetingDate,
  status,
  attendance,
}) => {
  return (
    <CardContainer>
      <RecruitmentTitle>{title}</RecruitmentTitle>
      <RecruitmentDateRange>{dateRange}</RecruitmentDateRange>
      <MeetingDateContainer>
        <CalendarIcon />
        <MeetingDateText>{meetingDate}</MeetingDateText>
      </MeetingDateContainer>
      <StatusContainer>
        <StatusText status={status}>{status}</StatusText>
      </StatusContainer>
      <AttendanceContainer>
        <AttendanceIcon />
        <AttendanceCount>{attendance}</AttendanceCount>
      </AttendanceContainer>
    </CardContainer>
  );
};

export default TicketingCard;
