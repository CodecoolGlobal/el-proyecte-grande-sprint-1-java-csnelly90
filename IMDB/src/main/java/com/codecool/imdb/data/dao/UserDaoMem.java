package com.codecool.imdb.data.dao;

import com.codecool.imdb.model.Album;
import com.codecool.imdb.model.Artist;
import com.codecool.imdb.model.Song;

import java.util.ArrayList;
import java.util.List;

public class UserDaoMem implements UserDao {

    @Override
    public String getNameByUserId(int userId) {
        return "Name";
    }

    @Override
    public String getPasswordByUserId(int userId) {
        return "1234";
    }

    @Override
    public List<Album> getLikedAlbumsByUserId(int userId) {
        List<Album> albums = new ArrayList<>();
        albums.add(new Album());
        return albums;
    }

    @Override
    public List<Artist> getLikedArtistsByUserId(int userId) {
        List<Artist> artists = new ArrayList<>();
        artists.add(new Artist());
        return artists;
    }

    @Override
    public List<Song> getLikedSongsByUserId(int userId) {
        List<Song> songs = new ArrayList<>();
        songs.add(new Song());
        return songs;
    }
}
