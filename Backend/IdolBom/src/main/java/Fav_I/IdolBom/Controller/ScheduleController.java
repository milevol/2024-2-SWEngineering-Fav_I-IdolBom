package Fav_I.IdolBom.Controller;

//import Fav_I.IdolBom.Entity.Schedule;
import Fav_I.IdolBom.Service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    // 특정 아이돌의 스케줄이 존재하는 날짜 리스트 반환 (year-month)
    @GetMapping("/{idol_id}/schedule/exists")
    public List<Instant> getDatesWithSchedules(
            @PathVariable("idol_id") Integer idolID,
            @RequestParam int year,
            @RequestParam int month) {

        return  scheduleService.getDatesWithSchedules(year, month, idolID);
        // System.out.println("Queried dates: " + result); // 디버깅용 로그
        // return result;
    }





    // 디버깅용 전체 스케줄 조회 엔드포인트 추가
//    @GetMapping("/{idol_id}/schedules")
//    public List<Schedule> getAllSchedules(@PathVariable("idol_id") Integer idolID) {
//        return scheduleService.getAllSchedulesByIdol(idolID);
//    }
}
