package com.codecool.imdb.service.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NapsterArtist {
    private String name;
    // TODO:  Get this indirectly
    // private String genre;
    private String id;
    private String image;
    private String[] blurbs;
    private String type;
}
