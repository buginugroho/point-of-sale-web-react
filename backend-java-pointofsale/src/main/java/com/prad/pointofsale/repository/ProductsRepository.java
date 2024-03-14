package com.prad.pointofsale.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.prad.pointofsale.model.Products;

import jakarta.annotation.Nullable;

@Repository
public interface ProductsRepository extends JpaRepository<Products, Long>{
    
    @Nullable
    List<Products> findByTitleLike(@Nullable String title, Sort sort);

    @Nullable
    List<Products> findByCategory_CategoryId(@Nullable Long id, Sort sort);

    @Nullable
    List<Products> findByTitleLikeAndCategory_CategoryId(@Nullable String title, Long id, Sort sort);
}
