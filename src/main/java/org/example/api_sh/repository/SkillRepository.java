package org.example.api_sh.repository;

import org.example.api_sh.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
    @Query("SELECT s FROM Skill s WHERE " +
            "LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%'))" +
            " OR " + "LOWER(s.campaign) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(s.profession) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Skill> searchSkillsByKeyword(@Param("search") String search);
    Optional<Skill> findByName(String name);
}
