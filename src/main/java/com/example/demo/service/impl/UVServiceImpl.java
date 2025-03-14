package com.example.demo.service.impl;

import com.example.demo.model.dto.UVIndexResponse;
import com.example.demo.service.UVService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UVServiceImpl implements UVService {

    private final RestTemplate restTemplate;
    private static final String WEATHER_API_KEY = "0e5b56bbd20e48739e930026251403";
    private static final String WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json";

    public UVServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public UVIndexResponse getCurrentUV(String location) throws Exception {
        try {
            String url = String.format("%s?key=%s&q=%s&aqi=no",
                    WEATHER_API_URL,
                    WEATHER_API_KEY,
                    location);

            ResponseEntity<UVIndexResponse> response = restTemplate.getForEntity(
                    url,
                    UVIndexResponse.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody();
            }

            throw new RuntimeException("Failed to fetch weather data");
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch UV data: " + e.getMessage());
        }
    }
}