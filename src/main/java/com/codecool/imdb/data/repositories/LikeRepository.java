package com.codecool.imdb.data.repositories;

import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.domain.entities.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface LikeRepository extends JpaRepository<Likes, Long> {

    @Query("select l from Likes l where l.user = :user")
    Collection<Likes> findAllItemIdsByUser(@Param("user") AppUser user);

    Likes findByItemId(String itemId);

    int getCountByItemId(String ItemId);
}
