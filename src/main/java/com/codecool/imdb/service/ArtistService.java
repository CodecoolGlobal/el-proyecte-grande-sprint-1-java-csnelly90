package com.codecool.imdb.service;

import java.util.Collection;
import java.util.stream.Collectors;

import com.codecool.imdb.service.dtos.NapsterArtist;
import com.codecool.imdb.service.dtos.NapsterArtistResponse;
import com.codecool.imdb.service.dtos.response.NapsterArtistCardDto;
import com.codecool.imdb.domain.model.Artist;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ArtistService {
    @Value("${api.key}")
    private String apiKey;

    public Collection<Artist> getTopArtists(int limit) {
        String url = "http://api.napster.com/v2.2/artists/top?apikey=" + apiKey + "&catalog=UK&limit=" + limit;
        RestTemplate restTemplate = new RestTemplate();
        var result = restTemplate.getForObject(url, NapsterArtistResponse.class);

        return result.getArtists().stream().map(this::mapToArtist).collect(Collectors.toSet());
    }

    private Artist mapToArtist(NapsterArtist napsterArtist) {
        var result = new Artist();
        result.setName(napsterArtist.getName());
        result.setGenre("UNKOWN");
        result.setId(napsterArtist.getId());
        String image = getImage(napsterArtist.getId());
        result.setImage(image);
        result.setBlurbs(napsterArtist.getBlurbs());
        result.setType(napsterArtist.getType());
        return result;
    }

    private NapsterArtistCardDto mapToNapsterArtistCardDto(NapsterArtist napsterArtist) {
        var card = new NapsterArtistCardDto();
        card.setName(napsterArtist.getName());
        card.setId(napsterArtist.getId());
        String image = getImage(napsterArtist.getId());
        card.setImage(image);
        card.setType(napsterArtist.getType());
        return card;
    }

    public String getImage(String id) {
        String image;
        String url = "https://api.napster.com/v2.2/artists/" + id + "/images?apikey=" + apiKey + "&limit=1";
        RestTemplate restTemplate = new RestTemplate();
        var result = restTemplate.getForEntity(url, JsonNode.class);
        image = String.valueOf(result.getBody().findValue("url"));
        image = image.substring(0, image.length() - 1);
        image = image.substring(1);
        return image+"?apikey="+apiKey;
    }

    public Artist getArtist(String id) {
        String url = "https://api.napster.com/v2.2/artists/"+id+"?apikey="+apiKey;
        RestTemplate restTemplate = new RestTemplate();
        var result = restTemplate.getForObject(url, NapsterArtistResponse.class);

        return result.getArtists().stream().map(this::mapToArtist).toList().get(0);
    }
}
