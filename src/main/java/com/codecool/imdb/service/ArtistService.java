package com.codecool.imdb.service;

import java.util.Collection;
import java.util.stream.Collectors;

import com.codecool.imdb.service.dtos.NapsterArtist;
import com.codecool.imdb.service.dtos.NapsterArtistResponse;
import com.codecool.imdb.service.dtos.response.NapsterArtistCardDto;
import com.codecool.imdb.domain.model.Artist;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ArtistService {
    @Value("${api.key}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    public Artist getArtist(String artistId) {
        String url = "https://api.napster.com/v2.2/artists/" + artistId + "?apikey=" + apiKey;
        var result = restTemplate.getForObject(url, NapsterArtistResponse.class);
        return result.getArtists().stream().map(this::mapToArtist).toList().get(0);
    }

    public Collection<NapsterArtistCardDto> getTopArtists(int limit) {
        String url = "http://api.napster.com/v2.2/artists/top?apikey=" + apiKey + "&catalog=UK&limit=" + limit;
        var result = restTemplate.getForObject(url, NapsterArtistResponse.class);

        return result.getArtists().stream().map(this::mapToNapsterArtistCardDto).collect(Collectors.toSet());
    }

    private Artist mapToArtist(NapsterArtist napsterArtist) {
        String resolution = "/images/633x422.jpg";
        var result = new Artist();
        result.setName(napsterArtist.getName());
        result.setGenre("UNKOWN");
        result.setId(napsterArtist.getId());
        String image = createImageUrl(napsterArtist.getId(), resolution);
        result.setImage(image);
        result.setBlurbs(napsterArtist.getBlurbs());
        result.setType(napsterArtist.getType());
        return result;
    }

    private NapsterArtistCardDto mapToNapsterArtistCardDto(NapsterArtist napsterArtist) {
        String resolution = "/images/356x237.jpg";
        var card = new NapsterArtistCardDto();
        card.setName(napsterArtist.getName());
        card.setId(napsterArtist.getId());
        String image = createImageUrl(napsterArtist.getId(), resolution);
        card.setImage(image);
        card.setType(napsterArtist.getType());
        return card;
    }

    public String createImageUrl(String artistId, String resolution) {
        return "https://api.napster.com/imageserver/v2/artists/" + artistId + resolution;
    }
}
