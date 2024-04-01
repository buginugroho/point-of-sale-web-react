package com.prad.pointofsale.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.prad.pointofsale.model.Categories;
import com.prad.pointofsale.model.Products;
import com.prad.pointofsale.model.TransactionDetails;
import com.prad.pointofsale.model.request.AddProductRequest;
import com.prad.pointofsale.model.request.RequestParams;
import com.prad.pointofsale.model.response.ProductsResponse;
import com.prad.pointofsale.repository.CategoriesRepository;
import com.prad.pointofsale.repository.ProductsRepository;
import com.prad.pointofsale.repository.TransactionDetailsRepository;
import com.prad.pointofsale.service.ProductsService;

@SuppressWarnings("null")
@Service
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsRepository productsRepo;

    @Autowired
    private CategoriesRepository categoriesRepo;

    @Autowired
    private TransactionDetailsRepository transactionDetailsRepo;

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
        Optional<Products> products = productsRepo.findById(id);

        if (!products.isPresent()) {
            return null;
        }

        ProductsResponse productsRes = new ProductsResponse();
        productsRes.setId(products.get().getId());
        productsRes.setTitle(products.get().getTitle());
        productsRes.setPrice(products.get().getPrice());
        productsRes.setImage(products.get().getImage());
        productsRes.setCategory_id(products.get().getCategory().getId());
        productsRes.setCategory_name(products.get().getCategory().getCategoryName());

        return productsRes;
    }

    @Override
    public void addProduct(AddProductRequest req) {
        if (req.getTitle() == "" || req.getCategory_id() < 1
                || req.getImage() == "" || req.getPrice() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Data tidak boleh kosong");
        }

        Products products = new Products();

        Categories cat = new Categories();

        cat = categoriesRepo.findById(req.getCategory_id()).get();

        products.setTitle(req.getTitle());
        products.setImage(req.getImage());
        products.setPrice(req.getPrice());
        products.setCategory(cat);

        productsRepo.save(products);
    }

    @Override
    public void updateProduct(Long id, AddProductRequest req) {
        Optional<Products> products = productsRepo.findById(id);

        if (!products.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Produk tidak ditemukan");
        }

        if (req.getTitle() == "" || req.getCategory_id() < 1
                || req.getImage() == "" || req.getPrice() < 1) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Data tidak boleh kosong");
        }

        Categories cat = new Categories();
        cat = categoriesRepo.findById(req.getCategory_id()).get();

        products.get().setTitle(req.getTitle());
        products.get().setImage(req.getImage());
        products.get().setPrice(req.getPrice());
        products.get().setCategory(cat);

        productsRepo.save(products.get());
    }

    @Override
    public void deleteProduct(Long id) {
        Optional<Products> products = productsRepo.findById(id);

        if (!products.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Produk tidak ditemukan");
        }

        List<TransactionDetails> transactionDetails = transactionDetailsRepo.findByProduct(products.get());

        if (transactionDetails.size() > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Produk sudah terdaftar di dalam transaksi");
        }

        products.get().setCategory(null);
        productsRepo.delete(products.get());
    }

}
