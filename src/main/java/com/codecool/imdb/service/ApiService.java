package com.codecool.imdb.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface ApiService {

    JsonNode getTopArtists(int limit);

}
