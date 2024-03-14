package com.prad.pointofsale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prad.pointofsale.model.request.AddTransactionsRequest;
import com.prad.pointofsale.model.response.MyHttpResponse;
import com.prad.pointofsale.model.response.TransactionDetailsResponse;
import com.prad.pointofsale.model.response.TransactionsResponse;
import com.prad.pointofsale.service.TransactionsService;

@RestController
@RequestMapping("/pos/api")
public class TransactionsController {
    
    @Autowired
    private TransactionsService transactionSvc;

    @GetMapping("/listtransaction")
    public List<TransactionsResponse> getAllTransactions() {
        List<TransactionsResponse> transactionsResList = transactionSvc.getAllTransactions();

        return transactionsResList;
    }

    @GetMapping("/listtransaction/{id}")
    public TransactionsResponse getTransactionById(@PathVariable("id") Long id) {
        TransactionsResponse transactionsRes = transactionSvc.getTransactionById(id);

        return transactionsRes;
    }

    @GetMapping("/listtransaction/details/{id}")
    public List<TransactionDetailsResponse> getTransactionDetailsByTransactionId(@PathVariable("id") Long id) {
        List<TransactionDetailsResponse> transactionDetailsResList = transactionSvc.getTransactionDetailsListByTransactionId(id);

        return transactionDetailsResList;
    }

    @PostMapping("/addtransaction")
    public MyHttpResponse<String> addTransaction(@RequestBody AddTransactionsRequest req) {
        transactionSvc.addTransactions(req);

        return MyHttpResponse.<String>builder()
                .status(HttpStatus.OK)
                .message("success")
                .build();
    }
}
