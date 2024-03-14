package com.prad.pointofsale.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prad.pointofsale.model.Categories;
import com.prad.pointofsale.model.response.CategoriesResponse;
import com.prad.pointofsale.repository.CategoriesRepository;
import com.prad.pointofsale.service.CategoriesService;

@Service
public class CategoriesServiceImpl implements CategoriesService {

    @Autowired
    private CategoriesRepository categoriesRepo;

    @Override
    public List<CategoriesResponse> getAllCategories() {
        List<Categories> categoriesList = categoriesRepo.findAll();

        List<CategoriesResponse> categoriesResList = new ArrayList<>();

        for (Categories cat : categoriesList) {
            CategoriesResponse categoriesRes = new CategoriesResponse();
            categoriesRes.setCategory_id(cat.getCategoryId());
            categoriesRes.setCategory_name(cat.getCategoryName());

            categoriesResList.add(categoriesRes);
        }
        return categoriesResList;
    }
    
}
