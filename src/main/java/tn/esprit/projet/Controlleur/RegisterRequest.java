package tn.esprit.projet.Controlleur;


import lombok.*;
import tn.esprit.projet.Entity.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private Role role;
}
