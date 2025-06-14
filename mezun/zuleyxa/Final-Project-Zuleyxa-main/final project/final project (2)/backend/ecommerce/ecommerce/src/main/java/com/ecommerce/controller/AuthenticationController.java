package com.ecommerce.controller;

import com.ecommerce.dto.Request.AuthenticationRequest;
import com.ecommerce.dto.Request.RegisterRequest;
import com.ecommerce.dto.Response.AuthenticationResponse;
import com.ecommerce.service.AuthenticationService;
import com.ecommerce.service.JwtService;
import com.ecommerce.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService service;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request, HttpServletRequest httpRequest) {
        log.info("Method called: register | HTTP Method: {}", httpRequest.getMethod());
        AuthenticationResponse response = service.register(request);
        log.info("Method completed: register");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request, HttpServletRequest httpRequest) {
        log.info("Method called: authenticate | HTTP Method: {}", httpRequest.getMethod());
        AuthenticationResponse response = service.authenticate(request);
        log.info("Method completed: authenticate");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        log.info("Method called: refreshToken | HTTP Method: {}", request.getMethod());
        service.refreshToken(request, response);
        log.info("Method completed: refreshToken");
    }

}
