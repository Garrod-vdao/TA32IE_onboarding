package com.example.demo.service;

import com.example.demo.model.dto.UVIndexResponse;

public interface UVService {
    UVIndexResponse getCurrentUV(String location) throws Exception;
}