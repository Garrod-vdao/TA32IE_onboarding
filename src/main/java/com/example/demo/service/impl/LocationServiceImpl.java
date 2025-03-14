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
import org.json.JSONArray;
import org.json.JSONObject;

public class LocationServiceImpl implements LocationService {
    private static final String GoogleLocationApi = "";

    @Override
    public String getLocation (String location) throws Exception{
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpGet httpget = new HttpGet(GoogleLocationApi + location);
        return httpclient.execute(httpget, httpResponse -> {
            int statusCode = httpResponse.getStatusLine().getStatusCode();
            if (statusCode >= 200 && statusCode < 300) {
                return EntityUtils.toString(httpResponse.getEntity());
            } else {
                try {
                    throw new Exception("Unexpected response status: " + statusCode);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        } );
    }
}
