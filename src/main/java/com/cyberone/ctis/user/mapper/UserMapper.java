package com.cyberone.ctis.user.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import com.cyberone.ctis.user.vo.User;

@Component
@Mapper
public interface UserMapper {

    User findUserByLoginId(@Param("loginId") String loginId); 
    int setUserInfo(@Param("param") User param);
}
