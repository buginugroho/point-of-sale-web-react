package com.prad.pointofsale.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddTransactionDetailsRequest {
    
    // private Long transaction_id; ??
    private Long product_id;
    private Long quantity;
    private Long subtotal;
}
