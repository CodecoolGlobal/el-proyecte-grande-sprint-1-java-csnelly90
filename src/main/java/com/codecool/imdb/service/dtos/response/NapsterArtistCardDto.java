package com.codecool.imdb.service.dtos.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NapsterArtistCardDto {

    private String id;
    private String name;
    private String image;
    private String type;
    private String blurbs;
}
