package com.codecool.imdb.controller;

import com.codecool.imdb.service.SongService;
import com.codecool.imdb.service.dtos.NapsterSong;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
@RestController
@RequestMapping("/api/songs")
public class SongApiController {

    private SongService songService;

    @Autowired
    public SongApiController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/trending")
    public Collection<NapsterSong> getTopTenSongs() throws JsonProcessingException {
        int limit = 10;
        int offset = 0;
        return songService.getTopSongsWithImage(limit, offset);
    }

    @GetMapping(value = "/top-trending")
    public Collection<NapsterSong> getTopSongs(@RequestParam("offset") int offset) throws JsonProcessingException {
        var limit = 10;
        return songService.getTopSongsWithImage(limit, offset);
    }

    @GetMapping(value = "{id}")
    public  Collection<NapsterSong> getSongsByAlbumId(@PathVariable String id) throws JsonProcessingException {
        return songService.getSongsByAlbumId(id);
    }

    @GetMapping(value = "song/{id}")
    public NapsterSong getSongById(@PathVariable String id) throws JsonProcessingException {
        return songService.getSongWithImageById(id);
    }

}