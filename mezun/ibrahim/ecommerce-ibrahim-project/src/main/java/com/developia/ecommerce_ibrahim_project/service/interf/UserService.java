package com.developia.ecommerce_ibrahim_project.service.interf;


import com.developia.ecommerce_ibrahim_project.dto.LoginRequest;
import com.developia.ecommerce_ibrahim_project.dto.Response;
import com.developia.ecommerce_ibrahim_project.dto.UserDto;
import com.developia.ecommerce_ibrahim_project.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    UserDto getCurrentUserInfo();


}
