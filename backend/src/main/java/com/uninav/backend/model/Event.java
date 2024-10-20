package com.uninav.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Document(collection = "events")
public class Event {
    @Id
    private String id;
    private String name;
    private String description;
    private String categoryId; //
    private String organizerId; // Reference to the User
    private String what3wordsAddress; // Storing What3Words address as a string
    private String address; // Optional: human-readable address
    private LocalDateTime date;
    private List<String> attendees; // List of User IDs who RSVPed "Yes"
    private List<String> maybeAttendees; // List of User IDs who RSVPed "Maybe"
    private List<String> declinedAttendees; // List of User IDs who RSVPed "No"
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String type; // Type;{Private, Group, Public}
}
