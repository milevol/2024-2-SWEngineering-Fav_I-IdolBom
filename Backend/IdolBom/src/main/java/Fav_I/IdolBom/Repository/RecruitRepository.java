package Fav_I.IdolBom.Repository;
import Fav_I.IdolBom.Entity.Recruitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitRepository extends JpaRepository<Recruitment, Integer> {

}
