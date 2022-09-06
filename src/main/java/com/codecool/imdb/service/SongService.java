package com.codecool.imdb.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SongService {

    @Value("${api.key}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();
}
