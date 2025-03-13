package com.example.demo.model.dto;


public class UVIndexResponse {
    private double latitude;
    private double longitude;
    private Now now;

    public UVIndexResponse() {}

    public Now getNow() {
        return now;
    }

    public void setNow(Now now) {
        this.now = now;
    }
    public static class Now {
        private String time;
        private Double uvi;

        public Now() {
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }

        public Double getUvi() {
            return uvi;
        }

        public void setUvi(Double uvi) {
            this.uvi = uvi;
        }
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}