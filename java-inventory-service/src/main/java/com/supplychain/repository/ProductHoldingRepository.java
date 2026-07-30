package com.supplychain.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.supplychain.model.ProductHolding;

@Repository
public interface ProductHoldingRepository
        extends MongoRepository<ProductHolding, String> {

    Optional<ProductHolding> findByProductId(ObjectId productId);

}