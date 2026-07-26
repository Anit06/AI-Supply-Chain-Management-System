package com.supplychain.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.supplychain.model.Warehouse;

@Repository
public interface WarehouseRepository
        extends MongoRepository<Warehouse, String> {

}