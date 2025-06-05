package com.flickzy.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class MoMoPaymentRequest {
    private String amount;
    private String paymentinfo;
    private BookingRequestDTO extraData;     public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
    public String getPaymentinfo() {
        return paymentinfo;
    }
    public void setPaymentinfo(String paymentinfo) {
        this.paymentinfo = paymentinfo;
    }
    public BookingRequestDTO getExtraData() {
        return extraData;
    }
    public void setExtraData(BookingRequestDTO extraData) {
        this.extraData = extraData;
    }
}