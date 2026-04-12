package com.app.dto;

public class QrValidationResponseDTO {

    private String result;
    private String message;
    private Long bookingId;

    public QrValidationResponseDTO() {
    }

    public QrValidationResponseDTO(String result, String message, Long bookingId) {
        this.result = result;
        this.message = message;
        this.bookingId = bookingId;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }
}
