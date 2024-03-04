package tn.esprit.projet.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.projet.Entity.Booking;
@Repository
public interface BookingRepo extends JpaRepository<Booking,Long> {
}
