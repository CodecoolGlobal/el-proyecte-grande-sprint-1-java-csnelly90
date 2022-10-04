package com.codecool.imdb.service;

import com.codecool.imdb.data.repositories.UserRepository;
import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.security.service.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<AppUser> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<AppUser> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<AppUser> user = userRepository.findByUsername(username);

        if (user.isEmpty()) {
            log.error("No user found in database by the following username: {}", username);
            throw new UsernameNotFoundException("User not found in database.");
        } else {
            log.info("Loading user from database. Name: {}", username);
        }

        return UserDetailsImpl.build(user.get());
    }
}
