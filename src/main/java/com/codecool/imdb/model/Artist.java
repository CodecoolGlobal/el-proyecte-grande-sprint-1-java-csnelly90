package com.codecool.imdb.model;

public class Artist {

    private String name;

    private String genre;

    private String id;

    private String image;

    private String[] blurbs;

    private String type;

    public Artist() {

    }

    public Artist(String name, String genre, String[] blurbs) {
        this.name = name;
        this.genre = genre;
        this.blurbs = blurbs;
        if (this.blurbs == null){
            setBlurbs(new String[]{"unknown!"});
        }
    }

    public String getName() {
        return name;
    }

    public String getGenre() {
        return genre;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setGenre(String genre) {
        this.genre = genre;
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
}
