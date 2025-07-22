package org.example.api_sh.service;

import org.example.api_sh.entity.Skill;
import org.example.api_sh.exeception.NotFoundException;
import org.example.api_sh.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    //CREATE SKILL

    public Skill createSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    //READ BY ID

    public Skill readSkill(Integer id) {
        return skillRepository.findById(id).get();
    }

    //READ ALL
    public List<Skill> readSkills() {
        return skillRepository.findAll();
    }

    //UPDATE BY ID

    public Skill updateSkill(Integer id, Skill skill) {
        Skill skillfound = skillRepository.findById(id).orElseThrow(NotFoundException::new);
        skillfound.setName(skill.getName());
        skillfound.setDescription(skill.getDescription());
        skillfound.setProfession(skill.getProfession());
        skillfound.setAttribute(skill.getAttribute());

        return skillRepository.save(skillfound);

    }

    //DELETE BY ID
    public void deleteSkill(Integer id) {
        skillRepository.deleteById(id);
    }
}
