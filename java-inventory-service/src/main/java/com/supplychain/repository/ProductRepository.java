package com.supplychain.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.supplychain.model.Product;

@Repository
public interface ProductRepository
        extends MongoRepository<Product, String> {

}