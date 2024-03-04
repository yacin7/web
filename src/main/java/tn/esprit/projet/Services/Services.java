package tn.esprit.projet.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.projet.Entity.*;
import tn.esprit.projet.Repo.*;

import java.util.List;

@Service
@AllArgsConstructor
public class Services implements IService{
    BookingRepo bookingRepo;
    MatchRepo matchRepo;
    UserRepo userRepo;
    NewsRepo newsRepo;
    ProductRepo productRepo;
    @Override
    public List<Matches> retrieveAllMatches() {
        return matchRepo.findAll();
    }
    @Override
    public List<News> retrieveAllNews() {
        return newsRepo.findAll();
    }
    @Override
    public List<Products> retrieveAllProducts() {
        return productRepo.findAll();
    }
    @Override
    public List<User> retrieveAllUser() {
        return userRepo.findAll();
    }
    @Override
    public List<Booking> retrieveAllBooking() {
        return bookingRepo.findAll();
    }

    @Override
    public User addUser(User f) {
        return userRepo.save(f);
    }
    @Override
    public News addNews(News n) {
        return newsRepo.save(n);
    }
    @Override
    public Matches addMatch(Matches n) {
        return matchRepo.save(n);
    }
    @Override
    public Booking addBooking(Booking f) {
        return bookingRepo.save(f);
    }
    @Override
    public Products addProducts(Products f) {
        return productRepo.save(f);
    }

    @Override
    public User updateUser(User f) {
        return userRepo.save(f);
    }
    @Override
    public Matches updateMatch(Matches f) {
        return matchRepo.save(f);
    }
    @Override
    public Booking updateBooking(Booking f) {
        return bookingRepo.save(f);
    }
    @Override
    public News updateNews(News f) {
        return newsRepo.save(f);
    }
    @Override
    public Products updateProducts(Products f) {
        return productRepo.save(f);
    }


    @Override
    public User retrieveUser(long idUser) {
        return userRepo.findById(idUser).orElse(null);
    }
    @Override
    public Matches retrieveMatch(long idMatch) {
        return matchRepo.findById(idMatch).orElse(null);
    }
    @Override
    public Booking retrieveBooking(long idBooking) {
        return bookingRepo.findById(idBooking).orElse(null);
    }
    @Override
    public News retrieveNews(long idNews) {
        return newsRepo.findById(idNews).orElse(null);
    }
    @Override
    public Products retrieveProducts(long idProducts) {
        return productRepo.findById(idProducts).orElse(null);
    }
    @Override
    public void removeUser(long idUser) {
        userRepo.deleteById(idUser);
    }
    @Override
    public void removeBooking(long idBooking) {
        bookingRepo.deleteById(idBooking);
    }
    @Override
    public void removeProducts(long idProducts) {
        productRepo.deleteById(idProducts);
    }
    @Override
    public void removeMatch(long idMatch) {
        matchRepo.deleteById(idMatch);
    }
    @Override
    public void removeNews(long idNews) {
        newsRepo.deleteById(idNews);
    }

}
