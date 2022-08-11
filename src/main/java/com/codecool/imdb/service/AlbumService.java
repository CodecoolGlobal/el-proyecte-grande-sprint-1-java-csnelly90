package com.codecool.imdb.service;

import com.codecool.imdb.model.Album;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public class AlbumService {
    @Value("${com.codecool.imdb.napster.api_key}")
    private String napster_api_key;


    public List<Album> getTrendingAlbums(){


        return null;
    }
}
