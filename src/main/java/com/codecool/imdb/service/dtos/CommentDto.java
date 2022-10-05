package com.codecool.imdb.service.dtos;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CommentDto {
    private String userName;
    private String text;
    private String commentTargetId;
}
