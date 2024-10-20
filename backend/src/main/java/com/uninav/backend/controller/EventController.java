package com.uninav.backend.controller;

import com.uninav.backend.model.Event;
import com.uninav.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping("/get-all-events")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
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
    public ResponseEntity<Map<String, Object>> getRsvpCount(@RequestBody Map<String, Object> eventData) {
        try {
            Optional<Event> event = eventService.getEventById(eventData.get("id").toString());
            Map<String, Object> response = new HashMap<>();
            response.put("yes", event.get().getAttendees());
            response.put("no", event.get().getDeclinedAttendees());
            response.put("maybe", event.get().getMaybeAttendees());
            response.put("status", "success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/delete-event")
    public ResponseEntity<Map<String, Object>> deleteEvent(@RequestBody Map<String, Object> eventData) {
        try {
            eventService.deleteEvent(eventData.get("id").toString());
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/add-event")
    public ResponseEntity<Map<String, Object>> addEvent(@RequestBody Map<String, Object> eventData) {
        try {

//            eventService.createEvent(eventData);
            Map<String, Object> response = new HashMap<>();
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

    public Event eventDataToEvent(Map<String, Object> eventData) {
       Event event = new Event();
       event.setId(eventData.get("id").toString());
       event.setAddress(eventData.getOrDefault("address", "").toString());
       event.setAttendees(List.of(eventData.getOrDefault("yes", 0).toString()));
       event.setDeclinedAttendees(List.of(eventData.get("no").toString()));
       event.setMaybeAttendees(List.of(eventData.get("maybe").toString()));
       event.setImageUrl(eventData.get("imageUrl").toString());

       return event;
    }

}
