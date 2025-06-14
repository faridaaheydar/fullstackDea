package com.developia.ecommerce_umid_project.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.developia.ecommerce_umid_project.dto.ProductDto;
import com.developia.ecommerce_umid_project.dto.Response;
import com.developia.ecommerce_umid_project.entity.Product;
import com.developia.ecommerce_umid_project.entity.User;
import com.developia.ecommerce_umid_project.mapper.EntityDtoMapper;
import com.developia.ecommerce_umid_project.repository.ProductRepo;
import com.developia.ecommerce_umid_project.repository.UserRepo;
import com.developia.ecommerce_umid_project.service.interf.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;

    private final EntityDtoMapper entityDtoMapper;
    private  final UserRepo userRepository;



    public Response createProduct(Long categoryId, String imageUrl, String name, String description, BigDecimal price) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow();

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImageUrl(imageUrl);


        product.setUser(user);

        productRepo.save(product);

        return Response.builder()
                .status(201)
                .message("Product created")
                .build();
    }


    @Override
    public Response updateProduct(Long productId, Long categoryId, String image, String name, String description, BigDecimal price) {
        Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product Not Found"));


        String productImageUrl = null;

        if (image != null && !image.isEmpty()){
        }


        if (name != null) product.setName(name);
        if (price != null) product.setPrice(price);
        if (description != null) product.setDescription(description);
        if (productImageUrl != null) product.setImageUrl(productImageUrl);

        productRepo.save(product);
        return Response.builder()
                .status(200)
                .message("Product updated successfully")
                .build();

    }

    @Override
    public Response deleteProduct(Long productId) {
        Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product Not Found"));
        productRepo.delete(product);

        return Response.builder()
                .status(200)
                .message("Product deleted successfully")
                .build();
    }

    @Override
    public Response getProductById(Long productId) {
        Product product = productRepo.findById(productId).orElseThrow(()-> new NotFoundException("Product Not Found"));
        ProductDto productDto = entityDtoMapper.mapProductToDtoBasic(product);

        return Response.builder()
                .status(200)
                .product(productDto)
                .build();
    }

    @Override
    public Response getAllProducts() {
        List<ProductDto> productList = productRepo.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());

        return Response.builder()
                .status(200)
                .productList(productList)
                .build();

    }


    @Override
    public Response searchProduct(String searchValue) {
        List<Product> products = productRepo.findByNameContainingOrDescriptionContaining(searchValue, searchValue);

        if (products.isEmpty()){
            throw new NotFoundException("No Products Found");
        }
        List<ProductDto> productDtoList = products.stream()
                .map(entityDtoMapper::mapProductToDtoBasic)
                .collect(Collectors.toList());


        return Response.builder()
                .status(200)
                .productList(productDtoList)
                .build();
    }

        @Override
        public Response getProductsByCurrentUser() {

            String email = SecurityContextHolder.getContext().getAuthentication().getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Product> products = productRepo.findAllByUser(user);


            List<ProductDto> productDtos = products.stream()
                    .map(entityDtoMapper::mapProductToDtoBasic)
                    .collect(Collectors.toList());

            return Response.builder()
                    .status(200)
                    .productList(productDtos)
                    .build();
        }

    }



