package com.codecool.imdb.model;

import java.util.List;

public class Album {

    private final String name;

    private final Artist artist;

    private List<Song> songs;

    public Album(String name, Artist artist, List<Song> songs) {
        this.name = name;
        this.artist = artist;
        this.songs = songs;
    }

    public String getName() {
        return name;
    }

    public Artist getArtist() {
        return artist;
    }

    public List<Song> getSongs() {
        return List.copyOf(songs);
    }

    public void addToSongs(Song song) {
        this.songs.add(song);
    }
}
