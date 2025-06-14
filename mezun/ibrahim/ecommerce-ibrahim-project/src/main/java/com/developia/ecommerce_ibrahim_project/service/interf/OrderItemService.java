package com.developia.ecommerce_ibrahim_project.service.interf;

import com.developia.ecommerce_ibrahim_project.dto.OrderRequest;
import com.developia.ecommerce_ibrahim_project.dto.Response;

public interface OrderItemService {
    Response placeOrder(OrderRequest orderRequest);



}
