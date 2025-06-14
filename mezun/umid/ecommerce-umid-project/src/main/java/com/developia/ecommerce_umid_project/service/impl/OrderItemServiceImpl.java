package com.developia.ecommerce_umid_project.service.impl;

import com.amazonaws.services.kms.model.NotFoundException;
import com.developia.ecommerce_umid_project.dto.OrderRequest;
import com.developia.ecommerce_umid_project.dto.Response;
import com.developia.ecommerce_umid_project.entity.Order;
import com.developia.ecommerce_umid_project.entity.OrderItem;
import com.developia.ecommerce_umid_project.entity.Product;
import com.developia.ecommerce_umid_project.entity.User;
import com.developia.ecommerce_umid_project.mapper.EntityDtoMapper;
import com.developia.ecommerce_umid_project.repository.OrderItemRepo;
import com.developia.ecommerce_umid_project.repository.OrderRepo;
import com.developia.ecommerce_umid_project.repository.ProductRepo;
import com.developia.ecommerce_umid_project.service.interf.OrderItemService;
import com.developia.ecommerce_umid_project.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderItemServiceImpl implements OrderItemService {


    private final OrderRepo orderRepo;
    private final OrderItemRepo orderItemRepo;
    private final ProductRepo productRepo;
    private final UserService userService;
    private final EntityDtoMapper entityDtoMapper;



    @Override
    public Response placeOrder(OrderRequest orderRequest) {

        User user = userService.getLoginUser();


        List<OrderItem> orderItems = orderRequest.getItems().stream().map(orderItemRequest -> {
            Product product = productRepo.findById(orderItemRequest.getProductId())
                    .orElseThrow(()-> new NotFoundException("Product Not Found"));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(orderItemRequest.getQuantity());
            orderItem.setPrice(product.getPrice().multiply(BigDecimal.valueOf(orderItemRequest.getQuantity()))); //set price according to the quantity

            orderItem.setUser(user);
            return orderItem;

        }).collect(Collectors.toList());

        BigDecimal totalPrice = orderRequest.getTotalPrice() != null && orderRequest.getTotalPrice().compareTo(BigDecimal.ZERO) > 0
                ? orderRequest.getTotalPrice()
                : orderItems.stream().map(OrderItem::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setOrderItemList(orderItems);
        order.setTotalPrice(totalPrice);


        orderItems.forEach(orderItem -> orderItem.setOrder(order));

        orderRepo.save(order);

        return Response.builder()
                .status(200)
                .message("Order was successfully placed")
                .build();


    }




}
