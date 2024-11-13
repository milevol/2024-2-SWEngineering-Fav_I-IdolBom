package Fav_I.IdolBom.Repository;

import Fav_I.IdolBom.Entity.Ticketing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketingRepository extends JpaRepository<Ticketing, Integer> {
}
