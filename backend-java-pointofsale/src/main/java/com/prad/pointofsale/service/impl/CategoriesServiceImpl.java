package com.prad.pointofsale.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        Optional<Categories> categories = categoriesRepo.findById(id);

        if (!categories.isPresent()) {
            return null;
        }

        CategoriesResponse categoriesRes = new CategoriesResponse();
        categoriesRes.setCategory_id(categories.get().getId());
        categoriesRes.setCategory_name(categories.get().getCategoryName());
        categoriesRes.setTotal_products(Long.valueOf(categories.get().getProduct().size()));

        return categoriesRes;
    }

    @Override
    public void addCategory(AddCategoriesRequest req) {
        if (req.getCategory_name() == "") {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Nama kategori tidak boleh kosong");
        }

        Categories categories = new Categories();

        categories.setCategoryName(req.getCategory_name());

        categoriesRepo.save(categories);
    }

    @Override
    public void updateCategory(Long id, AddCategoriesRequest req) {
        Optional<Categories> categories = categoriesRepo.findById(id);

        if (!categories.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Kategori tidak ditemukan");
        }

        if (req.getCategory_name() == "") {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Nama kategori tidak boleh kosong");
        }

        categories.get().setCategoryName(req.getCategory_name());

        categoriesRepo.save(categories.get());
    }

    @Override
    public void deleteCategory(Long id) {
        Optional<Categories> categories = categoriesRepo.findById(id);

        if (!categories.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Kategori tidak ditemukan");
        }

        if (categories.get().getProduct().size() > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Kategori yang sudah memiliki produk tidak bisa dihapus");
        }

        categoriesRepo.delete(categories.get());
    }

}
