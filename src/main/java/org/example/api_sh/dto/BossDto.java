package org.example.api_sh.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BossDto {
    private String name;
    private String profession;
    private String campaign;
    private String position;
    private String condition;
    @JsonProperty("position-url")
    private String urlPosition;
    private String elite_name;
}