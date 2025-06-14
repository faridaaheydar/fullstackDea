package com.example.e_commerce_backEnd.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;
    private String image;
    private String category;
    private int rating;

    // Владелец продукта
    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonBackReference // Обратная сторона связи, не сериализуется
    private User owner;

    // Пользователи, у которых этот товар в корзине
    @ManyToMany(mappedBy = "cart")
    @JsonIgnore // чтобы избежать рекурсии и уменьшить размер JSON
    private List<User> usersWithThisInCart = new ArrayList<>();
}
