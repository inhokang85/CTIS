package com.cyberone.ctis.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import com.cyberone.ctis.user.vo.UserRole;

@Component
@Mapper
public interface UserRoleMapper {

    void setUserRoleInfo(@Param("param") UserRole param);
}
