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

import com.prad.pointofsale.model.request.AddProductRequest;
import com.prad.pointofsale.model.request.RequestParams;
import com.prad.pointofsale.model.response.MyHttpResponse;
import com.prad.pointofsale.model.response.ProductsResponse;
import com.prad.pointofsale.service.ProductsService;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@RequestMapping("/pos/api")
public class ProductController {

    @Autowired
    private ProductsService productSvc;

    @GetMapping("/listproduct")
    public List<ProductsResponse> getProducts(HttpServletRequest req) {
        RequestParams reqParams = new RequestParams();

        reqParams.setTitle(req.getParameter("title"));
        reqParams.setCategory_id(req.getParameter("category_id"));
        reqParams.setSort_by(req.getParameter("sort_by"));
        reqParams.setSort_order(req.getParameter("sort_order"));

        List<ProductsResponse> productsResList = productSvc.getAllProducts(reqParams);

        return productsResList;
    }

    @GetMapping("/detailproduct/{id}")
    public ProductsResponse getProductDetail(@PathVariable("id") Long id) {
        ProductsResponse productsRes = productSvc.getProductDetail(id);

        return productsRes;
    }

    @PostMapping("/addproduct")
    public MyHttpResponse<?> addProduct(@RequestBody AddProductRequest req) {
        MyHttpResponse<?> res = new MyHttpResponse<>();

        productSvc.addProduct(req);
        res.setStatus(HttpStatus.OK);
        res.setMessage("success");

        return res;
    }

    @PutMapping("/updateproduct/{id}")
    public MyHttpResponse<?> updateProduct(@RequestBody AddProductRequest req, @PathVariable("id") Long id) {
        MyHttpResponse<?> res = new MyHttpResponse<>();
        
        productSvc.updateProduct(id, req);
        res.setStatus(HttpStatus.OK);
        res.setMessage("success");

        return res;
    }

    @DeleteMapping("/deleteproduct/{id}")
    public MyHttpResponse<?> deleteProduct(@PathVariable("id") Long id) {
        MyHttpResponse<?> res = new MyHttpResponse<>();

        productSvc.deleteProduct(id);
        res.setStatus(HttpStatus.OK);
        res.setMessage("success");

        return res;
    }
}
