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
import java.util.List;

@Service
public class SongService {

    @Value("${api.key}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    protected List<?> getUserCustomSongSearch(String userInput) throws JsonProcessingException {
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
}
