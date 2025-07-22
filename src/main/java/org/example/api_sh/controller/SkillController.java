package org.example.api_sh.controller;

import org.example.api_sh.entity.Skill;
import org.example.api_sh.service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {
    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }


    // CREATE
    @PostMapping
    public Skill save(@RequestBody Skill skill) {
        return skillService.createSkill(skill);
    }

    //READ 1

    @GetMapping("/{id}")
    public Skill get(@PathVariable Integer id) {
        return skillService.readSkill(id);
    }

    //READ ALL

    @GetMapping
    public List<Skill> getAll() {
        return skillService.readSkills();
    }

    //UPDATE

    @PutMapping("/{id}")
    public Skill update(@PathVariable Integer id, @RequestBody Skill skill) {
        return skillService.updateSkill(id, skill);
    }

    //DELETE

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        skillService.deleteSkill(id);
    }


}
