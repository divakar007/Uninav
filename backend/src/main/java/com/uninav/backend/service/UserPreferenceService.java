package com.uninav.backend.service;

import com.uninav.backend.model.UserPreferences;
import com.uninav.backend.repository.UserPreferencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPreferenceService  {

    @Autowired
    UserPreferencesRepository userPreferencesRepository;

    public UserPreferences getUserPreferences(String userId) {
        return userPreferencesRepository.findByUserId(userId);
    }

    public UserPreferences setUserPreferences(UserPreferences userPreferences) {
        return userPreferencesRepository.save(userPreferences);
    }
}
