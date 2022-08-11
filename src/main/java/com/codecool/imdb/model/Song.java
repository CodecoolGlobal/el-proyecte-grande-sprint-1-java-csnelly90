package com.codecool.imdb.model;

public class Song {

    private final String name;

    private final String genre;

    private final Artist artist;

    public Song(String name, String genre, Artist artist) {
        this.name = name;
        this.genre = genre;
        this.artist = artist;
    }

    public String getName() {
        return name;
    }

    public String getGenre() {
        return genre;
    }

    public Artist getArtist() {
        return artist;
    }
}
