package com.codecool.imdb.controller;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import com.codecool.imdb.data.repositories.RoleRepository;
import com.codecool.imdb.data.repositories.UserRepository;
import com.codecool.imdb.domain.entities.AppUser;
import com.codecool.imdb.domain.entities.ERole;
import com.codecool.imdb.domain.entities.Role;
import com.codecool.imdb.domain.entities.RefreshToken;
import com.codecool.imdb.utils.exception.TokenRefreshException;
import com.codecool.imdb.payload.request.LoginRequest;
import com.codecool.imdb.payload.request.SignupRequest;
import com.codecool.imdb.payload.request.TokenRefreshRequest;
import com.codecool.imdb.payload.response.JwtResponse;
import com.codecool.imdb.payload.response.MessageResponse;
import com.codecool.imdb.payload.response.TokenRefreshResponse;
import com.codecool.imdb.security.JwtUtils;
import com.codecool.imdb.security.service.RefreshTokenService;
import com.codecool.imdb.security.service.UserDetailsImpl;
import com.codecool.imdb.utils.validation.EmailValidator;
import com.codecool.imdb.utils.validation.PasswordValidator;
import com.codecool.imdb.utils.validation.UsernameValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder encoder;

    JwtUtils jwtUtils;

    RefreshTokenService refreshTokenService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          RoleRepository roleRepository,
                          PasswordEncoder encoder,
                          JwtUtils jwtUtils,
                          RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        if (!userRepository.existsByUsername(loginRequest.getUsername()) || !encoder.matches(loginRequest.getPassword(),  userRepository.findByUsername(loginRequest.getUsername()).get().getPassword()) ) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: invalid username or password!"));
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(JwtResponse.builder()
                .token(jwt).refreshToken(refreshToken.getToken()).id(userDetails.getId())
                .username(userDetails.getUsername())
                .email(userDetails.getEmail()).roles(roles).type("Bearer")
                .build());

    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        if (!UsernameValidator.isValid(signUpRequest.getUsername())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error invalid username:" +
                            " 3 to 20 characters." +
                            "First and last characters must be letter or number." +
                            "Lowercase and uppercase letters, numbers, underscores, hyphens and dots allowed."));
        }
        if (!PasswordValidator.isValid(signUpRequest.getPassword())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error invalid password:" +
                            "6 to 40 characters." +
                            "Password must contain at least one uppercase letter," +
                            "one lowercase letter, one digit and one special character."));
        }
        if (!EmailValidator.isValid(signUpRequest.getEmail())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error invalid email:" +
                            "Must be a valid email format: include an individual part," +
                            "the at-sign and a domain name part."));
        }

        System.out.println("hello");

        // Create new user's account
        AppUser user = AppUser.builder()
                .email(signUpRequest.getEmail())
                .username(signUpRequest.getUsername())
                .firstName(signUpRequest.getFirstName())
                .lastName(signUpRequest.getLastName())
                .password(encoder.encode(signUpRequest.getPassword()))
                .build();
//

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin" -> {
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                    }
                    case "mod" -> {
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                    }
                    default -> {
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                    }
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest request){
        String requestRefreshToken = request.getRefreshToken();

        return  refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getAppUser)
                .map(appUser -> {
                    String token = jwtUtils.generateTokenFromUsername(appUser.getUsername());
                    return ResponseEntity.ok(TokenRefreshResponse.builder().accessToken(token).refreshToken(requestRefreshToken).tokenType("Bearer").build());
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,"Refresh token is not in database!"));
    }
}
