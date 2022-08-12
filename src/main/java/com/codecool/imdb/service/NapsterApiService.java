package com.codecool.imdb.service;

import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Profile("apis")
public class NapsterApiService implements ApiService {
    @Value("${api.key}")
    private String apiKey;

    @Override
    public JsonNode getTopArtists(int limit) {
        String url = "http://api.napster.com/v2.2/artists/top?apikey="+ apiKey +"&catalog=DE&limit=10";
        RestTemplate restTemplate = new RestTemplate();
        JsonNode result = restTemplate.getForObject(url, JsonNode.class);

        return result;
    }
}
