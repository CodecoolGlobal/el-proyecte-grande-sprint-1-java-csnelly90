package com.codecool.imdb.domain.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn
    private AppUser user;

    private String itemId;

    private boolean isLiked;

    public Likes(AppUser user, String likedItem, boolean isLiked) {
        this.user = user;
        this.itemId = likedItem;
        this.isLiked = isLiked;
    }
}
