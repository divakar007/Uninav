package com.uninav.backend.controller;

import com.uninav.backend.model.UserPreferences;
import com.uninav.backend.service.UserPreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user-preferences")
public class UserPreferencesController {

    @Autowired
    private UserPreferenceService userPreferenceService;

    @GetMapping("/{userId}")
    public UserPreferences getUserPreferences(@PathVariable("userId") String userId) {
        return userPreferenceService.getUserPreferences(userId);
    }

    @PostMapping("/setPreferences")
    public UserPreferences setUserPreferences(@RequestBody UserPreferences userPreferences) {
        return userPreferenceService.setUserPreferences(userPreferences);
    }
}
