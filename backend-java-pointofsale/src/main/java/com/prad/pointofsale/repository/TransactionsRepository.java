package com.prad.pointofsale.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prad.pointofsale.model.Transactions;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Long> {
    
}
