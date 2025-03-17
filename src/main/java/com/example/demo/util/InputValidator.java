package com.example.demo.util;

import java.util.regex.Pattern;

public class InputValidator {
    
    private static final Pattern CITY_NAME_PATTERN = Pattern.compile("^[a-zA-Z0-9\\s,.'-]{1,50}$");
    
    /**
     * Validates a city name for safe characters
     */
    public static boolean isValidCityName(String cityName) {
        if (cityName == null || cityName.trim().isEmpty()) {
            return false;
        }
        return CITY_NAME_PATTERN.matcher(cityName).matches();
    }
    
    /**
     * Sanitizes a string input by removing potentially dangerous characters
     */
    public static String sanitize(String input) {
        if (input == null) {
            return "";
        }
        return input.replaceAll("[<>\"'&]", "");
    }
}
