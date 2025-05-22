package com.flickzy.exception;

import java.util.UUID;

/**
 * Exception thrown when a Room is not found.
 */
public class RoomNotFoundException extends RuntimeException {

    public RoomNotFoundException(UUID id) {
        super("Room not found with id: " + id);
    }
}