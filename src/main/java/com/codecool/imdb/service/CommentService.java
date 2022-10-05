package com.codecool.imdb.service;

import com.codecool.imdb.data.repositories.CommentRepository;
import com.codecool.imdb.domain.common.Result;
import com.codecool.imdb.domain.common.ResultWithValue;
import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.domain.entities.Comment;
import com.codecool.imdb.service.dtos.CommentDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CommentService {
    private CommentRepository repository;
    private UserService userService;
    @Autowired
    public CommentService(CommentRepository repository, UserService userService){
        this.repository = repository;
        this.userService = userService;
    }


    public Result createComment(CommentDto commentDto) {
        try{
        Optional<AppUser> appUser = userService.getUserByUsername(commentDto.getUserName());
            if (appUser.isPresent()) {
                Comment comment = Comment.builder()
                        .commentTargetId(commentDto.getCommentTargetId())
                        .user(appUser.get())
                        .text(commentDto.getText())
                        .build();
                repository.save(comment);
                return new ResultWithValue<>(true, "", comment);
            }
        }catch(Exception e ){
            return new ResultWithValue<Comment>(false, e.getMessage(), null);
        }
        return new Result(true, "");
    }

    public List<Comment> getCommentTargetId(String commentTargetId){
        return repository.findByCommentTargetId(commentTargetId);
    }
}
