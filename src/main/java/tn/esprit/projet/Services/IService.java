package tn.esprit.projet.Services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.projet.Entity.*;

import java.time.LocalDate;
import java.util.List;

public interface IService {

    List<News> retrieveAllNews();

    List<Matches> retrieveAllMatches();

    List<Products> retrieveAllProducts();

    List<User> retrieveAllUser();

    List<Booking> retrieveAllBooking();

    News addNews(News n);

    User addUser(User f);


    Matches addMatch(Matches n);

    Booking addBooking(Booking f);

    Products addProducts(Products f);

    User updateUser(User f);

    Matches updateMatch(Matches f);


    Booking updateBooking(Booking f);

    News updateNews(News f);


    Products updateProducts(Products f);

    User retrieveUser(long idUser);

    Matches retrieveMatch(long idMatch);

    Booking retrieveBooking(long idBooking);

    News retrieveNews(long idNews);

    Products retrieveProducts(long idProducts);

    void removeBooking(long idBooking);

    void removeProducts(long idProducts);

    void removeMatch(long idMatch);

    void removeUser(long idUser);

    void removeNews(long idNews);
}
