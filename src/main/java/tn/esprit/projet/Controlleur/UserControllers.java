package tn.esprit.projet.Controlleur;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.projet.Entity.User;
import tn.esprit.projet.Services.Services;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
//@PreAuthorize("hasRole('Esprit') ")
public class UserControllers {


    @Autowired
    Services us ;

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user ){
        return us.addUser(user);
    }
    //@GetMapping("/showAlluser")
   // public List<User> retrieveAllUser(){
    //    return us.retrieveAllUsers();
   // }
}

