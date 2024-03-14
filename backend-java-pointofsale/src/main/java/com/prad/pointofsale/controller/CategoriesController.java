package com.prad.pointofsale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prad.pointofsale.model.response.CategoriesResponse;
import com.prad.pointofsale.model.response.MyHttpResponse;
import com.prad.pointofsale.service.CategoriesService;

@RestController
@RequestMapping("/pos/api")
public class CategoriesController {
    
    @Autowired
    private CategoriesService categoriesSvc;

    @GetMapping("/listcategory")
    public MyHttpResponse<List<CategoriesResponse>> getAllCategories() {
        List<CategoriesResponse> categoriesResList = categoriesSvc.getAllCategories();

        return MyHttpResponse.<List<CategoriesResponse>>builder()
                .data(categoriesResList)
                .status(HttpStatus.OK)
                .message("success")
                .build();
                
    }
}
