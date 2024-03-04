package tn.esprit.projet.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.projet.Entity.News;
@Repository
public interface NewsRepo extends JpaRepository<News,Long> {
}
