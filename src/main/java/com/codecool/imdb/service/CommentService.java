package com.codecool.imdb.service;

import com.codecool.imdb.data.repositories.CommentRepository;
import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.domain.entities.Comment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CommentService {
    private CommentRepository repository;
    private UserService userService;

    public void createComment(String commentText,String commentTargetId, String userName){
        AppUser appUser = (AppUser) userService.loadUserByUsername(userName);
        Comment comment = Comment.builder()
                .commentTargetId(commentTargetId)
                .user(appUser)
                .text(commentText)
                .build();
    }
}
