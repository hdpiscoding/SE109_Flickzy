package com.flickzy.controller;

import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.flickzy.repository.UserRepository;
import com.flickzy.service.interfaces.BookingService;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.*;
import lombok.RequiredArgsConstructor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flickzy.base.BaseController;
import com.flickzy.dto.BookingRequestDTO;
import com.flickzy.dto.BookingResponseDTO;
import com.flickzy.dto.MoMoPaymentRequest;
import com.flickzy.entity.Users;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
public class PaymentController extends BaseController {
        private final BookingService bookingService;

    private final UserRepository userRepository;

  

    @PostMapping("/momo")
    public ResponseEntity<?> createMoMoPayment(@RequestBody MoMoPaymentRequest paymentRequest) {
        try {
            String amount = paymentRequest.getAmount();
            String endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
            String partnerCode = "MOMO";
            String accessKey = "F8BBA842ECF85";
            String secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
            String orderInfo = paymentRequest.getPaymentinfo();
            String redirectUrl = "https://momo.vn/return";
            String ipnUrl = "https://eff6-14-169-74-244.ngrok-free.app/api/v1/payment/callback";
            String requestType = "captureWallet";
            String extraData =  new ObjectMapper().writeValueAsString(paymentRequest.getExtraData());
            String requestId = partnerCode + System.currentTimeMillis();
            String orderId = requestId;
    
            String rawSignature = "accessKey=" + accessKey +
                    "&amount=" + amount +
                    "&extraData=" + extraData +
                    "&ipnUrl=" + ipnUrl +
                    "&orderId=" + orderId +
                    "&orderInfo=" + orderInfo +
                    "&partnerCode=" + partnerCode +
                    "&redirectUrl=" + redirectUrl +
                    "&requestId=" + requestId +
                    "&requestType=" + requestType;
    
            String signature = hmacSHA256(rawSignature, secretKey);
    
            Map<String, String> requestBody = new LinkedHashMap<>();
            requestBody.put("partnerCode", partnerCode);
            requestBody.put("accessKey", accessKey);
            requestBody.put("requestId", requestId);
            requestBody.put("amount", amount);
            requestBody.put("orderId", orderId);
            requestBody.put("orderInfo", orderInfo);
            requestBody.put("redirectUrl", redirectUrl);
            requestBody.put("ipnUrl", ipnUrl);
            requestBody.put("extraData", extraData);
            requestBody.put("requestType", requestType);
            requestBody.put("signature", signature);
            requestBody.put("lang", "en");
    
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
    
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
            RestTemplate restTemplate = new RestTemplate();
    
            ResponseEntity<String> response = restTemplate.postForEntity(endpoint, entity, String.class);
    
            return ResponseEntity.ok(response.getBody());
    
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("MoMo Payment Error: " + e.getMessage());
        }
    }
    private String hmacSHA256(String data, String secretKey) throws Exception {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        byte[] hash = sha256_HMAC.doFinal(data.getBytes("UTF-8"));
        StringBuilder sb = new StringBuilder(2 * hash.length);
        for (byte b : hash) {
            sb.append(String.format("%02x", b & 0xff));
        }
        return sb.toString();
    }

    @PostMapping("/callback")
    
    public ResponseEntity<?> momoCallback(@RequestBody Map<String, Object> body, Authentication authentication) {
        System.out.println("MoMo Callback Body: " + body);
    
        try {
            // Lấy extraData từ body (là chuỗi JSON)
            String extraDataJson = (String) body.get("extraData");
            if (extraDataJson == null) {
                return ResponseEntity.badRequest().body("Missing extraData");
            }
    
            // Parse extraData thành BookingRequestDTO
            ObjectMapper mapper = new ObjectMapper();
            BookingRequestDTO bookingRequestDTO = mapper.readValue(extraDataJson, BookingRequestDTO.class);
    
            // Lấy user từ authentication
           
            UUID userId = bookingRequestDTO.getUserId();
            bookingRequestDTO.setMomoID(body.get("orderId").toString());
            // Gọi service giống addBooking
            List<BookingResponseDTO> response = bookingService.addBooking(bookingRequestDTO, userId);
            return buildResponse(response, HttpStatus.CREATED, "Booking(s) added successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Callback error: " + e.getMessage());
        }
    }
}
