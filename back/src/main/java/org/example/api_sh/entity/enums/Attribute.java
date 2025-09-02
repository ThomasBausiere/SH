package org.example.api_sh.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.example.api_sh.util.SmartEnumConverter;

public enum Attribute {
    // Warrior
    STRENGTH,
    SWORDSMANSHIP,
    AXEMANSHIP,
    HAMMER_MASTERY,
    TACTICS,

    // Monk
    DIVINE_FAVOR,
    HEALING_PRAYERS,
    SMITING_PRAYERS,
    PROTECTION_PRAYERS,

    // Ranger
    EXPERTISE,
    WILDERNESS_SURVIVAL,
    MARKSMANSHIP,
    BEAST_MASTERY,

    // Necromancer
    SOUL_REAPING,
    BLOOD_MAGIC,
    DEATH_MAGIC,
    CURSES,

    // Mesmer
    FAST_CASTING,
    DOMINATION_MAGIC,
    ILLUSION_MAGIC,
    INSPIRATION_MAGIC,

    // Elementalist
    ENERGY_STORAGE,
    FIRE_MAGIC,
    WATER_MAGIC,
    AIR_MAGIC,
    EARTH_MAGIC,

    // Assassin (Factions)
    CRITICAL_STRIKES,
    DAGGER_MASTERY,
    SHADOW_ARTS,
    DEADLY_ARTS,

    // Ritualist (Factions)
    COMMUNING,
    RESTORATION_MAGIC,
    CHANNELING_MAGIC,
    SPAWNING_POWER,

    // Dervish (Nightfall)
    MYSTICISM,
    EARTH_PRAYERS,
    WIND_PRAYERS,
    SCYTHE_MASTERY,

    // Paragon (Nightfall)
    LEADERSHIP,
    COMMAND,
    MOTIVATION,
    SPEAR_MASTERY,
    //None
    NO_ATTRIBUTE;


    @JsonCreator
    public static Attribute fromJson(String value) {
        return SmartEnumConverter.smartMatch(Attribute.class, value);
    }
}
