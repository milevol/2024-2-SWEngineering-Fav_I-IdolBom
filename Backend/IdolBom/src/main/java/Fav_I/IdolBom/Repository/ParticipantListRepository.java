package Fav_I.IdolBom.Repository;

import Fav_I.IdolBom.Entity.ParticipantList;
import Fav_I.IdolBom.Entity.ParticipantListId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantListRepository extends JpaRepository<ParticipantList, ParticipantListId> {
}
