package com.codecool.imdb.domain.model;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Artist extends Item {

    private String name;
    private String genre;
    private String id;
    private String image;
    private String[] blurbs;
    private String type;
}
