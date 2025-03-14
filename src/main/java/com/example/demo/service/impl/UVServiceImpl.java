package com.example.demo.service.impl;

import com.example.demo.model.dto.UVCurrentIndexResponse;
import com.example.demo.model.dto.UVForecastIndexResponse;
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
    private static final String FORECAST_API_URL = "http://api.weatherapi.com/v1/forecast.json";

    public UVServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public UVCurrentIndexResponse getCurrentUV(String location) throws Exception {
        try {
            String url = String.format("%s?key=%s&q=%s&aqi=no",
                    WEATHER_API_URL,
                    WEATHER_API_KEY,
                    location);

            ResponseEntity<UVCurrentIndexResponse> response = restTemplate.getForEntity(
                    url,
                    UVCurrentIndexResponse.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody();
            }

            throw new RuntimeException("Failed to fetch weather data");
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch UV data: " + e.getMessage());
        }
    }

    @Override
    public UVForecastIndexResponse getForecastUV(String location, int day) throws Exception {
        try {
            String url = String.format("%s?key=%s&q=%s&days=%d&aqi=no&alerts=no",
                    FORECAST_API_URL,
                    WEATHER_API_KEY,
                    location,
                    day
            );
            ResponseEntity<UVForecastIndexResponse> response = restTemplate.getForEntity(
                    url,
                    UVForecastIndexResponse.class
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