package com.codecool.imdb.dto;

public class NapsterArtist {
    private String type;
    private String name;
    // TODO:  Get this indirectly
    // private String genre;

    private String id;

    private String image;

    private String[] blurbs;

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

    public String[] getBlurbs() {
        return blurbs;
    }

    public void setBlurbs(String[] blurbs) {
        this.blurbs = blurbs;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    // public String getGenre() {
    //     return genre;
    // }

    // public void setGenre(String genre) {
    //     this.genre = genre;
    // }
}
