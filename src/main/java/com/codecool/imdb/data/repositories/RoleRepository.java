package com.codecool.imdb.data.repositories;

import com.codecool.imdb.domain.entities.ERole;
import com.codecool.imdb.domain.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
