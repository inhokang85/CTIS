package com.cyberone.ctis.user.model;

import org.springframework.security.core.GrantedAuthority;

public class UserGrant implements GrantedAuthority {

    @Override 
    public String getAuthority() { 
        return "ADMIN"; 
    }
}
