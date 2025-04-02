package com.flickzy.service;

import com.flickzy.entity.CinemaBrand;
import com.flickzy.repository.cinemaBrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class cinemaBrandService {
    @Autowired
    private cinemaBrandRepository cinemaBrandRepository;

    public List<CinemaBrand> getAllCinemaBrands() {
        return cinemaBrandRepository.findAll();
    }

    public Optional<CinemaBrand> getCinemaBrandById(UUID id) {
        return cinemaBrandRepository.findById(id);
    }

    public CinemaBrand createCinemaBrand(CinemaBrand cinemaBrand) {
        return cinemaBrandRepository.save(cinemaBrand);
    }

    public CinemaBrand updateCinemaBrand(UUID id, CinemaBrand cinemaBrand) {
        return cinemaBrandRepository.findById(id).map(existingBrand -> {
            existingBrand.setBrandName(cinemaBrand.getBrandName());
            existingBrand.setAvatar(cinemaBrand.getAvatar());
            existingBrand.setCover(cinemaBrand.getCover());
            existingBrand.setDescription(cinemaBrand.getDescription());
            return cinemaBrandRepository.save(existingBrand);
        }).orElseThrow(() -> new RuntimeException("CinemaBrand not found"));
    }

    public void deleteCinemaBrand(UUID id) {
        cinemaBrandRepository.deleteById(id);
    }
}
