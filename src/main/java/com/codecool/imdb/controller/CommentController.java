package com.codecool.imdb.controller;

import com.codecool.imdb.domain.common.Result;
import com.codecool.imdb.payload.response.MessageResponse;
import com.codecool.imdb.service.CommentService;
import com.codecool.imdb.service.dtos.CommentDto;
import com.codecool.imdb.service.dtos.response.CommentResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addComments(@RequestBody CommentDto commentDto)  {
            Result res = commentService.createComment(commentDto);
            if (res.getFailrule()){
                log.error(res.getError());
                return ResponseEntity.badRequest().body(new MessageResponse(res.getError()));
            }
            return ResponseEntity.ok(new MessageResponse("Comment addition was successful"));
    }
    @GetMapping("/get/{targetId}")
    public List<CommentResponseDto> getCommentBasedTargetId(@PathVariable String targetId){
        log.info(targetId);
        return commentService.getCommentsByTargetId(targetId);
    }
}
