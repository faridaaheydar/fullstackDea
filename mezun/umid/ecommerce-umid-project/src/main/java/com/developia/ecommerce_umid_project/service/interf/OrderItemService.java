package com.developia.ecommerce_umid_project.service.interf;

import com.developia.ecommerce_umid_project.dto.OrderRequest;
import com.developia.ecommerce_umid_project.dto.Response;

public interface OrderItemService {
    Response placeOrder(OrderRequest orderRequest);



}
