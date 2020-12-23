package com.cyberone.ctis.user.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cyberone.ctis.user.vo.User;

public class UserPrincipal implements UserDetails{
    
    private User user; 
    
    public UserPrincipal(User user) { 
        this.user = user; 
    } 
    
    @Override 
    public Collection<? extends GrantedAuthority> getAuthorities() { 
        return Arrays.asList(new UserGrant()); 
    } 
    
    @Override 
    public String getPassword() { 
        return user.getPassword(); 
    } 
    
    @Override 
    public String getUsername() { 
        return user.getUserName(); 
    } 
    
    @Override 
    public boolean isAccountNonExpired() { 
        return true; 
    } 
    
    @Override 
    public boolean isAccountNonLocked() { 
        return true; 
    } 
    
    @Override 
    public boolean isCredentialsNonExpired() { 
        return true; 
    }
    
    @Override 
    public boolean isEnabled() { 
        return user.getActive() == 1; 
    } 
    
    public String getId() { 
        return user.getLoginId(); 
    } 
    
    public String getName() { 
        return user.getUserName(); 
    }

    
}
