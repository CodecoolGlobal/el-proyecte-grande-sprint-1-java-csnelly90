package com.codecool.imdb.domain.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Song extends Item {

    private String id;
    private String name;
    private Integer albumId;
    private Artist albumName;
    private Integer artistId;
    private Artist artistName;
    private Integer released;
    private String type;
    private String label;
    private String previewURL;
}
