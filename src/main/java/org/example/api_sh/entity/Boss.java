package org.example.api_sh.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.api_sh.entity.enums.Attribute;
import org.example.api_sh.entity.enums.Campaign;
import org.example.api_sh.entity.enums.Profession;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class Boss {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Profession profession;



    @Enumerated(EnumType.STRING)
    private Campaign campaign;

    private String position;
    private String urlPosition;

    @Column(name = "`condition`")
    private String condition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skill_id")
    private Skill eliteSkill;



}
