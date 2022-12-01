package com.codecool.imdb.controller;

import com.codecool.imdb.domain.model.Album;
import com.codecool.imdb.service.AlbumService;
import com.codecool.imdb.service.dtos.NapsterAlbum;
import com.codecool.imdb.service.dtos.response.NapsterAlbumCardDto;
import com.codecool.imdb.service.dtos.response.NapsterArtistCardDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/albums")
public class AlbumApiController {

    private AlbumService albumService;

    @Autowired
    public AlbumApiController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping("/trending")
    public Collection<NapsterAlbumCardDto> getTopTenAlbums() {
        int limit = 10;
        int offset = 0;
        return albumService.getTopAlbums(limit, offset);
    }

    @GetMapping(value = "/top-trending")
    public Collection<NapsterAlbumCardDto> getTopAlbums(@RequestParam("offset") int offset) {
        var limit = 10;
        return albumService.getTopAlbums(limit, offset);
    }

    @GetMapping(value = "/{id}")
    public Collection<NapsterAlbumCardDto> getAlbumsByArtistId(@PathVariable String id){
        return albumService.getAlbumsByArtistId(id);
    }

    @GetMapping(value = "/album/{id}")
    public Album getAlbumById(@PathVariable String id) {
        return albumService.getAlbumById(id);
    }
}
