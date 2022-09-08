package com.codecool.imdb.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {

    private final ArtistService artistService;
    private final AlbumService albumService;
    private final SongService songService;

    @Autowired
    public SearchService(ArtistService artistService, AlbumService albumService, SongService songService) {
        this.artistService = artistService;
        this.albumService = albumService;
        this.songService = songService;
    }

    public List<?> getUsersCustomSearch(String searchedType, String userInput) throws JsonProcessingException {
        return switch (searchedType) {
            case ("album") -> albumService.getUserCustomAlbumSearchWithImage(userInput);
            case ("artist") -> artistService.getUserCustomArtistSearchWithImage(userInput);
            case ("song") -> songService.getUserCustomSearchWithImage(userInput);
            default -> null;
        };
    }
}
