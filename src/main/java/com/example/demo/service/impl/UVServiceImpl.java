package com.example.demo.service.impl;

import com.example.demo.exception.LocationException;
import com.example.demo.model.dto.UVCurrentIndexResponse;
import com.example.demo.model.dto.UVForecastIndexResponse;
import com.example.demo.repository.AusLocationRepository;
import com.example.demo.service.UVService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UVServiceImpl implements UVService {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private AusLocationRepository ausLocationRepository;
    private static final String WEATHER_API_KEY = "0e5b56bbd20e48739e930026251403";
    private static final String WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json";
    private static final String FORECAST_API_URL = "http://api.weatherapi.com/v1/forecast.json";

    // public UVServiceImpl(RestTemplate restTemplate, AusLocationRepository ausLocationRepository) {
    //     this.restTemplate = restTemplate;
    //     this.ausLocationRepository = ausLocationRepository;
    // }

    private boolean isLocatedInAus(double latitude, double longitude) {
        return ausLocationRepository.existsByCoordinates(
                latitude,
                longitude
        ) > 0;
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
                double lat = response.getBody().getLocation().getLat();
                double lon = response.getBody().getLocation().getLon();
                if (!isLocatedInAus(lat, lon)) {
                    throw new LocationException("Location not found in Aus.");
                }
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
                double lat = response.getBody().getLocation().getLat();
                double lon = response.getBody().getLocation().getLon();
                if (!isLocatedInAus(lat, lon)) {
                    throw new LocationException("Location not found in Aus.");
                }
                return response.getBody();
            }
            throw new RuntimeException("Failed to fetch weather data");
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch UV data: " + e.getMessage());
        }
    }
}