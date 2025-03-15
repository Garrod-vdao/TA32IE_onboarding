package com.example.demo.exception;

import com.example.demo.model.comm.ApiResponseMine;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponseMine<?>> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(
                new ApiResponseMine<>(400, e.getMessage(), null)
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseMine<?>> handleGeneralException(Exception e) {
        return ResponseEntity.internalServerError().body(
                new ApiResponseMine<>(500, e.getMessage(), null)
        );
    }

    @ExceptionHandler(LocationException.class)
    public ResponseEntity<Map<String, String>> handleLocationException(LocationException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }


}