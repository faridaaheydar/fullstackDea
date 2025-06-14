package com.developia.ecommerce_shahbaz_project.mapper;

import com.developia.ecommerce_shahbaz_project.dto.OrderItemDto;
import com.developia.ecommerce_shahbaz_project.dto.ProductDto;
import com.developia.ecommerce_shahbaz_project.dto.UserDto;
import com.developia.ecommerce_shahbaz_project.entity.OrderItem;
import com.developia.ecommerce_shahbaz_project.entity.Product;
import com.developia.ecommerce_shahbaz_project.entity.User;
import org.springframework.stereotype.Component;

@Component
public class EntityDtoMapper {



    public UserDto mapUserToDtoBasic(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setPhone(user.getPhone());
        userDto.setEmail(user.getEmail());
        userDto.setName(user.getName());
        return userDto;

    }


    public OrderItemDto mapOrderItemToDtoBasic(OrderItem orderItem){
        OrderItemDto orderItemDto = new OrderItemDto();
        orderItemDto.setId(orderItem.getId());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setPrice(orderItem.getPrice());

        orderItemDto.setCreatedAt(orderItem.getCreatedAt());
        return orderItemDto;
    }

    public ProductDto mapProductToDtoBasic(Product product){
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setPrice(product.getPrice());
        productDto.setImageUrl(product.getImageUrl());
        return productDto;
    }




    public OrderItemDto mapOrderItemToDtoPlusProduct(OrderItem orderItem){
        OrderItemDto orderItemDto = mapOrderItemToDtoBasic(orderItem);

        if (orderItem.getProduct() != null) {
            ProductDto productDto = mapProductToDtoBasic(orderItem.getProduct());
            orderItemDto.setProduct(productDto);
        }
        return orderItemDto;
    }



    }






