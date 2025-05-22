package com.flickzy.exception;

import java.util.UUID;

/**
 * Exception thrown when a CinemaBrand is not found.
 */
public class CinemaBrandNotFoundException extends RuntimeException {

    public CinemaBrandNotFoundException(UUID id) {
        super("CinemaBrand not found with id: " + id);
    }
}