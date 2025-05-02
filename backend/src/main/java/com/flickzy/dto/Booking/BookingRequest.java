package com.flickzy.dto.Booking;

import java.util.UUID;

public class BookingRequest {
    private UUID user;
    private UUID schedule;
    private UUID seat;
    private Double price;
    private Integer seatStatus;

    // Getters and Setters
    public UUID getUser() {
        return user;
    }

    public void setUser(UUID user) {
        this.user = user;
    }

    public UUID getSchedule() {
        return schedule;
    }

    public void setSchedule(UUID schedule) {
        this.schedule = schedule;
    }

    public UUID getSeat() {
        return seat;
    }

    public void setSeat(UUID seat) {
        this.seat = seat;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getSeatStatus() {
        return seatStatus;
    }

    public void setSeatStatus(Integer seatStatus) {
        this.seatStatus = seatStatus;
    }
}