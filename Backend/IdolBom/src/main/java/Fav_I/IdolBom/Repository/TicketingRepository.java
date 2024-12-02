package Fav_I.IdolBom.Repository;

import Fav_I.IdolBom.Entity.Ticketing;
import Fav_I.IdolBom.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TicketingRepository extends JpaRepository<Ticketing, Integer> {
    @Query(value = "select * from Ticketing where ticketingStatus = 0", nativeQuery = true)
    List<Ticketing> findNotMatched();
    List<Ticketing> findAllByApplicantID(User user);

    @Modifying
    @Transactional
    @Query(value = "UPDATE Ticketing SET ticketingStatus = 3 WHERE applicantID = :applicantID", nativeQuery = true)
    void updateTicketingStatusByApplicantID(@Param(value = "applicantID") Long applicantID);
}
