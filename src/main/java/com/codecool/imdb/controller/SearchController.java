package com.codecool.imdb.controller;

import com.codecool.imdb.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    private SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping(value = "/{type}/{userInput}")
    public List<?> getUsersCustomSearch(@PathVariable String type, @PathVariable String userInput) throws IOException {
        return searchService.getUsersCustomSearch(type,userInput);
    }
}
