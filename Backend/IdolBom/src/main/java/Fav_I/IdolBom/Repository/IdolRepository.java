package Fav_I.IdolBom.Repository;

import Fav_I.IdolBom.Entity.Idol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IdolRepository extends JpaRepository<Idol, Integer> {
}
