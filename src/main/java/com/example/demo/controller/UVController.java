package com.example.demo.controller;

import com.example.demo.model.dto.UVIndexResponse;
import com.example.demo.model.comm.ApiResponseMine;
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
    public ResponseEntity<ApiResponseMine<UVIndexResponse>> getUV(
            @Parameter(description = "lat", example = "40.7128")
            @RequestParam(defaultValue = "40.7128") Double latitude,
            @Parameter(description = "lng", example = "-74.0060")
            @RequestParam(defaultValue = "-74.0060") Double longitude
    ) {
        try {
            if (latitude < -90 || latitude > 90) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponseMine<>(400, "Latitude must be between -90 and 90 degrees", null));
            }

            if (longitude < -180 || longitude > 180) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponseMine<>(400, "Longitude must be between -180 and 180 degrees", null));
            }

            UVIndexResponse response = uvService.getCurrentUV(latitude, longitude);
            return ResponseEntity.ok(new ApiResponseMine<>(200, "Success", response));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseMine<>(500, e.getMessage(), null));
        }
    }
}