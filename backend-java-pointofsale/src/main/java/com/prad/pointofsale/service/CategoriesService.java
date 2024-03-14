package com.prad.pointofsale.service;

import java.util.List;

import com.prad.pointofsale.model.response.CategoriesResponse;

public interface CategoriesService {
    
    public List<CategoriesResponse> getAllCategories();
}
