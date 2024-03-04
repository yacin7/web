package tn.esprit.projet.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.projet.Entity.Matches;

@Repository
public interface MatchRepo extends JpaRepository<Matches,Long> {
}
