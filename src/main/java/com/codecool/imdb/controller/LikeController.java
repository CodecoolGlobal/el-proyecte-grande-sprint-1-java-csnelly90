package com.codecool.imdb.controller;

import com.codecool.imdb.domain.model.Item;
import com.codecool.imdb.payload.request.LikeRequest;
import com.codecool.imdb.payload.response.MessageResponse;
import com.codecool.imdb.service.LikeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/likes")
public class LikeController {
    private LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @PostMapping("/like")
    public ResponseEntity<?> likeItem(@Valid @RequestBody LikeRequest likeRequest) {
        likeService.saveLike(likeRequest.getUserName(), likeRequest.getLikedItem());
        return ResponseEntity.ok(new MessageResponse("Like addition was successful"));
    }

    @PostMapping("/dislike")
    public ResponseEntity<?> disLikeItem(@RequestBody LikeRequest likeRequest) {
        likeService.deleteLike(likeRequest.getUserName(), likeRequest.getLikedItem());
        return ResponseEntity.ok(new MessageResponse("Like deletion was successful"));
    }

    @GetMapping("/get-all")
    public Collection<String> getLikedItemsByUserName(@RequestParam String userName) {
        return likeService.getLikedItemIdsByUserName(userName);
    }

    @GetMapping("/likes")
    public int getLikeNumbersByItemId(@RequestParam String itemId) {
        return likeService.getLikesCountByItemId(itemId);
    }

    @GetMapping("/isliked")
    public boolean getLikeStatus(@RequestParam String itemId, @RequestParam String userName) {
        return likeService.isLiked(userName, itemId);
    }
}
