package com.codecool.imdb.domain.entities;

import com.codecool.imdb.domain.model.Album;
import com.codecool.imdb.domain.model.Artist;
import com.codecool.imdb.domain.model.Song;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private int id;
    private String name;
    private String password;
    private List<Album> likedAlbums = new ArrayList<>();
    private List<Artist> likedArtists = new ArrayList<>();
    private List<Song> likedSongs = new ArrayList<>();

    public void addToLikedArtists(Artist likedArtist) {
        this.likedArtists.add(likedArtist);
    }

    public void addToLikedAlbums(Album likedAlbum) {
        this.likedAlbums.add(likedAlbum);
    }

    public void addToLikedSongs(Song likedSong) {
        this.likedSongs.add(likedSong);
    }
}
