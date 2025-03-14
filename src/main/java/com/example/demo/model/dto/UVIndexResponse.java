package com.example.demo.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UVIndexResponse {
    private Location location;
    private Current current;

    @Data
    @NoArgsConstructor
    public static class Location {
        private String name;
        private double lat;
        private double lon;
    }

    @Data
    @NoArgsConstructor
    public static class Current {
        @JsonProperty("last_updated")
        private String lastUpdated;
        private double uv;
    }
}