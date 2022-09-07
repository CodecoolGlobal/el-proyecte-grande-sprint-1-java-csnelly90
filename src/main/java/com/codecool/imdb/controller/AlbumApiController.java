package com.codecool.imdb.controller;

import com.codecool.imdb.service.AlbumService;
import com.codecool.imdb.service.dtos.NapsterAlbum;
import com.codecool.imdb.service.dtos.response.NapsterAlbumCardDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api/albums")
public class AlbumApiController {

    private AlbumService albumService;

    @Autowired
    public AlbumApiController(AlbumService albumService) {
        this.albumService = albumService;
    }

    @GetMapping
    public Collection<NapsterAlbumCardDto> getTopTenAlbums() {
        int limit = 10;
        return albumService.getTopAlbums(limit);
    }
}
