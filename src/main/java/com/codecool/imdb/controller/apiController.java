package com.codecool.imdb.controller;


import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;



@RestController
@RequestMapping("/api")
public class apiController {

    @Value("${api.key}")
    private String apiKey;


    @GetMapping(value = "/artists")
    public JsonNode getTopTenArtist(){
        String url = "http://api.napster.com/v2.2/artists/top?apikey="+ apiKey +"&catalog=DE&limit=10";
        RestTemplate restTemplate = new RestTemplate();
        JsonNode result = restTemplate.getForObject(url, JsonNode.class);

        return result;
    }

    @GetMapping(value = "/albums")
    public JsonNode getTopTenMusic(){
        String url = "http://api.napster.com/v2.2/albums/top?apikey="+ apiKey +"&catalog=DE&limit=10";
        RestTemplate restTemplate = new RestTemplate();
        JsonNode result = restTemplate.getForObject(url, JsonNode.class);

        return result;
    }


    @GetMapping(value = "/genres")
    public JsonNode getAllGenres(){
        String url = "http://api.napster.com/v2.2/genres?apikey="+ apiKey+"&catalog=DE";
        RestTemplate restTemplate = new RestTemplate();
        JsonNode result = restTemplate.getForObject(url, JsonNode.class);

        return result;
    }


}
