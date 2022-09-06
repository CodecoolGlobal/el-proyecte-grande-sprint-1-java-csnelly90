package com.codecool.imdb.controller;

import com.codecool.imdb.service.AlbumService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/albums")
public class AlbumApiController {

    @Value("${api.key}")
    private String apiKey;

    private AlbumService albumService;

    @Autowired
    public AlbumApiController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    public JsonNode getTopTenAlbums(@RequestParam("genre") String genre) {
        String url = "http://api.napster.com/v2.2/albums/top?apikey=" + apiKey + "&catalog=ENG&limit=10&genre=" + genre;
        RestTemplate restTemplate = new RestTemplate();
        JsonNode result = restTemplate.getForObject(url, JsonNode.class);
        return result;
    }
}
