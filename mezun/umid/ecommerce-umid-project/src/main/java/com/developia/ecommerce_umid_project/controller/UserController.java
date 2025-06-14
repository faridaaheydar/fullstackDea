package com.developia.ecommerce_umid_project.controller;


import com.developia.ecommerce_umid_project.dto.Response;
import com.developia.ecommerce_umid_project.dto.UserDto;
import com.developia.ecommerce_umid_project.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping("/get-all")

    public ResponseEntity<Response> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/my-info")
    public ResponseEntity<UserDto> getUserInfo(){
        return ResponseEntity.ok(userService.getCurrentUserInfo());
    }
}
