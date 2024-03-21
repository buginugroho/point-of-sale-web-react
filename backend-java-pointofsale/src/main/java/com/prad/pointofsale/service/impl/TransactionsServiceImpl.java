package com.prad.pointofsale.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prad.pointofsale.model.Products;
import com.prad.pointofsale.model.TransactionDetails;
import com.prad.pointofsale.model.Transactions;
import com.prad.pointofsale.model.request.AddTransactionDetailsRequest;
import com.prad.pointofsale.model.request.AddTransactionsRequest;
import com.prad.pointofsale.model.response.TransactionDetailsResponse;
import com.prad.pointofsale.model.response.TransactionsResponse;
import com.prad.pointofsale.repository.ProductsRepository;
import com.prad.pointofsale.repository.TransactionDetailsRepository;
import com.prad.pointofsale.repository.TransactionsRepository;
import com.prad.pointofsale.service.TransactionsService;

@SuppressWarnings("null")
@Service
public class TransactionsServiceImpl implements TransactionsService {

    @Autowired
    private ProductsRepository productsRepo;

    @Autowired
    private TransactionsRepository transactionsRepo;

    @Autowired
    private TransactionDetailsRepository transactionDetailsRepo;

    @Override
    public List<TransactionsResponse> getAllTransactions() {
        List<Transactions> transactionsList = transactionsRepo.findAll();

        List<TransactionsResponse> transactionsResList = new ArrayList<>();

        for (Transactions transaction : transactionsList) {
            TransactionsResponse transactionsRes = new TransactionsResponse();

            // TransactionDetails data fetch loop
            List<TransactionDetails> transactionDetailsList = transactionDetailsRepo
                    .findByTransaction_Id(transaction.getId());
            List<TransactionDetailsResponse> transactionDetailsResList = new ArrayList<>();
            for (TransactionDetails transactionDetail : transactionDetailsList) {
                TransactionDetailsResponse transactionDetailsRes = new TransactionDetailsResponse();

                transactionDetailsRes.setId(transactionDetail.getId());
                transactionDetailsRes.setQuantity(transactionDetail.getQuantity());
                transactionDetailsRes.setSubtotal(transactionDetail.getSubtotal());
                transactionDetailsRes.setProduct_id(transactionDetail.getProduct().getId());
                transactionDetailsRes.setProduct_title(transactionDetail.getProduct().getTitle());
                transactionDetailsRes.setTransaction_id(transactionDetail.getTransaction().getId());

                transactionDetailsResList.add(transactionDetailsRes);
            }
            // ----------------------------------

            transactionsRes.setId(transaction.getId());
            transactionsRes.setTransaction_date(transaction.getDate());
            transactionsRes.setTotal_amount(transaction.getTotalAmount());
            transactionsRes.setTotal_pay(transaction.getTotalPay());

            // insert TransactionDetailsResList
            transactionsRes.setTransaction_details(transactionDetailsResList);

            transactionsResList.add(transactionsRes);
        }
        return transactionsResList;
    }

    @Override
    public TransactionsResponse getTransactionById(Long id) {
        Transactions transaction = new Transactions();

        try {
            transaction = transactionsRepo.findById(id).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        // TransactionDetails data fetch loop
        List<TransactionDetails> transactionDetailsList = transactionDetailsRepo
                .findByTransaction_Id(transaction.getId());
        List<TransactionDetailsResponse> transactionDetailsResList = new ArrayList<>();
        for (TransactionDetails transactionDetail : transactionDetailsList) {
            TransactionDetailsResponse transactionDetailsRes = new TransactionDetailsResponse();

            transactionDetailsRes.setId(transactionDetail.getId());
            transactionDetailsRes.setQuantity(transactionDetail.getQuantity());
            transactionDetailsRes.setSubtotal(transactionDetail.getSubtotal());
            transactionDetailsRes.setProduct_id(transactionDetail.getProduct().getId());
            transactionDetailsRes.setProduct_title(transactionDetail.getProduct().getTitle());
            transactionDetailsRes.setTransaction_id(transactionDetail.getTransaction().getId());

            transactionDetailsResList.add(transactionDetailsRes);
        }
        // ----------------------------------

        TransactionsResponse transactionsRes = new TransactionsResponse();
        transactionsRes.setId(transaction.getId());
        transactionsRes.setTransaction_date(transaction.getDate());
        transactionsRes.setTotal_amount(transaction.getTotalAmount());
        transactionsRes.setTotal_pay(transaction.getTotalPay());
        transactionsRes.setTransaction_details(transactionDetailsResList);

        return transactionsRes;
    }
    
    @Override
    public List<TransactionDetailsResponse> getTransactionDetailsListByTransactionId(Long id) {
        List<TransactionDetails> transactionDetailsList = new ArrayList<>();

        try {
            transactionDetailsList = transactionDetailsRepo.findByTransaction_Id(id);
        } catch (Exception e) {
            // TODO: handle exception
        }

        List<TransactionDetailsResponse> transactionDetailsResList = new ArrayList<>();
        
        for (TransactionDetails transactionDetail : transactionDetailsList) {
            TransactionDetailsResponse transactionDetailsRes = new TransactionDetailsResponse();

            transactionDetailsRes.setId(transactionDetail.getId());
            transactionDetailsRes.setQuantity(transactionDetail.getQuantity());
            transactionDetailsRes.setSubtotal(transactionDetail.getSubtotal());
            transactionDetailsRes.setProduct_id(transactionDetail.getProduct().getId());
            transactionDetailsRes.setProduct_title(transactionDetail.getProduct().getTitle());
            transactionDetailsRes.setTransaction_id(transactionDetail.getTransaction().getId());

            transactionDetailsResList.add(transactionDetailsRes);
        }

        return transactionDetailsResList;
    }

    @Override
    public void addTransactions(AddTransactionsRequest req) {
        // Does this generate ID?
        Transactions transaction = new Transactions();

        Long newTransactionId = transactionsRepo.save(transaction).getId();

        List<TransactionDetails> transactionDetailsList = new ArrayList<>();
        for (AddTransactionDetailsRequest transactionDetailsReq : req.getTransaction_details()) {
            TransactionDetails transactionDetail = new TransactionDetails();

            Products product = productsRepo.findById(transactionDetailsReq.getProduct_id()).get();
            transactionDetail.setProduct(product);
            transactionDetail.setQuantity(transactionDetailsReq.getQuantity());
            transactionDetail.setSubtotal(transactionDetailsReq.getSubtotal());
            
            // Does saving empty transaction work?
            transactionDetail.setTransaction(transaction);

            transactionDetailsList.add(transactionDetail);

            transactionDetailsRepo.save(transactionDetail);
        }

        // How to get ID?
        transaction = transactionsRepo.getReferenceById(newTransactionId);

        transaction.setDate(new Date());
        transaction.setTotalAmount(req.getTotal_amount());
        transaction.setTotalPay(req.getTotal_pay());
        transaction.setTransactionDetails(transactionDetailsList);
        
        transactionsRepo.save(transaction);
    }

}
