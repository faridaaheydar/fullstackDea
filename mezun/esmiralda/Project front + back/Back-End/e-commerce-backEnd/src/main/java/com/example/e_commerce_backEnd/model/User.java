package com.example.e_commerce_backEnd.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String surname;
    private String email;
    private String username;
    private String password;

    // Продукты, которые пользователь сам добавил
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Указывает, что это "главная" сторона связи
    private List<Product> ownedProducts = new ArrayList<>();

    // Корзина пользователя — чтобы не было рекурсии, можно игнорировать
    @ManyToMany
    @JoinTable(
            name = "cart_products",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonIgnore // чтобы не сериализовывалась корзина (можно убрать, если хочешь возвращать)
    private List<Product> cart = new ArrayList<>();

}
