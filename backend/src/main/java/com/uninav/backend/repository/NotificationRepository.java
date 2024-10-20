package com.uninav.backend.repository;

import com.uninav.backend.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUserId(String userId);  // Method to get notifications for a specific user
    List<Notification> findByEventId(String eventId);  // Method to get notifications related to a specific event
    List<Notification> findByUserIdAndRead(String userId, boolean b);
}

