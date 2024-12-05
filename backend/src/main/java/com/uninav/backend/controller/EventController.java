package com.uninav.backend.controller;

import com.uninav.backend.model.Event;
import com.uninav.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    private EventService eventService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserPreferenceService userPreferenceService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private UserService userService;

    @GetMapping("/get-all-events")
    public ResponseEntity<List<Event>> getAllEvents() {
        try{
            return new ResponseEntity<>(eventService.getAllEvents(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/get-events-by-type")
    public ResponseEntity<Map<String, Object>> getEventsByType(@RequestParam("type") String type) {
        try {
            List<Event> events = eventService.getEventsIsType(type);
            Map<String, Object> response = new HashMap<>();
            response.put("events", events);
            response.put("status", "success");

            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/get-rsvp-count")
    public ResponseEntity<Map<String, Object>> getRsvpCount(@RequestBody Event eventData) {
        try {
            Map<String, Object> response = new HashMap<>();
            response.put("yes", eventData.getAttendees());
            response.put("no", eventData.getDeclinedAttendees());
            response.put("maybe", eventData.getMaybeAttendees());
            response.put("status", "success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/delete-event")
    public ResponseEntity<Map<String, Object>> deleteEvent(@RequestBody Event eventData) {
        try {
            eventService.deleteEvent(eventData.getId());
            Map<String, Object> response = new HashMap<>();

            response.put("status", "success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PostMapping("/create-event")
    public ResponseEntity<Map<String, Object>> addEvent(@RequestBody Event eventData) {
        try {
            eventData.setId(null);
            eventService.createEvent(eventData);
            Map<String, Object> response = new HashMap<>();
            List<String> categorySubscribers = new ArrayList<>(userPreferenceService.getCategorySubscribers(eventData.getCategoryId()));
            emailService.sendEventCreationNotifications(eventData, categorySubscribers);
            response.put("status", "success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/set-rsvp-count")
    public void setRsvpCount(@RequestBody Map<String, Object> eventData) {

    }

    @GetMapping("/get-event")
    public Event getEvent(@RequestBody Map<String, Object> eventData) {
        return null;
    }

}
