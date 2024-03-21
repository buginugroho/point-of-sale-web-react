package com.prad.pointofsale.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDetailsResponse {
    
    private Long id;
    private Long transaction_id;
    private Long product_id;
    private String product_title;
    private Long quantity;
    private Long subtotal;
}
