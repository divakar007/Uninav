package com.uninav.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Setter
@Getter
@Document(collection = "rsvps")
public class RSVP {
    @Id
    private String id;
    private String userId; // ID of the user who RSVPed
    private String eventId; // ID of the event
    private String status; // RSVP status: "Yes", "No", "Maybe"
    private LocalDateTime rsvpDate; // Date when the RSVP was made
}

