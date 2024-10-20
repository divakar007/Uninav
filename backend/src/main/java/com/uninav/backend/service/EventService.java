package com.uninav.backend.service;

import com.uninav.backend.model.Event;
import com.uninav.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(String eventId) {
        return eventRepository.findById(eventId);
    }

    public List<Event> getEventsByCategoryId(String category) {
        return eventRepository.findByCategoryId(category);
    }

    public List<Event> searchEventsByWhat3wordsAddress(String address) {
        return eventRepository.findByWhat3wordsAddressContainingIgnoreCase(address);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    public void deleteEvent(String eventId) {
        eventRepository.deleteById(eventId);
    }

    public List<Event> getEventsIsType(String type){
        return eventRepository.findEventsByType(type);
    }


}
