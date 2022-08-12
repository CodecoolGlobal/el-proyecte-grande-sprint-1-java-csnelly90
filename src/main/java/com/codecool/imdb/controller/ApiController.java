package com.codecool.imdb.controller;

import java.util.Collection;

import com.codecool.imdb.model.Artist;
import com.codecool.imdb.service.ApiService;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api")
public class ApiController {

    // TODO: Remove when everything is factored into a service
    @Value("${api.key}")
    private String apiKey;

    private ApiService apiService;

    @Autowired
    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping(value = "/artists")
    public Collection<Artist> getTopTenArtist() {
        var limit = 10;
        return apiService.getTopArtists(limit);
    }

    @GetMapping(value = "/albums")
    public JsonNode getTopTenMusic(@RequestParam("genre") String genre) {
        String url = "http://api.napster.com/v2.2/albums/top?apikey=" + apiKey + "&catalog=DE&limit=10&genre=" + genre;
        RestTemplate restTemplate = new RestTemplate();
        JsonNode result = restTemplate.getForObject(url, JsonNode.class);

        return result;
    }

    @GetMapping(value = "/genres")
    public JsonNode getAllGenres() {
        String url = "http://api.napster.com/v2.2/genres?apikey=" + apiKey + "&catalog=DE";
        RestTemplate restTemplate = new RestTemplate();
        JsonNode result = restTemplate.getForObject(url, JsonNode.class);

        return result;
    }

}
