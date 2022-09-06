package com.codecool.imdb.controller;

import java.util.Collection;

import com.codecool.imdb.domain.model.Artist;
import com.codecool.imdb.service.ArtistService;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class ApiController {

    // TODO: Remove when everything is factored into a service
    @Value("${api.key}")
    private String apiKey;

    private ArtistService artistService;

    @Autowired
    public ApiController(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping(value = "/artists")
    public Collection<Artist> getTopTenArtist() {
        var limit = 10;
        return artistService.getTopArtists(limit);
    }

    @GetMapping(value = "/genres")
    public JsonNode getAllGenres() {
        String url = "http://api.napster.com/v2.2/genres?apikey=" + apiKey + "&catalog=DE";
        RestTemplate restTemplate = new RestTemplate();
        JsonNode result = restTemplate.getForObject(url, JsonNode.class);

        return result;
    }

    @GetMapping(value = "/artist/{id}")
    public Artist getArtistById(@PathVariable String id){
        return artistService.getArtist(id);
    }

}
