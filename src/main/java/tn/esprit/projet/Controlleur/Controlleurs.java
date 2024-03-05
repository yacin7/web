package tn.esprit.projet.Controlleur;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Part;
import lombok.AllArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import tn.esprit.projet.Entity.*;
import tn.esprit.projet.Services.IService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/web")
@CrossOrigin
public class Controlleurs {
    private final String imagesDirPath = "C:/4SLEM/pi/webpi-spring/webpi-spring/images"; // Relative path to where you want to store the images

    IService iService;

    @GetMapping("/affichertoutMatch")
    public List<Matches> retrieveAllMatches() {
        return iService.retrieveAllMatches();
    }
    @GetMapping(value = "/affichertoutNews", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<News> retrieveAllNews() {
        return iService.retrieveAllNews();
    }
    @GetMapping("/affichertoutProducts")
    public List<Products> retrieveAllProducts(){
        return iService.retrieveAllProducts();
    }
    @GetMapping("/affichertoutUser")
    public List<User> retrieveAllUser(){
        return iService.retrieveAllUser();
    }
    @GetMapping("/affichertoutBooking")
    public List<Booking> retrieveAllBooking(){
        return iService.retrieveAllBooking();
    }
    @PostMapping("/ajouterUser")
    public User addUser(@RequestBody User f){
        return iService.addUser(f);
    }
    @PostMapping(value = "/ajouterNews", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public News addNews(@RequestParam("title") String title,
                        @RequestParam("description") String description,
                        @RequestParam("datenews") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate datenews,
                        @RequestParam("file") MultipartFile imageFile) {
        try {
            System.out.println("saving image");
            // Save the image and get the path
            String imagePath = saveImage(imageFile);

            // Create a new News object and set its properties
            News news = new News();
            news.setTitle(title);
            news.setDescription(description);
            news.setDatenews(datenews);
            news.setImagenews(imagePath); // Set the image path
            System.out.println("saving news");
            // Save the news object using your service
            return iService.addNews(news);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving image", e);
        }
    }

    // Method to save the image and return the relative path
    private String saveImage(MultipartFile imageFile) throws IOException {
        if (!imageFile.isEmpty()) {
            String originalFilename = imageFile.getOriginalFilename();
            File destFile = new File(imagesDirPath, originalFilename);
            try {
                imageFile.transferTo(destFile);
                return destFile.getAbsolutePath(); // Return the path where the image was saved
            } catch (IOException e) {
                // Log the exception or print the stack trace
                System.err.println("Exception occurred while saving the image: " + e.getMessage());
                e.printStackTrace(); // Print the full stack trace for debugging purposes
                return null; // You might want to handle this differently depending on your application's needs
            }
        } else {
            System.out.println("Received file is empty.");
            return null; // or handle this case as you see fit
        }
    }

    @PostMapping(value = "/ajouterMatch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Matches addMatches(@RequestBody Matches n){
        return iService.addMatch(n);
    }


    @PostMapping("/ajouterBooking")
    public Booking addBooking(@RequestBody Booking f){
        return iService.addBooking(f);
    }
    @PostMapping("/ajouterProducts")
    public Products addProducts(@RequestBody Products f){
        return iService.addProducts(f);
    }
    @PutMapping("/modifierUser/{id}")
    public User updateUser(@PathVariable("id") Long id,@RequestBody User f){
        f.setIdUser(id);
        return iService.updateUser(f);
    }
    @PutMapping("/modifierMatch/{id}")
    public Matches updateMatch(@PathVariable("id") Long id,@RequestBody Matches f){
        f.setId(id);
        return iService.updateMatch(f);
    }
    @PutMapping("/modifierBooking/{id}")
    public Booking updateBooking(@PathVariable("id") Long id, @RequestBody Booking f) {
        // Votre logique de mise à jour de la réservation ici
        f.setIdBooking(id); // Assurez-vous de définir l'ID de réservation dans l'objet Booking
        return iService.updateBooking(f);
    }
    @PutMapping("/modifierNews/{id}")
    public News updateNews(@PathVariable("id") Long id,@RequestBody News f){
        f.setIdNews(id);
        return iService.updateNews(f);
    }
    @PutMapping("/modifierProducts/{id}")
    public Products updateProducts(@PathVariable("id") Long id,@RequestBody Products f){
        f.setIdProducts(id);
        return iService.updateProducts(f);
    }
    @GetMapping("/afficherUser/{idUser}")
    public User retrieveUser(@PathVariable("idUser") long idUser){
        return iService.retrieveUser(idUser);
    }
    @GetMapping("/afficherMatch/{idMatch}")
    public Matches retrieveMatch(@PathVariable("idMatch") long idMatch){
        return iService.retrieveMatch(idMatch);
    }

    @GetMapping("/afficherNews/{idNews}")
    public News retrieveNews(@PathVariable("idNews") long idNews){
        return iService.retrieveNews(idNews);
    }
    @GetMapping("/afficherBooking/{idBooking}")
    public Booking retrieveBooking(@PathVariable("idBooking") long idBooking){
        return iService.retrieveBooking(idBooking);
    }
    @GetMapping("/afficherProducts/{idProducts}")
    public Products retrieveProducts(@PathVariable("idProducts") long idProducts){
        return iService.retrieveProducts(idProducts);
    }
    @DeleteMapping("/supprimerUser/{idUser}")
    public void removeUser(@PathVariable("idUser") long idUser){
        iService.removeUser(idUser);
    }
    @DeleteMapping("/supprimerNews/{idNews}")
    public void removeNews(@PathVariable("idNews") long idNews){
        iService.removeNews(idNews);
    }
    @DeleteMapping("/supprimerMatch/{idMatch}")
    public void removeMatch(@PathVariable("idMatch") long idMatch){
        iService.removeMatch(idMatch);
    }
    @DeleteMapping("/supprimerProducts/{idProducts}")
    public void removeProducts(@PathVariable("idProducts") long idProducts){
        iService.removeProducts(idProducts);
    }
    @DeleteMapping("/supprimerBooking/{idBooking}")
    public void removeBooking(@PathVariable("idBooking") long idBooking){
        iService.removeBooking(idBooking);
    }
}
