package com.cyberone.ctis.user.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.cyberone.ctis.user.model.UserPrincipal;
import com.cyberone.ctis.user.service.UserService;
import com.cyberone.ctis.user.vo.User;

@Controller
public class UserController {

    @Autowired 
    private UserService userService; 
    
    @GetMapping(value = {"/", "login"}) 
    public ModelAndView getLoginPage() { 
        ModelAndView modelAndView = new ModelAndView(); 
        
        modelAndView.setViewName("user/login"); 
        return modelAndView; 
    } 
    
    @GetMapping("registration") 
    public ModelAndView getRegistrationPage() { 
        ModelAndView modelAndView = new ModelAndView(); 
        
        User user = new User(); 
        modelAndView.addObject("user", user); 
        modelAndView.setViewName("user/registration"); 
        return modelAndView; 
        } 
    
    @PostMapping("registration") 
    public ModelAndView createNewUser(@Valid User user, BindingResult bindingResult) { 
        ModelAndView modelAndView = new ModelAndView(); 
        User userExists = userService.findUserByLoginId(user.getLoginId()); 
        if (userExists != null) { 
            bindingResult .rejectValue("loginId", "error.loginId", "이미 등록 된 사용자가 있습니다."); 
        } 
        if (bindingResult.hasErrors()) { 
            modelAndView.setViewName("user/registration"); 
        } 
        else { 
            userService.saveUser(user); 
            modelAndView.addObject("successMessage", "유저 등록 되었습니다."); 
            modelAndView.addObject("user", new User()); modelAndView.setViewName("user/registration"); 
        } 
        return modelAndView; 
     } 
    @GetMapping("home") public ModelAndView home(){ 
        ModelAndView modelAndView = new ModelAndView(); 
        Authentication auth = SecurityContextHolder.getContext().getAuthentication(); 
        UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal(); 
        System.out.println(userPrincipal.toString()); 
        modelAndView.addObject("userName", "Welcome " + userPrincipal.getName() + " (" + userPrincipal.getId() + ")"); 
        modelAndView.addObject("adminMessage","Content Available Only for Users with Admin Role"); 
        modelAndView.setViewName("user/home"); return modelAndView; 
        } 
    
    @GetMapping("exception") 
    public ModelAndView getUserPermissionExceptionPage() { 
        ModelAndView mv = new ModelAndView(); 
        mv.setViewName("user/access-denied"); 
        return mv; 
        }
}
