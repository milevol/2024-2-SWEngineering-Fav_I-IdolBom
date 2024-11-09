package Fav_I.IdolBom.Repository;

import Fav_I.IdolBom.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
