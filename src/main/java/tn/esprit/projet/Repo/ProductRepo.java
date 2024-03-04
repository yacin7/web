package tn.esprit.projet.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.projet.Entity.Products;
@Repository
public interface ProductRepo extends JpaRepository<Products,Long> {
}
