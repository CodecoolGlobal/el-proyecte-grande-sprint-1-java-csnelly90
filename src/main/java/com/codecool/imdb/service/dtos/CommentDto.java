package com.codecool.imdb.service.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private String username;
    private String text;
    private String commentTargetId;
}
