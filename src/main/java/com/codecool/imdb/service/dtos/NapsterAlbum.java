package com.codecool.imdb.service.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NapsterAlbum {
    private String type;
    private String id;
    private String name;
    private String[] blurbs;
    private String artistName;
    private String released;
    private String label;
    private String copyright;
    private boolean isExplicit;
}
