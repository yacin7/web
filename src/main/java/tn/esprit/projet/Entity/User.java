package tn.esprit.projet.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Blob;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;
    private String username;
    private String password_hash;
    private LocalDate birthdate;
    private String email;
    private float height;
    private float weight;
    private String profilpicture;
    @OneToMany(mappedBy = "user")
    Set<Products> products;
    @OneToMany(mappedBy = "user")
    Set<News> news;
    @OneToMany(mappedBy = "user")
    Set<Booking> bookings;
    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Matches> matches = new HashSet<>();



}
