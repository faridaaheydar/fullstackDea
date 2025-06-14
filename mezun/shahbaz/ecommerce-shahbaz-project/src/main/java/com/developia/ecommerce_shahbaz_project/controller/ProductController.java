package com.developia.ecommerce_shahbaz_project.controller;


import com.developia.ecommerce_shahbaz_project.dto.Response;
import com.developia.ecommerce_shahbaz_project.service.interf.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;


    @RestController
    @RequestMapping("/product")
    @RequiredArgsConstructor
    public class ProductController {

        private final ProductService productService;


        @PostMapping("/create")

        public ResponseEntity<Response> createProduct(
                @RequestParam Long categoryId,
                @RequestParam String imageUrl,
                @RequestParam String name,
                @RequestParam String description,
                @RequestParam BigDecimal price
        ){

            return ResponseEntity.ok(productService.createProduct(categoryId, imageUrl, name, description, price));
        }


        @PutMapping("/update")

        public ResponseEntity<Response> updateProduct(
                @RequestParam Long productId,
                @RequestParam(required = false) Long categoryId,
                @RequestParam String imageUrl,
                @RequestParam(required = false)  String name,
                @RequestParam(required = false)  String description,
                @RequestParam(required = false)  BigDecimal price
        ){
            return ResponseEntity.ok(productService.updateProduct(productId, categoryId, imageUrl, name, description, price));
        }

        @DeleteMapping("/delete/{productId}")
        public ResponseEntity<Response> deleteProduct(@PathVariable Long productId){
            return ResponseEntity.ok(productService.deleteProduct(productId));

        }


        @GetMapping("/my-products")
        public ResponseEntity<Response> getMyProducts() {
            return ResponseEntity.ok(productService.getProductsByCurrentUser());
        }



        @GetMapping("/get-by-product-id/{productId}")
        public ResponseEntity<Response> getProductById(@PathVariable Long productId){
            return ResponseEntity.ok(productService.getProductById(productId));
        }

        @GetMapping("/get-all")
        public ResponseEntity<Response> getAllProducts(){
            return ResponseEntity.ok(productService.getAllProducts());
        }


        @GetMapping("/search")
        public ResponseEntity<Response> searchForProduct(@RequestParam String searchValue){
            return ResponseEntity.ok(productService.searchProduct(searchValue));
        }









    }
