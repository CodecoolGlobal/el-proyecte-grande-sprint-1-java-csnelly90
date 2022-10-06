package com.codecool.imdb.data.repositories;

import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.domain.entities.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByToken(String token);


    @Modifying
    int deleteByAppUser(AppUser appUser);
}
