package com.diary.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 모든 경로에 대해 CORS 허용
        registry.addMapping("/**").allowedOrigins("http://localhost:5173").allowCredentials(true).allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
