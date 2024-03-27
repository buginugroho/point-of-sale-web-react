package com.prad.pointofsale.service;

import java.util.List;

import com.prad.pointofsale.model.request.AddCategoriesRequest;
import com.prad.pointofsale.model.response.CategoriesResponse;

public interface CategoriesService {
    
    public List<CategoriesResponse> getAllCategories();

    public CategoriesResponse getCategoryDetail(Long id);

    public void addCategory(AddCategoriesRequest req);

    public void updateCategory(Long id, AddCategoriesRequest req);

    public void deleteCategory(Long id);
}
