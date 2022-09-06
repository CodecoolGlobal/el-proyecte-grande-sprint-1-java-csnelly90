package com.codecool.imdb.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Song {

    private Integer id;
    private String name;
    private Integer albumId;
    private Artist albumName;
    private Integer artistId;
    private Artist artistName;
    private Integer released;
    private String type;
    private String label;
}
