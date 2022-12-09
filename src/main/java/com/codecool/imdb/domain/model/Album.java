package com.codecool.imdb.domain.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Album extends Item {

    private String id;
    private String name;
    private String type;
    private String label;
    private Integer trackCount;
    private String image;
    private String blurbs;
    private String artistName;
    private String released;
    private List<Song> songs;
}
