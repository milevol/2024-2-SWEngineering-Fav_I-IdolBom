package Fav_I.IdolBom.Repository;

import Fav_I.IdolBom.Entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    @Query(value =
            "SELECT DISTINCT scheduleDate " +
                    "FROM Schedule " +
                    "WHERE idolID = :idolID " +
                    "AND scheduleDate BETWEEN :startDate AND :endDate",
            nativeQuery = true)
    List<Timestamp> findDatesWithSchedules(
            @Param("idolID") Integer idolID,
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate);

    @Query(value =
            "SELECT * FROM Schedule WHERE idolID = :idolID",
            nativeQuery = true)
    List<Schedule> getAllSchedulesByIdol(@Param("idolID") Integer idolID);
}
