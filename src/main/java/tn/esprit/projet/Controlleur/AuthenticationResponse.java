package tn.esprit.projet.Controlleur;


import lombok.*;
import tn.esprit.projet.Entity.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthenticationResponse {
    String token;

    private long idUser;
    private String username;
    private String email;
    private String password;
    private Role role;







}




