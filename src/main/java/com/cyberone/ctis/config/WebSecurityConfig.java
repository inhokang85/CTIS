package com.cyberone.ctis.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.cyberone.ctis.user.service.UserService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    
    @Autowired 
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Autowired 
    private UserService userService;

    @Bean 
    public DaoAuthenticationProvider authenticationProvider(UserService userService) { 
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(); 
        authenticationProvider.setUserDetailsService(userService); 
        authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder); 
        return authenticationProvider; 
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        //실제 인증을 진행할 Provider
        auth.authenticationProvider(authenticationProvider(userService));
    }
    
    @Override
    public void configure(WebSecurity web) throws Exception {
        //이미지,자바스크립트,css 디렉토리 보안 설정
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**");
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //HTTP 관련 보안 설정 **가장 중요
        http
            .authorizeRequests() 
                .antMatchers("/").permitAll() 
                .antMatchers("/login").permitAll() 
                .antMatchers("/registration").permitAll() 
                .antMatchers("/home").hasAuthority("ADMIN") // ADMIN 권한의 유저만 /home 에 접근가능
            .anyRequest() 
                .authenticated() 
                .and().csrf().disable()
            .formLogin() 
                .loginPage("/login") 
                .failureUrl("/login?error=true") 
                .defaultSuccessUrl("/home") 
                .usernameParameter("loginId") 
                .passwordParameter("password") 
            .and() 
                .logout() 
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) 
            .and() 
                .exceptionHandling() 
                .accessDeniedPage("/access-denied");
    }
}
