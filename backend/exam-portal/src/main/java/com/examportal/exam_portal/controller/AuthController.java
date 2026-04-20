package com.examportal.exam_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.exam_portal.entity.User;
import com.examportal.exam_portal.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // ✅ REGISTER USER
    @PostMapping("/register")
    public String register(@RequestBody User user) {

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "User already exists";
        }

        // Save new user
        userRepository.save(user);

        return "User registered successfully";
    }

    // ✅ LOGIN USER
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);

        // Check if user exists
        if (existingUser == null) {
            return "User not found";
        }

        // Check password
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password";
        }

        return "Login successful";
    }
}
