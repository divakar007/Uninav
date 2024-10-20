package com.uninav.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Getter
@Setter
@Document(collection = "notifications")
public class Notification {
    @Id
    private String id;
    private String userId;
    private String eventId;
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime sentAt;

}
