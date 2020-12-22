package com.cyberone.ctis.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import com.cyberone.ctis.user.vo.Role;

@Component
@Mapper
public interface RoleMapper {
    Role getRoleInfo(@Param("role") String role);
}
