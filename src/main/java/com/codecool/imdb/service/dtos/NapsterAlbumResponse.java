package com.codecool.imdb.service.dtos;

import java.util.Collection;

public class NapsterAlbumResponse {
    private Collection<NapsterAlbum> albums;

    public Collection<NapsterAlbum> getAlbums() {
        return albums;
    }

    public void setAlbums(Collection<NapsterAlbum> albums) {
        this.albums = albums;
    }
}
