package com.codecool.imdb.service;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.codecool.imdb.dto.NapsterArtist;
import com.codecool.imdb.dto.NapsterArtistResponse;
import com.codecool.imdb.dto.NapsterTrack;
import com.codecool.imdb.dto.response.NapsterArtistCardDto;
import com.codecool.imdb.model.Artist;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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


    @Override
    public Artist getArtist(String id) {
        String url = "https://api.napster.com/v2.2/artists/"+id+"?apikey="+apiKey;
        RestTemplate restTemplate = new RestTemplate();
        var result = restTemplate.getForObject(url, NapsterArtistResponse.class);

        return result.getArtists().stream().map(this::mapToArtist).toList().get(0);
    }

    public List<?> getUsersCustomSearch(String searchedType, String userInput) throws JsonProcessingException {
        return switch (searchedType) {
            case ("album") -> getUserCustomAlbumSearch(userInput);
            case ("artist") -> getUserCustomArtistSearch(userInput);
            case ("songs") -> getUserCustomTrackSearch(userInput);
            default -> null;
        };
    }


    private List<?> getUserCustomArtistSearch(String userInput) {
        return null;
    }

    private List<?> getUserCustomAlbumSearch(String userInput) {
        return null;
    }
    private List<?> getUserCustomTrackSearch(String userInput) throws JsonProcessingException {
        String url = "https://api.napster.com/v2.2/search/verbose?apikey=" + apiKey + "&query=" + userInput + "&type=track";
        RestTemplate restTemplate = new RestTemplate();
        var resultData = restTemplate.getForObject(url, JsonNode.class);
        JsonNode node = resultData.get("search").get("data").get("tracks");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        List<NapsterTrack> napsterTrackList = mapper.readValue(node.toString(), new TypeReference<List<NapsterTrack>>() {
            @Override
            public Type getType() {
                return super.getType();
            }
        });
        napsterTrackList.stream().forEach(System.out::println);
        return napsterTrackList;
    }
}
