package com.codecool.imdb.service;

import java.lang.reflect.Type;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.codecool.imdb.service.dtos.NapsterArtist;
import com.codecool.imdb.service.dtos.NapsterArtistResponse;
import com.codecool.imdb.service.dtos.response.NapsterArtistCardDto;
import com.codecool.imdb.domain.model.Artist;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
        String url = "https://api.napster.com/v2.2/artists/top?apikey=" + apiKey + "&catalog=UK&limit=" + limit + "&range=week";
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
        card.setBlurbs(String.join(" ", napsterArtist.getBlurbs()));
        card.setType(napsterArtist.getType());
        return card;
    }

    public String createImageUrl(String artistId, String resolution) {
        return "https://api.napster.com/imageserver/v2/artists/" + artistId + resolution;
    }

    protected List<?> getUserCustomArtistSearch(String userInput) throws JsonProcessingException {
        String url = "https://api.napster.com/v2.2/search/verbose?apikey=" + apiKey + "&query=" + userInput + "&type=artist";

        var resultData = restTemplate.getForObject(url, JsonNode.class);
        JsonNode node = resultData.get("search").get("data").get("artists");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        List<NapsterArtist> napsterArtistList = mapper.readValue(node.toString(), new TypeReference<List<NapsterArtist>>() {
            @Override
            public Type getType() {
                return super.getType();
            }
        });
        return napsterArtistList;
    }



}
