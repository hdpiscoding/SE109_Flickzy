package com.flickzy.exception;

import java.util.UUID;

/**
 * Exception thrown when a Seat is not found.
 */
public class SeatNotFoundException extends RuntimeException {

    public SeatNotFoundException(UUID id) {
        super("Seat not found with id: " + id);
    }
}