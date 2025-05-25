package com.flickzy.exception;

import java.util.UUID;

/**
 * Exception thrown when a SeatType is not found.
 */
public class SeatTypeNotFoundException extends RuntimeException {

    public SeatTypeNotFoundException(UUID id) {
        super("SeatType not found with id: " + id);
    }
}