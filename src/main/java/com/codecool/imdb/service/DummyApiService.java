package com.codecool.imdb.service;

import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("default")
public class DummyApiService implements ApiService {

    @Override
    public JsonNode getTopArtists(int limit) {
        // TODO Auto-generated method stub
        return null;
    }

}
