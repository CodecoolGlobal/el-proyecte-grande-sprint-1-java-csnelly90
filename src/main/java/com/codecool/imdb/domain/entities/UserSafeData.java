package com.codecool.imdb.domain.entities;

import com.codecool.imdb.domain.model.Album;
import com.codecool.imdb.domain.model.Artist;
import com.codecool.imdb.domain.model.Song;

import java.util.List;

public class UserSafeData {

    private final List<Album> likedAlbums;

    private final List<Artist> likedArtists;

    private final List<Song> likedSongs;

    public UserSafeData(List<Album> likedAlbums, List<Artist> likedArtists, List<Song> likedSongs) {
        this.likedAlbums = likedAlbums;
        this.likedArtists = likedArtists;
        this.likedSongs = likedSongs;
    }

    public List<Album> getLikedAlbums() {
        return List.copyOf(likedAlbums);
    }

    public List<Artist> getLikedArtists() {
        return List.copyOf(likedArtists);
    }

    public List<Song> getLikedSongs() {
        return List.copyOf(likedSongs);
    }
}
