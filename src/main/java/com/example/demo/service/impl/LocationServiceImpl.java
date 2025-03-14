package com.example.demo.service.impl;

import com.example.demo.service.LocationService;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

public class LocationServiceImpl implements LocationService {
    private static final String GoogleLocationApi = "";

    @Override
    public String getLocation (String location) throws Exception{
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(GoogleLocationApi + location);

        String response = httpClient.execute(httpGet, httpResponse -> {
            int status = httpResponse.getStatusLine().getStatusCode();
            if (status >= 200 && status < 300) {
                return EntityUtils.toString(httpResponse.getEntity());
            } else {
                try {
                    throw new Exception("Unexpected response status: " + status);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        });
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(response);
        JsonNode results = rootNode.get("results");
        if (results != null && results.isArray() && !results.isEmpty()) {
            JsonNode result = results.get(0);
            JsonNode locations = result.path("geometry").path("location");

            double lat = locations.get("lat").asDouble();
            double lng = locations.get("lng").asDouble();
            return lat + "," + lng;
        }
        return "";
    }
}
