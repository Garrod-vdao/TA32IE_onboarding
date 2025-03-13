package com.example.demo.service;

import com.example.demo.model.dto.UVIndexResponse;

public interface UVService {
    UVIndexResponse getCurrentUV(Double latitude, Double longitude);
}