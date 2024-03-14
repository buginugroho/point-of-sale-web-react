package com.prad.pointofsale.model.response;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionsResponse {
    
    private Long id;
    private Date transaction_date;
    private Long total_pay;
    private Long total_amount;
    private List<TransactionDetailsResponse> transaction_details;
}
