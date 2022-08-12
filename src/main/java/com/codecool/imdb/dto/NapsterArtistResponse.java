package com.codecool.imdb.dto;

import java.util.Collection;

public class NapsterArtistResponse {
    private Collection<NapsterArtist> artists;

    public Collection<NapsterArtist> getArtists() {
        return artists;
    }

    public void setArtists(Collection<NapsterArtist> artists) {
        this.artists = artists;
    }
}
