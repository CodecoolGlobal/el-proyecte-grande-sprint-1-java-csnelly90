package com.codecool.imdb.domain.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Album {

    private String id;
    private String name;
    private Artist artistName;
    private Integer released;
    private String type;
    private String label;
    private Integer trackCount;
    private List<Song> songs;
}
