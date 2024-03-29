package com.prad.pointofsale.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.prad.pointofsale.model.Categories;
import com.prad.pointofsale.model.Products;
import com.prad.pointofsale.model.request.AddProductRequest;
import com.prad.pointofsale.model.request.RequestParams;
import com.prad.pointofsale.model.response.ProductsResponse;
import com.prad.pointofsale.repository.CategoriesRepository;
import com.prad.pointofsale.repository.ProductsRepository;
import com.prad.pointofsale.service.ProductsService;

@SuppressWarnings("null")
@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsRepository productsRepo;

    @Autowired
    private CategoriesRepository categoriesRepo;

    @Override
    public List<ProductsResponse> getAllProducts(RequestParams req) {
        String title = req.getTitle();
        String category_id = req.getCategory_id();
        String sort_by = req.getSort_by();
        String sort_order = req.getSort_order();

        Long catId = (category_id == null) ? null : Long.parseLong(category_id);
        sort_by = (sort_by == null) ? "id" : sort_by;

        Sort sort;
        if (sort_order == null || sort_order.equals("asc")) {
            sort = Sort.by(sort_by).ascending();
        } else {
            sort = Sort.by(sort_by).descending();
        }

        List<Products> productsList;
        if (catId != null) {
            if (title != null) {
                productsList = productsRepo.findByTitleContainsAndCategory_Id(title, catId, sort);
            } else {
                productsList = productsRepo.findByCategory_Id(catId, sort);
            }
        } else {
            productsList = (title != null) ? productsRepo.findByTitleContains(title, sort) : productsRepo.findAll(sort);
        }

        List<ProductsResponse> productsResList = new ArrayList<>();
        for (Products product : productsList) {
            ProductsResponse productsRes = new ProductsResponse();
            productsRes.setId(product.getId());
            productsRes.setTitle(product.getTitle());
            productsRes.setPrice(product.getPrice());
            productsRes.setImage(product.getImage());
            productsRes.setCategory_id(product.getCategory().getId());
            productsRes.setCategory_name(product.getCategory().getCategoryName());

            productsResList.add(productsRes);
        }

        return productsResList;
    }

    @Override
    public ProductsResponse getProductDetail(Long id) {
        Products products = new Products();

        try {
            products = productsRepo.findById(id).get();
        } catch (Exception e) {
            // TODO: handle exception
        }

        ProductsResponse productsRes = new ProductsResponse();
        productsRes.setId(products.getId());
        productsRes.setTitle(products.getTitle());
        productsRes.setPrice(products.getPrice());
        productsRes.setImage(products.getImage());
        productsRes.setCategory_id(products.getCategory().getId());
        productsRes.setCategory_name(products.getCategory().getCategoryName());

        return productsRes;
    }

    @Override
    public void addProduct(AddProductRequest req) {
        Products products = new Products();

        Categories cat = new Categories();

        try {
            cat = categoriesRepo.findById(req.getCategory_id()).get();

            products.setTitle(req.getTitle());
            products.setImage(req.getImage());
            products.setPrice(req.getPrice());
            products.setCategory(cat);

            productsRepo.save(products);
        } catch (Exception e) {
            // TODO: handle exception
        }
    }

    @Override
    public void updateProduct(Long id, AddProductRequest req) {
        Products products = new Products();

        Categories cat = new Categories();

        try {
            cat = categoriesRepo.findById(req.getCategory_id()).get();
            products = productsRepo.getReferenceById(id);

            products.setTitle(req.getTitle());
            products.setImage(req.getImage());
            products.setPrice(req.getPrice());
            products.setCategory(cat);

            productsRepo.save(products);
        } catch (Exception e) {
            // TODO: handle exception
        }
    }

    @Override
    public void deleteProduct(Long id) {
        Products products = new Products();

        try {
            products = productsRepo.getReferenceById(id);

            products.setCategory(null);
            productsRepo.delete(products);
        } catch (Exception e) {
            // TODO: handle exception
        }
    }

}
