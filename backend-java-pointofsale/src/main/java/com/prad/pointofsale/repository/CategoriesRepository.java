package com.prad.pointofsale.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prad.pointofsale.model.Categories;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories, Long>{
    
}
