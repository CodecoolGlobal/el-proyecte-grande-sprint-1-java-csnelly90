package com.codecool.imdb.controller;

import com.codecool.imdb.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}