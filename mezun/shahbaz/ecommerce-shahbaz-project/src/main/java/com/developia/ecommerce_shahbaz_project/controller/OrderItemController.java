package com.developia.ecommerce_shahbaz_project.controller;


import com.developia.ecommerce_shahbaz_project.dto.OrderRequest;
import com.developia.ecommerce_shahbaz_project.dto.Response;
import com.developia.ecommerce_shahbaz_project.service.interf.OrderItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderItemController {

    private final OrderItemService orderItemService;




    @PostMapping("/create")
    public ResponseEntity<Response> placeOrder(@RequestBody OrderRequest orderRequest){
        return ResponseEntity.ok(orderItemService.placeOrder(orderRequest));
    }








}
