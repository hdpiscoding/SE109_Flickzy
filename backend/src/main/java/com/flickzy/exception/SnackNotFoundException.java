package com.flickzy.exception;

import java.util.UUID;

/**
 * Exception thrown when a Snack is not found.
 */
public class SnackNotFoundException extends RuntimeException {

    public SnackNotFoundException(UUID id) {
        super("Snack not found with id: " + id);
    }
}