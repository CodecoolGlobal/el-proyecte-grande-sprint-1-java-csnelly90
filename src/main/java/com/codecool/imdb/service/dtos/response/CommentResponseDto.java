package com.codecool.imdb.service.dtos.response;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseDto {
    private String username;
    private String text;
}
