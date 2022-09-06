package com.codecool.imdb.service;

import java.util.Collection;

import com.codecool.imdb.domain.model.Artist;

public interface ApiService {

    Collection<Artist> getTopArtists(int limit);

    Artist getArtist(String id);

}
