package com.flickzy.service;

import com.flickzy.entity.CinemaBrand;
import com.flickzy.entity.Cinemas;
import com.flickzy.repository.CinemasRepository;
import com.flickzy.repository.cinemaBrandRepository; // Sửa lại tên repository cho đúng

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
public class CinemasService {

    @Autowired
    private CinemasRepository cinemasRepository;

    @Autowired
    private cinemaBrandRepository cinemaBrandRepository; // Đảm bảo tên repository đúng

    public List<Cinemas> getAllCinemas() {
        return cinemasRepository.findAll();
    }

    public Cinemas getCinemaById(UUID id) {
        return cinemasRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cinema not found"));
    }

    public Cinemas addNewCinema(UUID brandId, Cinemas cinema) {
        // Tìm CinemaBrand bằng UUID
        CinemaBrand cinemaBrand = cinemaBrandRepository.findById(brandId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Brand not found"));
System.out.println("Cinema Brand: " + cinemaBrand);

        // Thiết lập khóa ngoại (foreign key) cho Cinema
        cinema.setCinemaBrand(cinemaBrand);

        // Lưu Cinema vào cơ sở dữ liệu
        return cinemasRepository.save(cinema);
    }

 public Cinemas editCinema(UUID id, UUID brandId, Cinemas updatedCinema) {
    // Tìm Cinema hiện tại bằng ID
    Cinemas existingCinema = getCinemaById(id);

    // Tìm CinemaBrand mới bằng brandId
    CinemaBrand cinemaBrand = cinemaBrandRepository.findById(brandId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Brand not found"));

    // Cập nhật thông tin Cinema
    existingCinema.setCinemaName(updatedCinema.getCinemaName());
    existingCinema.setCinemaAddress(updatedCinema.getCinemaAddress());
    existingCinema.setProvince(updatedCinema.getProvince());

    // Cập nhật CinemaBrand (foreign key)
    existingCinema.setCinemaBrand(cinemaBrand);

    // Lưu Cinema vào cơ sở dữ liệu
    return cinemasRepository.save(existingCinema);
}
    public void deleteCinema(UUID id) {
        if (!cinemasRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cinema not found");
        }
        cinemasRepository.deleteById(id);
    }
}