package com.prad.pointofsale.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prad.pointofsale.model.Categories;
import com.prad.pointofsale.model.request.AddCategoriesRequest;
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
            categoriesRes.setCategory_id(cat.getId());
            categoriesRes.setCategory_name(cat.getCategoryName());
            categoriesRes.setTotal_products(Long.valueOf(cat.getProduct().size()));

            categoriesResList.add(categoriesRes);
        }
        return categoriesResList;
    }

    @Override
    public CategoriesResponse getCategoryDetail(Long id) {
        Categories categories = new Categories();

        try {
            categories = categoriesRepo.findById(id).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        CategoriesResponse categoriesRes = new CategoriesResponse();
        categoriesRes.setCategory_id(categories.getId());
        categoriesRes.setCategory_name(categories.getCategoryName());
        categoriesRes.setTotal_products(Long.valueOf(categories.getProduct().size()));

        return categoriesRes;
    }

    @Override
    public void addCategory(AddCategoriesRequest req) {
        Categories categories = new Categories();

        try {
            categories.setCategoryName(req.getCategory_name());

            categoriesRepo.save(categories);
        } catch (Exception e) {
            // TODO: handle exception
        }
        
    }

    @Override
    public void updateCategory(Long id, AddCategoriesRequest req) {
        Categories categories = new Categories();

        try {
            categories = categoriesRepo.getReferenceById(id);
            categories.setCategoryName(req.getCategory_name());

            categoriesRepo.save(categories);
        } catch (Exception e) {
            // TODO: handle exception
        }
        
    }

    @Override
    public void deleteCategory(Long id) {
        Categories categories = new Categories();

        try {
            categories = categoriesRepo.getReferenceById(id);

            categoriesRepo.delete(categories);
        } catch (Exception e) {
            // TODO: handle exception
        }
        
    }

}
