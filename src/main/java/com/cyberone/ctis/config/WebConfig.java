package com.cyberone.ctis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.cyberone.ctis.Interceptor.HttpInterceptor;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer{

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HttpInterceptor())
        .excludePathPatterns("/css/**", "/fonts/**", "/plugin/**", "/scripts/**");
    }

    @Override 
    public void addResourceHandlers(ResourceHandlerRegistry registry) { 
        registry.addResourceHandler("/css/**").addResourceLocations("/css/"); 
        registry.addResourceHandler("/js/**").addResourceLocations("/js/"); 
        registry.addResourceHandler("/img/**").addResourceLocations("/img/"); 
    } 
    
    @Bean 
    public BCryptPasswordEncoder passwordEncoder() { 
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(); 
        return bCryptPasswordEncoder; 
    }

   
}
