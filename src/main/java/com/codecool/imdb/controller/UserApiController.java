package com.codecool.imdb.controller;

import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.CurrentSecurityContext;
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

    @GetMapping("/{userId}")
    public AppUser getUserById(@PathVariable("userId") Long id) {
        Optional<AppUser> user = userService.getUserById(id);
        return user.orElse(null);
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public AppUser getCurrentUser(@CurrentSecurityContext(expression="authentication?.name")
                                      String username) {
       return userService.getUserByUsername(username)
               .orElseThrow(() -> new UsernameNotFoundException("There is no user with the following username: " + username));
    }

    @GetMapping("/{username}")
    public AppUser getUserProfile(@PathVariable(value = "username") String username) {
        return userService.getUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("There is no user with the following username: " + username));
    }
}
