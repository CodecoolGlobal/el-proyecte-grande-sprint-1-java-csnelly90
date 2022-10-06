package com.codecool.imdb.service;

import com.codecool.imdb.data.repositories.CommentRepository;
import com.codecool.imdb.domain.common.Result;
import com.codecool.imdb.domain.common.ResultWithValue;
import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.domain.entities.Comment;
import com.codecool.imdb.service.dtos.CommentDto;
import com.codecool.imdb.service.dtos.response.CommentResponseDto;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CommentService {
    private final CommentRepository repository;
    private final UserService userService;
    @Autowired
    public CommentService(CommentRepository repository, UserService userService){
        this.repository = repository;
        this.userService = userService;
    }


    public Result createComment(CommentDto commentDto) {
        try{
            Optional<AppUser> appUser = userService.getUserByUsername(commentDto.getUsername());
            log.info(String.valueOf(appUser));
                if (appUser.get().getClass() == AppUser.class){
                    Comment comment = Comment.builder()
                            .commentTargetId(commentDto.getCommentTargetId())
                            .user(appUser.get())
                            .text(commentDto.getText())
                            .build();
                    repository.save(comment);
            }
        }catch(Exception e){
            return new ResultWithValue<Comment>(false, e.getMessage(), null);
        }
        return new Result(true, "");
    }


    public List<CommentResponseDto> getCommentsByTargetId(String commentTargetId){
        List<Comment> comments =  repository.findAllByCommentTargetId(commentTargetId);
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        return comments.stream().
                map(comment -> new CommentResponseDto(comment.getUser().getUsername(), comment.getText()))
                .collect(Collectors.toList());

    }
}
