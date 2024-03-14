package com.prad.pointofsale.model.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddTransactionsRequest {
    
    private Long total_amount;
    private Long total_pay;
    //private Date transactionDate; ??
    private List<AddTransactionDetailsRequest> transaction_details;
}
