package com.developia.ecommerce_shahbaz_project.service.interf;


import com.developia.ecommerce_shahbaz_project.dto.Response;

import java.math.BigDecimal;

public interface ProductService {

    Response createProduct(Long categoryId, String image, String name, String description, BigDecimal price);
    Response updateProduct(Long productId, Long categoryId, String image, String name, String description, BigDecimal price);
    Response deleteProduct(Long productId);
    Response getProductById(Long productId);
    Response getAllProducts();
    Response getProductsByCurrentUser();
    Response searchProduct(String searchValue);
}
