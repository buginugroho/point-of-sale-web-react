package com.prad.pointofsale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prad.pointofsale.model.request.AddCategoriesRequest;
import com.prad.pointofsale.model.response.CategoriesResponse;
import com.prad.pointofsale.model.response.MyHttpResponse;
import com.prad.pointofsale.service.CategoriesService;

@CrossOrigin
@RestController
@RequestMapping("/pos/api")
public class CategoriesController {
    
    @Autowired
    private CategoriesService categoriesSvc;

    @GetMapping("/listcategory")
    public List<CategoriesResponse> getAllCategories() {
        List<CategoriesResponse> categoriesResList = categoriesSvc.getAllCategories();

        return categoriesResList;
    }

    @GetMapping("/detailcategory/{id}")
    public CategoriesResponse getCategoryDetail(@PathVariable("id") Long id) {
        CategoriesResponse categoriesRes = categoriesSvc.getCategoryDetail(id);

        return categoriesRes;
    }

    @PostMapping("/addcategory")
    public MyHttpResponse<?> addProduct(@RequestBody AddCategoriesRequest req) {
        MyHttpResponse<?> res = new MyHttpResponse<>();
        
        categoriesSvc.addCategory(req);
        res.setStatus(HttpStatus.OK);
        res.setMessage("success");

        return res;
    }

    @PutMapping("/updatecategory/{id}")
    public MyHttpResponse<?> updateProduct(@RequestBody AddCategoriesRequest req, @PathVariable("id") Long id) {
        MyHttpResponse<?> res = new MyHttpResponse<>();

        categoriesSvc.updateCategory(id, req);
        res.setStatus(HttpStatus.OK);
        res.setMessage("success");

        return res;
    }

    @DeleteMapping("/deletecategory/{id}")
    public MyHttpResponse<?> deleteProduct(@PathVariable("id") Long id) {
        MyHttpResponse<?> res = new MyHttpResponse<>();

        categoriesSvc.deleteCategory(id);
        res.setStatus(HttpStatus.OK);
        res.setMessage("success");

        return res;
    }
}
