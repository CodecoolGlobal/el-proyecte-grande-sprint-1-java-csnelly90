package com.codecool.imdb.service.dtos;

import com.codecool.imdb.domain.model.Item;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NapsterSong extends Item {
    private String type;
    private String id;
    private String name;
    private String artistId;
    private String artistName;
    private String albumId;
    private String albumName;
    private String[] blurbs;
    private boolean isExplicit;
    private String label;
    private String copyright;
    private String image;
    private String previewURL;
}
