package com.codecool.imdb.service;

import com.codecool.imdb.domain.model.Album;
import com.codecool.imdb.service.dtos.NapsterAlbum;
import com.codecool.imdb.service.dtos.NapsterAlbumResponse;
import com.codecool.imdb.service.dtos.response.NapsterAlbumCardDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Type;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AlbumService {

    @Value("${api.key}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    private List<NapsterAlbum> getUserCustomAlbumSearch(String userInput) throws JsonProcessingException {
        String url = "https://api.napster.com/v2.2/search/verbose?apikey=" + apiKey + "&query=" + userInput + "&type=album";
        var resultData = restTemplate.getForObject(url, JsonNode.class);
        JsonNode node = resultData.get("search").get("data").get("albums");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        List<NapsterAlbum> napsterAlbumList = mapper.readValue(node.toString(), new TypeReference<List<NapsterAlbum>>() {
            @Override
            public Type getType() {
                return super.getType();
            }
        });
        return napsterAlbumList;
    }

    public Collection<NapsterAlbumCardDto> getTopAlbums(int limit, int offset) {
        String url = "http://api.napster.com/v2.2/albums/top?apikey=" + apiKey + "&catalog=UK&limit=" + limit + "&offset=" + offset + "range=week";
        var resultData = restTemplate.getForObject(url, NapsterAlbumResponse.class);
        return resultData.getAlbums().stream().map(this::mapToNapsterAlbumCardDto).collect(Collectors.toSet());
    }

    public Collection<NapsterAlbumCardDto> getAlbumsByArtistId(String id){
        String url = "https://api.napster.com/v2.2/artists/"+id+"/albums/top?apikey="+apiKey+"&limit=200";
        var resultData = restTemplate.getForObject(url, NapsterAlbumResponse.class);
        return resultData.getAlbums().stream().map(this::mapToNapsterAlbumCardDto).collect(Collectors.toSet());
    }

    public Album getAlbumById(String id) {
        String url = "https://api.napster.com/v2.2/albums/" + id + "?apikey=" + apiKey;
        var resultData = restTemplate.getForObject(url, NapsterAlbumResponse.class);
        return resultData.getAlbums().stream().map(this::mapToAlbum).toList().get(0);
    }

    private NapsterAlbumCardDto mapToNapsterAlbumCardDto(NapsterAlbum napsterAlbum) {
        String resolution = "/images/356x237.jpg";
        var card = new NapsterAlbumCardDto();
        card.setId(napsterAlbum.getId());
        card.setName(napsterAlbum.getName());
        String image = createImageUrl(card.getId(), resolution);
        card.setImage(image);
        card.setType(napsterAlbum.getType());
        if (napsterAlbum.getBlurbs() != null  && napsterAlbum.getBlurbs().length != 0) {
            card.setBlurbs(String.join(" ", napsterAlbum.getBlurbs()));
        } else {
            card.setBlurbs("There is no available information.");
        }
        card.setArtistName(napsterAlbum.getArtistName());
        card.setReleased(napsterAlbum.getReleased().substring(0, 4));
        card.setLabel(napsterAlbum.getLabel());

        return card;
    }

    private Album mapToAlbum(NapsterAlbum napsterAlbum) {
        String resolution = "/images/633x422.jpg";
        var result = new Album();
        result.setId(napsterAlbum.getId());
        result.setName(napsterAlbum.getName());
        String image = createImageUrl(result.getId(), resolution);
        result.setImage(image);
        result.setType(napsterAlbum.getType());
        if (napsterAlbum.getBlurbs() != null  && napsterAlbum.getBlurbs().length != 0) {
            result.setBlurbs(String.join(" ", napsterAlbum.getBlurbs()));
        } else {
            result.setBlurbs("There is no available information.");
        }
        result.setArtistName(napsterAlbum.getArtistName());
        result.setReleased(napsterAlbum.getReleased().substring(0, 4));
        result.setLabel(napsterAlbum.getLabel());
        return result;
    }

    public String createImageUrl(String albumId, String resolution) {
        return "https://api.napster.com/imageserver/v2/albums/" + albumId + resolution;
    }
    
    public List<NapsterAlbumCardDto> getUserCustomAlbumSearchWithImage(String userInput) throws JsonProcessingException{
        List<NapsterAlbum> response = getUserCustomAlbumSearch(userInput);
        return response.stream().map(this::mapToNapsterAlbumCardDto).collect(Collectors.toList());
    }

}
