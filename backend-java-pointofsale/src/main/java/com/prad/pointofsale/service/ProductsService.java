package com.prad.pointofsale.service;

import java.util.List;

import com.prad.pointofsale.model.request.AddProductRequest;
import com.prad.pointofsale.model.request.RequestParams;
import com.prad.pointofsale.model.response.ProductsResponse;

public interface ProductsService {
    
    public List<ProductsResponse> getAllProducts(RequestParams req);

    public ProductsResponse getProductDetail(Long id);

    public void addProduct(AddProductRequest req);

    public void updateProduct(Long id, AddProductRequest req);

    public void deleteProduct(Long id);
}
