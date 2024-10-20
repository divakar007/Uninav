package com.uninav.backend.controller;

import com.uninav.backend.model.User;
import com.uninav.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/save-user")
    public ResponseEntity<Map<String, Object>> saveUser(@RequestBody Map<String, Object> userData) {
        // Extract user data from the request body
        String userId = (String) userData.get("userId");
        String name = (String) userData.get("name");
        String email = (String) userData.get("email");
        LocalDateTime createdAt = ZonedDateTime.parse((String) userData.get("createdAt")).toLocalDateTime();
        LocalDateTime updatedAt = ZonedDateTime.parse((String) userData.get("updatedAt")).toLocalDateTime();
        String profileImage = (String) userData.get("profileImage");
        String phoneNumber = (String) userData.get("phoneNumber");
        List<String> favorites = (List<String>) userData.get("favorites");
        String role = (String) userData.get("role");


        boolean isNewUser = userService.saveUserIfNew(userId, name, email, createdAt, updatedAt, profileImage, phoneNumber, favorites, role);

        Map<String, Object> response = new HashMap<>();
        if (isNewUser) {
            response.put("message", "New user saved successfully.");
            response.put("status", "success");
        } else {
            response.put("message", "User already exists.");
            response.put("status", "existing");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/delete-user")
    public ResponseEntity<Map<String, Object>> deleteUser(@RequestParam("userId") String userId) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "success");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
