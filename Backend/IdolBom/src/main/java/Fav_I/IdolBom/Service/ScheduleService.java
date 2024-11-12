package Fav_I.IdolBom.Service;

import Fav_I.IdolBom.Entity.Schedule;
import Fav_I.IdolBom.Repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public List<Instant> getDatesWithSchedules(int year, int month, Integer idolID) {
        // 유효하지 않은 idolID 예외 발생
        if(idolID == null || idolID < 0) {
            throw new IllegalArgumentException("유효하지 않은 idolID입니다. ");
        }

        // 해당 연도와 월의 시작과 끝을 Instant로 계산
        LocalDateTime startOfMonth = LocalDateTime.of(year, month, 1, 0, 0);
        LocalDateTime endOfMonth = startOfMonth.withDayOfMonth(startOfMonth.toLocalDate().lengthOfMonth())
                .withHour(23).withMinute(59).withSecond(59);

        Instant startDate = startOfMonth.toInstant(ZoneOffset.UTC);
        Instant endDate = endOfMonth.toInstant(ZoneOffset.UTC);

        // 한국 시간대로 맞춤 - 데이터베이스에서 Timestamp 리스트를 받아서 Instant 리스트로 변환 후 9시간 추가 (한국 시간대)
        List<Timestamp> dates = scheduleRepository.findDatesWithSchedules(idolID, startDate, endDate);
        return dates.stream()
                .map(timestamp -> timestamp.toInstant().plusSeconds(9 * 3600))
                .collect(Collectors.toList());

    }

//    public List<Schedule> getAllSchedulesByIdol(Integer idolID) {
//        return scheduleRepository.getAllSchedulesByIdol(idolID);
//    }
}
