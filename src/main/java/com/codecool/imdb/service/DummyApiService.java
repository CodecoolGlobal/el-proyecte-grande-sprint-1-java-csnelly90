package com.codecool.imdb.service;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import com.codecool.imdb.model.Artist;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("default")
public class DummyApiService implements ApiService {

    @Override
    public Collection<Artist> getTopArtists(int limit) {
        var artists = new HashSet<Artist>();
        for (int i = 0; i < 10; i++) {
            artists.add(new Artist("Artist " + i, "Pop", null));
        }
        return artists;
    }

    @Override
    public Artist getArtist(String id) {
        return null;
    }

    @Override
    public List<?> getUsersCustomSearch(String searchedType, String userInput) {
        return null;
    }

}
