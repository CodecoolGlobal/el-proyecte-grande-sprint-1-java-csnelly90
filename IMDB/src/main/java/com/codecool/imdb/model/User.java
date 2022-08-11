package com.codecool.imdb.model;

import java.util.ArrayList;
import java.util.List;

public class User{

    private final int id;

    private String name;

    private String password;

    private List<Album> likedAlbums = new ArrayList<>();

    private List<Artist> likedArtists = new ArrayList<>();

    private List<Song> likedSongs = new ArrayList<>();

    public User(int id, String name, String password) {
        this.id = id;
        this.name = name;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Album> getLikedAlbums() {
        return List.copyOf(likedAlbums);
    }

    public void addToLikedAlbums(Album likedAlbum) {
        this.likedAlbums.add(likedAlbum);
    }

    public List<Artist> getLikedArtists() {
        return List.copyOf(likedArtists);
    }

    public void addToLikedArtists(Artist likedArtist) {
        this.likedArtists.add(likedArtist);
    }

    public List<Song> getLikedSongs() {
        return List.copyOf(likedSongs);
    }

    public void addToLikedSongs(Song likedSong) {
        this.likedSongs.add(likedSong);
    }
}
