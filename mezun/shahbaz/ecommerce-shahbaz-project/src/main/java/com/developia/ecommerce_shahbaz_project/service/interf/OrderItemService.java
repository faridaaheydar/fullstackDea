package com.developia.ecommerce_shahbaz_project.service.interf;

import com.developia.ecommerce_shahbaz_project.dto.OrderRequest;
import com.developia.ecommerce_shahbaz_project.dto.Response;

public interface OrderItemService {
    Response placeOrder(OrderRequest orderRequest);



}
