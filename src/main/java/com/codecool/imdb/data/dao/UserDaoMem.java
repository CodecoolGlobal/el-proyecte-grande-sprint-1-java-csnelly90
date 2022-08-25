package com.codecool.imdb.data.dao;

import com.codecool.imdb.model.Album;
import com.codecool.imdb.model.Artist;
import com.codecool.imdb.model.Song;
import com.codecool.imdb.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserDaoMem implements UserDao {

    private User user = new User(1, "UserName", "1234");
    private Artist arcticMonkeys = new Artist("Arctic Monkeys", "Indie", null);
    private Song doIWannaKnow = new Song("Do I Wanna Know?", "Indie", arcticMonkeys);
    private Song iWantItAll = new Song("I Want It All", "Indie", arcticMonkeys);
    private List<Song> alumSongs = new ArrayList<>() {{
        add(doIWannaKnow);
        add(iWantItAll);
    }};
    private Album am = new Album("AM", arcticMonkeys, alumSongs);

    public UserDaoMem() {
        user.addToLikedAlbums(am);
        user.addToLikedArtists(arcticMonkeys);
        user.addToLikedSongs(doIWannaKnow);
    }

    @Override
    public String getNameByUserId(int userId) {
        return user.getName();
    }

    @Override
    public String getPasswordByUserId(int userId) {
        return user.getPassword();
    }

    @Override
    public List<Album> getLikedAlbumsByUserId(int userId) {
        return user.getLikedAlbums();
    }

    @Override
    public List<Artist> getLikedArtistsByUserId(int userId) {
        return user.getLikedArtists();
    }

    @Override
    public List<Song> getLikedSongsByUserId(int userId) {
        return user.getLikedSongs();
    }
}
