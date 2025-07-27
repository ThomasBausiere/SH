package org.example.api_sh.repository;

import org.example.api_sh.entity.Boss;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BossRepository extends JpaRepository<Boss, Integer> {
    List<Boss> findByEliteSkill_Id(Integer skillId);

    @Query("SELECT b FROM Boss b WHERE LOWER(b.eliteSkill.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Boss> findByEliteSkill_Name(@Param("keyword") String keyword);

    @Query("SELECT b FROM Boss b WHERE LOWER(b.eliteSkill.profession) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Boss> findByEliteSkill_profession(@Param("keyword") String keyword);

    @Query("SELECT b FROM Boss b WHERE LOWER(b.eliteSkill.campaign) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Boss> findByEliteSkill_Campaign(@Param("keyword") String keyword);

    @Query("SELECT b FROM Boss b WHERE LOWER(b.eliteSkill.attribute) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Boss> findByEliteSkill_Attribute(@Param("keyword") String keyword);


}
