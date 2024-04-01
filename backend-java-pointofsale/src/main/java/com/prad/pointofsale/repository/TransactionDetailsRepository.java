package com.prad.pointofsale.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prad.pointofsale.model.Products;
import com.prad.pointofsale.model.TransactionDetails;

import jakarta.annotation.Nullable;

@Repository
public interface TransactionDetailsRepository extends JpaRepository<TransactionDetails, Long>{
    
    @Nullable
    List<TransactionDetails> findByTransaction_Id(@Nullable Long id);

    List<TransactionDetails> findByProduct(Products products);
}
