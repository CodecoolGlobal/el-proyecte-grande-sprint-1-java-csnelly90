package com.codecool.imdb.service;

import java.util.Collection;

import com.codecool.imdb.model.Artist;
import com.fasterxml.jackson.databind.JsonNode;

public interface ApiService {

    Collection<Artist> getTopArtists(int limit);

}
