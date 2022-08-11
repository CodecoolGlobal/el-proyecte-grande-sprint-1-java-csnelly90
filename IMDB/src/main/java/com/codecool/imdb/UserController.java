package com.codecool.imdb;

import com.codecool.imdb.data.dao.UserDaoMem;
import com.codecool.imdb.model.Album;
import com.codecool.imdb.model.Artist;
import com.codecool.imdb.model.Song;
import com.codecool.imdb.model.UserSafeData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserDaoMem userDaoMem;

    @GetMapping(value = "user/albums")
    public List<Album> userLikedAlbums() {
        return userDaoMem.getLikedAlbumsByUserId(1);
    }

    @GetMapping(value = "user/artists")
    public List<Artist> userLikedArtists() {
        return userDaoMem.getLikedArtistsByUserId(1);
    }

    @GetMapping(value = "user/songs")
    public List<Song> userLikedSongs() {
        return userDaoMem.getLikedSongsByUserId(1);
    }

    @GetMapping(value = "user")
    public UserSafeData user() {
        return new UserSafeData(userLikedAlbums(), userLikedArtists(), userLikedSongs());
    }
}
