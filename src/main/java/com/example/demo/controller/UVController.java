package com.example.demo.controller;

import com.example.demo.model.dto.UVCurrentIndexResponse;
import com.example.demo.model.comm.ApiResponseMine;
import com.example.demo.model.dto.UVForecastIndexResponse;
import com.example.demo.service.UVService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/uv-indices")
@Tag(name = "UV Index API", description = "UV interface")
@CrossOrigin
public class UVController {

    private final UVService uvService;

    public UVController(UVService uvService) {
        this.uvService = uvService;
    }

    @Operation(summary = "Get UV index", description = "Based on lat & lng")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Success"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Invalid parameters"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Server error"
            )
    })
    @GetMapping("/current")
    public ResponseEntity<ApiResponseMine<UVCurrentIndexResponse>> getCurrentUV(
            @Parameter(description = "location", example = "Beijing")
            @RequestParam(defaultValue = "Beijing") String location
    ) {
        try {
            UVCurrentIndexResponse response = uvService.getCurrentUV(location);
            return ResponseEntity.ok(new ApiResponseMine<>(200, "Success", response));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseMine<>(500, e.getMessage(), null));
        }
    }

    @GetMapping("/forecast")
    public ResponseEntity<ApiResponseMine<UVForecastIndexResponse>> getForecastUV(
            @Parameter(description = "location", example = "Beijing")
            @RequestParam(defaultValue = "Beijing") String location,
            @Parameter(description = "forecast day length", example = "1")
            @RequestParam(defaultValue = "1") int day
    ) {
        try {
            UVForecastIndexResponse response = uvService.getForecastUV(location, day);
            return ResponseEntity.ok(new ApiResponseMine<>(200, "Success", response));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseMine<>(500, e.getMessage(), null));
        }
    }


}