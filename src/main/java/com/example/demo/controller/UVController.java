package com.example.demo.controller;
import com.example.demo.model.dto.UVCurrentIndexResponse;
import com.example.demo.model.comm.ApiResponseMine;
import com.example.demo.model.dto.UVForecastIndexResponse;
import com.example.demo.service.UVService;
import com.example.demo.util.InputValidator; // Add this import
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
        // Add input validation
        if (!InputValidator.isValidCityName(location)) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponseMine<>(400, "Invalid location format. Only letters, spaces, and basic punctuation are allowed.", null));
        }
        
        // Sanitize input
        String sanitizedLocation = InputValidator.sanitize(location);
        
        try {
            // Use sanitized location instead of raw input
            UVCurrentIndexResponse response = uvService.getCurrentUV(sanitizedLocation);
            return ResponseEntity.ok(new ApiResponseMine<>(200, "Success", response));
        } catch (Exception e) {
            // Don't expose detailed error messages
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseMine<>(500, "Failed to retrieve UV data", null));
        }
    }
    
    @GetMapping("/forecast")
    public ResponseEntity<ApiResponseMine<UVForecastIndexResponse>> getForecastUV(
            @Parameter(description = "location", example = "Beijing")
            @RequestParam(defaultValue = "Beijing") String location,
            @Parameter(description = "forecast day length", example = "1")
            @RequestParam(defaultValue = "1") int day
    ) {
        // Add input validation for location
        if (!InputValidator.isValidCityName(location)) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponseMine<>(400, "Invalid location format. Only letters, spaces, and basic punctuation are allowed.", null));
        }
        
        // Validate day parameter
        if (day < 0 || day > 10) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponseMine<>(400, "Day parameter must be between 0 and 10", null));
        }
        
        // Sanitize input
        String sanitizedLocation = InputValidator.sanitize(location);
        
        try {
            // Use sanitized location
            UVForecastIndexResponse response = uvService.getForecastUV(sanitizedLocation, day);
            return ResponseEntity.ok(new ApiResponseMine<>(200, "Success", response));
        } catch (Exception e) {
            // Don't expose detailed error messages
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseMine<>(500, "Failed to retrieve UV forecast data", null));
        }
    }
}
