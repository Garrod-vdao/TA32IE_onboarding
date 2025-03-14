package com.example.demo.service;

import com.example.demo.model.dto.UVCurrentIndexResponse;
import com.example.demo.model.dto.UVForecastIndexResponse;

public interface UVService {
    UVCurrentIndexResponse getCurrentUV(String location) throws Exception;
    UVForecastIndexResponse getForecastUV(String location, int day) throws Exception;
}