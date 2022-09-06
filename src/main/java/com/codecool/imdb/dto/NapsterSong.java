package com.codecool.imdb.dto;

public class NapsterSong {
    private String type;
    private String id;
    private String name;
    private String artistId;
    private String artistName;
    private String albumId;
    private String albumName;
    private String[] blurbs;
    private boolean isExplicit;
    private String label;
    private String copyright;



    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean getIsExplicit() {
        return isExplicit;
    }

    public void setIsExplicit(boolean explicit) {
        isExplicit = explicit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getBlurbs() {
        return blurbs;
    }

    public void setBlurbs(String[] blurbs) {
        this.blurbs = blurbs;
    }

    public String getArtistId() {
        return artistId;
    }

    public void setArtistId(String artistId) {
        this.artistId = artistId;
    }

    public String getArtistName() {
        return artistName;
    }

    public void setArtistName(String artistName) {
        this.artistName = artistName;
    }

    public String getAlbumId() {
        return albumId;
    }

    public void setAlbumId(String albumId) {
        this.albumId = albumId;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getCopyright() {
        return copyright;
    }

    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }
}
