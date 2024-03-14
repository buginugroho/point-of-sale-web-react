package com.prad.pointofsale.service;

import java.util.List;

//import com.prad.pointofsale.model.request.AddTransactionDetailsRequest;
import com.prad.pointofsale.model.request.AddTransactionsRequest;
import com.prad.pointofsale.model.response.TransactionDetailsResponse;
import com.prad.pointofsale.model.response.TransactionsResponse;

public interface TransactionsService {
    
    public List<TransactionsResponse> getAllTransactions();

    public TransactionsResponse getTransactionById(Long id);

    public List<TransactionDetailsResponse> getTransactionDetailsListByTransactionId(Long id);

    //public void addTransactionDetails(AddTransactionDetailsRequest req);

    public void addTransactions(AddTransactionsRequest req);
}
