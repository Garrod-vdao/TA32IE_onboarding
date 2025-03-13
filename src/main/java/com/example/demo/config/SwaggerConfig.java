package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI()
                .openapi("3.0.0")
                .info(new Info()
                        .title("UV Index API")
                        .description("UV Index API")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("Xiran Wang")
                                .email("wangxxrrrr@gmail.com")));
    }
}