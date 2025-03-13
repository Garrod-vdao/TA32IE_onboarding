package com.example.demo.service.impl;

import com.example.demo.model.dto.UVIndexResponse;
import com.example.demo.service.UVService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UVServiceImpl implements UVService {

    private final RestTemplate restTemplate;

    public UVServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public UVIndexResponse getCurrentUV(Double latitude, Double longitude) {
        String url = String.format(
                "https://currentuvindex.com/api/v1/uvi?latitude=%f&longitude=%f",
                latitude, longitude
        );
        try {
            return restTemplate.getForObject(url, UVIndexResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch UV data: " + e.getMessage());
        }
    }
}