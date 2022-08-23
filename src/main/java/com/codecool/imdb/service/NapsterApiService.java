package com.codecool.imdb.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import com.codecool.imdb.dto.NapsterArtist;
import com.codecool.imdb.dto.NapsterArtistResponse;
import com.codecool.imdb.model.Artist;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Profile("apis")
public class NapsterApiService implements ApiService {
    @Value("${api.key}")
    private String apiKey;

    @Override
    public Collection<Artist> getTopArtists(int limit) {
        String url = "http://api.napster.com/v2.2/artists/top?apikey=" + apiKey + "&catalog=DE&limit=10";
        RestTemplate restTemplate = new RestTemplate();
        var result = restTemplate.getForObject(url, NapsterArtistResponse.class);

        return result.getArtists().stream().map(this::mapToArtist).collect(Collectors.toSet());
    }

    private Artist mapToArtist(NapsterArtist napsterArtist) {
        var result = new Artist();
        result.setName(napsterArtist.getName());
        result.setGenre("UNKOWN");
        return result;
    }
}
