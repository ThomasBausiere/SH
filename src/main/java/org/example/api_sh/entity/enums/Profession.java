package org.example.api_sh.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.example.api_sh.util.SmartEnumConverter;

public enum Profession {
    WARRIOR, RANGER, MONK, NECROMANCER, MESMER, ELEMENTALIST, RITUALIST, ASSASSIN, DERVISH, PARAGON, COMMON;

    @JsonCreator
    public static Profession fromJson(String value) {
        return SmartEnumConverter.smartMatch(Profession.class, value);
    }
}
