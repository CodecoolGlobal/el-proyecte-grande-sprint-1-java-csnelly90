package com.codecool.imdb.dto;

public class NapsterArtist {
    private String name;
    // TODO:  Get this indirectly
    // private String genre;

    private String id;

    private String image;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // public String getGenre() {
    //     return genre;
    // }

    // public void setGenre(String genre) {
    //     this.genre = genre;
    // }
}
