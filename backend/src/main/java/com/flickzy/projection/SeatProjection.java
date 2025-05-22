package com.flickzy.projection;

import java.util.UUID;

import com.flickzy.entity.SeatType;

public interface SeatProjection {
    UUID getSeatId();
    String getName(); // Thay bằng các trường bạn muốn trả về
    int getRow();
    Integer getColumnn(); 
    SeatType getSeatTypeId(); // Thay bằng các trường bạn muốn trả về
   // Thay bằng các trường bạn muốn trả về
    // Thêm các getter khác nếu cần
}