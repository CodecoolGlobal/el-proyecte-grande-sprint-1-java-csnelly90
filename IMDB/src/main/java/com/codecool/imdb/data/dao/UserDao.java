package com.codecool.imdb.data.dao;

import com.codecool.imdb.model.Album;
import com.codecool.imdb.model.Artist;
import com.codecool.imdb.model.Song;

import java.util.List;

public interface UserDao {

    String getNameByUserId(int userId);
    String getPasswordByUserId(int userId);
    List<Album> getLikedAlbumsByUserId(int userId);
    List<Artist> getLikedArtistsByUserId(int userId);
    List<Song> getLikedSongsByUserId(int userId);
}
