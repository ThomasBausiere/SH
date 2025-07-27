package org.example.api_sh.entity.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import org.example.api_sh.util.SmartEnumConverter;

public enum Campaign {
    PROPHECIES, FACTIONS, NIGHTFALL, CORE, GWEN;


    @JsonCreator
    public static Campaign fromJson(String value) {
        return SmartEnumConverter.smartMatch(Campaign.class, value);
    }
}
