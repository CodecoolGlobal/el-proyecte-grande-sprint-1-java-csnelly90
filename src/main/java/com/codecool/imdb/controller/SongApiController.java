package com.codecool.imdb.controller;

import com.codecool.imdb.service.SongService;
import com.codecool.imdb.service.dtos.NapsterSong;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
@RestController
@RequestMapping("/api/songs")
public class SongApiController {

    @Value("${api.key}")
    private String apiKey;
    private SongService songService;

    @Autowired
    public SongApiController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/trending")
    public Collection<NapsterSong> getTopSongs() throws JsonProcessingException {
        int limit = 10;
        return songService.getTopSongs(limit);
    }

}