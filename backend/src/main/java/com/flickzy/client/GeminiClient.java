package com.flickzy.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class GeminiClient {
    private static final Logger logger = LoggerFactory.getLogger(GeminiClient.class);
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    public String generateSummary(String prompt) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            // URL với API key
            String urlWithKey = apiUrl + "?key=" + apiKey;
            HttpPost request = new HttpPost(urlWithKey);
            request.setHeader("Content-Type", "application/json");

            // Tạo request body theo format của Gemini API
            Map<String, Object> body = new HashMap<>();
            
            // Contents array
            List<Map<String, Object>> contents = new ArrayList<>();
            Map<String, Object> content = new HashMap<>();
            
            List<Map<String, String>> parts = new ArrayList<>();
            Map<String, String> part = new HashMap<>();
            part.put("text", prompt);
            parts.add(part);
            
            content.put("parts", parts);
            contents.add(content);
            body.put("contents", contents);
            
            // Generation config
            Map<String, Object> generationConfig = new HashMap<>();
            generationConfig.put("temperature", 0.7);
            generationConfig.put("maxOutputTokens", 300);
            body.put("generationConfig", generationConfig);

            String jsonBody = objectMapper.writeValueAsString(body);
            logger.debug("Request body: {}", jsonBody);
            request.setEntity(new StringEntity(jsonBody, ContentType.APPLICATION_JSON));

            String responseBody = httpClient.execute(request, response -> {
                int statusCode = response.getCode();
                logger.debug("Response status: {}", statusCode);
                
                try (BufferedReader reader = new BufferedReader(
                        new InputStreamReader(response.getEntity().getContent()))) {
                    String body1 = reader.lines().collect(Collectors.joining());
                    logger.debug("Response body: {}", body1);
                    return body1;
                }
            });

            // Parse response theo format của Gemini API
            Map<String, Object> responseMap = objectMapper.readValue(responseBody, Map.class);
            
            // Kiểm tra error
            if (responseMap.containsKey("error")) {
                Map<String, Object> error = (Map<String, Object>) responseMap.get("error");
                String errorMessage = error.get("message").toString();
                logger.error("Gemini API error: {}", errorMessage);
                throw new RuntimeException("Gemini API error: " + errorMessage);
            }
            
            // Lấy content từ response
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseMap.get("candidates");
            if (candidates == null || candidates.isEmpty()) {
                throw new RuntimeException("No candidates returned from Gemini API");
            }
            
            Map<String, Object> candidate = candidates.get(0);
            Map<String, Object> contentObj = (Map<String, Object>) candidate.get("content");
            List<Map<String, Object>> partsObj = (List<Map<String, Object>>) contentObj.get("parts");
            
            if (partsObj == null || partsObj.isEmpty()) {
                throw new RuntimeException("No parts returned from Gemini API");
            }
            
            return partsObj.get(0).get("text").toString().trim();

        } catch (Exception e) {
            logger.error("Error calling Gemini API: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to generate summary from Gemini API: " + e.getMessage());
        }
    }
}