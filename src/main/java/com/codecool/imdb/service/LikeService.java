package com.codecool.imdb.service;

import com.codecool.imdb.data.repositories.LikeRepository;
import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.domain.entities.Likes;
import com.codecool.imdb.domain.model.Item;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserService userService;
    private final ArtistService artistService;
    private final AlbumService albumService;
    private final SongService songService;

    @Autowired
    public LikeService (LikeRepository likeRepository, UserService userService, ArtistService artistService,
                        AlbumService albumService, SongService songService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.artistService = artistService;
        this.albumService = albumService;
        this.songService = songService;
    }

    private AppUser getAppUserByName(String name) {
        Optional<AppUser> user = userService.getUserByUsername(name);
        AppUser appUser;
        if (user.isEmpty()) {
            log.error("No user found in database by the following username: {}", name);
            throw new UsernameNotFoundException("User not found in database.");
        } else {
            log.info("Loading user from database. Username: {}", name);
            appUser = user.get();
        }
        return appUser;
    }

    public Collection<Item> getLikedItemIdsByUserName(String userName) throws JsonProcessingException {
        AppUser user = getAppUserByName(userName);
        Collection<Likes> items = likeRepository.findAllItemIdsByUser(user);
        Collection<Item> resultItems = new ArrayList<>();
        for (Likes item : items) {
            switch (item.getItemId().substring(0, 3)) {
                case "art" -> resultItems.add(artistService.getArtist(item.getItemId()));
                case "alb" -> resultItems.add(albumService.getAlbumById(item.getItemId()));
                case "tra" -> resultItems.add(songService.getSong(item.getItemId()));
            }
        }
        return resultItems;
    }

    public int getLikesCountByItemId(String itemId) {
        int count = 0;
        List<Likes> likes = likeRepository.findAll();
        for (Likes like : likes) {
            if (Objects.equals(like.getItemId(), itemId)) {
                count += 1;
            }
        }
        System.out.println(count);
        return count;
    }

    public void saveLike(String userName, String likedItem) {
        AppUser user = getAppUserByName(userName);
        Likes newLike = new Likes(user, likedItem);
        List<Likes> likes = likeRepository.findAll();
        for (Likes like : likes) {
            if (Objects.equals(like.getItemId(), likedItem) && Objects.equals(like.getUser().getUsername(), userName)) {
                likeRepository.delete(like);
            }
        }
        likeRepository.save(newLike);
    }

    public void deleteLike(String userName, String likedItem) {
        List<Likes> likes = likeRepository.findAll();
        for (Likes like : likes) {
            if (Objects.equals(like.getItemId(), likedItem) && Objects.equals(like.getUser().getUsername(), userName)) {
                likeRepository.delete(like);
            }
        }
    }

    public boolean isLiked(String userName, String itemId) {
        List<Likes> likes = likeRepository.findAll();
        for (Likes like : likes) {
            if (Objects.equals(like.getItemId(), itemId) && Objects.equals(like.getUser().getUsername(), userName)) {
                return true;
            }
        }
        return false;
    }
}
