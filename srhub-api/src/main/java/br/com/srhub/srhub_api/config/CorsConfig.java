package br.com.srhub.srhub_api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// O PORTEIRO: deixa o React (que roda em outra porta) entrar no restaurante.
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")                                   // todas as mesas: /vagas, /cursos...
                .allowedOrigins("http://localhost:5173",              // endereço do React (Vite)
                        "http://localhost:3000")              // outro endereço comum do React
                .allowedMethods("GET", "POST", "PUT", "DELETE");   // os 4 pedidos do CRUD
    }   // <- aqui FECHA o método

}   // <- aqui FECHA a classe