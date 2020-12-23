package com.cyberone.ctis.Interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class HttpInterceptor extends HandlerInterceptorAdapter{
    
    private static final Logger logger = LoggerFactory.getLogger(HttpInterceptor.class);


    // 맵핑되기 전 처리 
    @Override 
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) { 
        logger.debug("===============================================");
        logger.debug("==================== BEGIN ====================");
        logger.debug("Request URI ===> " + request.getRequestURI());
        return true;
    }

    // 맵핑 되고난 후 처리
    @Override
    public void postHandle( HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) {
        logger.debug("==================== END ======================");
        logger.debug("===============================================");
    }

    // 모든 작업이 완료된 후 실행된다.
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) { 
        logger.info("================ Method Completed");
    }

}
