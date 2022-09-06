package com.codecool.imdb.service;

import java.util.Collection;
import java.util.List;

import com.codecool.imdb.model.Artist;
import com.fasterxml.jackson.databind.JsonNode;

public interface ApiService {

    Collection<Artist> getTopArtists(int limit);

    Artist getArtist(String id);

    List<?> getUsersCustomSearch(String searchedType, String userInput);
}
