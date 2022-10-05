package com.codecool.imdb.domain.entities;

import lombok.*;
import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String commentTargetId;

    @ManyToOne
    @JoinColumn
    private AppUser user;

    @Column(nullable = false)
    private String text;

}
