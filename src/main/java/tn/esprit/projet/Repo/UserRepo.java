package tn.esprit.projet.Repo;

import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.projet.Entity.User;
@Repository
public interface UserRepo extends JpaRepository<User,Long> {
}
