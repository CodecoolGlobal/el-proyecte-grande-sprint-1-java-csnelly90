package com.codecool.imdb.controller;

import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserApiController {

    private UserService userService;

    @Autowired
    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/id/{userId}")
    public AppUser getUserById(@PathVariable Long userId) {
        Optional<AppUser> user = userService.getUserById(userId);
        return user.orElse(null);
    }

    @GetMapping("/me")
    public Object getCurrentUser() {
        return SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @GetMapping("/username/{username}")
    public AppUser getUserProfile(@PathVariable String username) {
        return userService.getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("There is no user with the following username: " + username));
    }
}
