package com.codecool.imdb.controller;

import java.util.Collection;

import com.codecool.imdb.domain.model.Artist;
import com.codecool.imdb.service.ArtistService;

import com.codecool.imdb.service.dtos.response.NapsterArtistCardDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/artists")
public class ArtistApiController {

    @Value("${api.key}")
    private String apiKey;

    private ArtistService artistService;

    @Autowired
    public ArtistApiController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping("/trending")
    public Collection<NapsterArtistCardDto> getTopTenArtist() {
        var limit = 10;
        var offset = 0;
        return artistService.getTopArtists(limit, offset);
    }

    @GetMapping(value = "/top-trending")
    public Collection<NapsterArtistCardDto> getTopArtists(@RequestParam("offset") int offset) {
        var limit = 10;
        return artistService.getTopArtists(limit, offset);
    }

    @GetMapping(value = "/{id}")
    public Artist getArtistById(@PathVariable String id){
        return artistService.getArtist(id);
    }

}
