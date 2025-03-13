package com.example.demo.exception;

import com.example.demo.model.comm.ApiResponseMine;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

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
}