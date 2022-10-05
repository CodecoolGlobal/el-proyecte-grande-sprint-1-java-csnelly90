package com.codecool.imdb.controller;

import com.codecool.imdb.domain.model.Item;
import com.codecool.imdb.payload.request.LikeRequest;
import com.codecool.imdb.service.LikeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/likes")
public class LikeController {
    private LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/like")
    public void likeItem(@RequestBody LikeRequest likeRequest) {
        likeService.saveLike(likeRequest.getUserName(), likeRequest.getLikedItem());
    }

    @DeleteMapping("/dislike")
    public void disLikeItem(@RequestBody LikeRequest likeRequest) {
        likeService.deleteLike(likeRequest.getUserName(), likeRequest.getLikedItem());
    }

    @GetMapping("/get-all")
    public Collection<Item> getLikedItemsByUserName(@RequestParam String userName) throws JsonProcessingException {
        return likeService.getLikedItemIdsByUserName(userName);
    }

}
