package com.supplychain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.supplychain.model.Inventory;

@Repository
public interface InventoryRepository
        extends MongoRepository<Inventory, String> {

    List<Inventory> findByWarehouse(String warehouse);

    Optional<Inventory> findByWarehouseAndProduct(
            String warehouse,
            String product
    );

    void deleteByWarehouseAndProduct(
            String warehouse,
            String product
    );
}