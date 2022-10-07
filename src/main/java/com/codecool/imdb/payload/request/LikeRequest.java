package com.codecool.imdb.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeRequest {
    @NotBlank
    String userName;
    @NotBlank
    String likedItem;
}
