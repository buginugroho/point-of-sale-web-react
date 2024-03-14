package com.prad.pointofsale.model.response;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyHttpResponse<T> {
    
    private HttpStatus status;
    private String message;
    private T data;
}
