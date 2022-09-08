package com.codecool.imdb.service;

import com.codecool.imdb.service.dtos.NapsterSong;
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
public class SongService {

    @Value("${api.key}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    public Collection<NapsterSong> getTopSongsWithImage(int limit) throws JsonProcessingException {
        Collection<NapsterSong> songs = getTopSongs(limit);
        return songs.stream().map(this::addImage).collect(Collectors.toSet());
    }

    public Collection<NapsterSong> getTopSongs(int limit) throws JsonProcessingException {
        String url = "https://api.napster.com/v2.2/tracks/top?apikey=" + apiKey + "&catalog=UK&limit=" + limit + "&range=week";
        var resultData = restTemplate.getForObject(url, JsonNode.class);
        JsonNode node = resultData.get("tracks");
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return mapper.readValue(node.toString(), new TypeReference<List<NapsterSong>>() {
            @Override
            public Type getType() {
                return super.getType();
            }
        });
    }

    private List<NapsterSong> getUserCustomSongSearch(String userInput) throws JsonProcessingException {
        String url = "https://api.napster.com/v2.2/search/verbose?apikey=" + apiKey + "&query=" + userInput + "&type=track";

        var resultData = restTemplate.getForObject(url, JsonNode.class);
        JsonNode node = resultData.get("search").get("data").get("tracks");

        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        List<NapsterSong> napsterTrackList = mapper.readValue(node.toString(), new TypeReference<List<NapsterSong>>() {
            @Override
            public Type getType() {
                return super.getType();
            }
        });
        return napsterTrackList;
    }

    private NapsterSong addImage(NapsterSong napsterSong) {
        String resolution = "/images/356x237.jpg";
        String image = createImageUrl(napsterSong.getAlbumId(), resolution);
        napsterSong.setImage(image);
        return napsterSong;
    }

    public String createImageUrl(String albumId, String resolution) {
        return "https://api.napster.com/imageserver/v2/albums/" + albumId + resolution;
    }

    public List<NapsterSong> getUserCustomSearchWithImage(String userInput) throws JsonProcessingException{
        List<NapsterSong> response = getUserCustomSongSearch(userInput);
        return response.stream().map(this::addImage).collect(Collectors.toList());
    }

    public Collection<NapsterSong> getSongsByAlbumId(String id) throws JsonProcessingException {
        String url = "https://api.napster.com/v2.2/albums/"+id+"/tracks?apikey="+apiKey;
        var resultData = restTemplate.getForObject(url, JsonNode.class);
        JsonNode node = resultData.get("tracks");
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        Collection<NapsterSong> napsterSongs = mapper.readValue(node.toString(), new TypeReference<List<NapsterSong>>() {
            @Override
            public Type getType() {
                return super.getType();
            }
        });
        return napsterSongs.stream().map(this::addImage).collect(Collectors.toSet());
    }
}
