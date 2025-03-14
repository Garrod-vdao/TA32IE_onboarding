package com.example.demo.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UVForecastIndexResponse {
    private Location location;
    private Current current;
    private Forecast forecast;

    @Data
    @NoArgsConstructor
    public static class Location {
        private String name;
        private String region;
        private String country;
        private double lat;
        private double lon;
        private String tz_id;
        private long localtime_epoch;
        private String localtime;
    }

    @Data
    @NoArgsConstructor
    public static class Current {
        private String last_updated;
        private Condition condition;
        private double uv;
    }

    @Data
    @NoArgsConstructor
    public static class Forecast {
        private List<ForecastDay> forecastday;
    }

    @Data
    @NoArgsConstructor
    public static class ForecastDay {
        private String date;
        private Day day;
        private List<Hour> hour;
    }

    @Data
    @NoArgsConstructor
    public static class Day {
        private Condition condition;
        private double uv;
    }

    @Data
    @NoArgsConstructor
    public static class Hour {
        private String time;
        private Condition condition;
        private double uv;
    }

    @Data
    @NoArgsConstructor
    public static class Condition {
        private String text;
        private String icon;
        private int code;
    }
}