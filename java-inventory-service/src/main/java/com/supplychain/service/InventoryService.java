package com.supplychain.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.supplychain.dto.ReduceInventoryRequest;
import com.supplychain.dto.InventoryRequest;
import com.supplychain.dto.InventoryResponse;
import com.supplychain.model.Inventory;
import com.supplychain.model.Product;
import com.supplychain.model.ProductHolding;
import com.supplychain.model.Warehouse;
import com.supplychain.repository.InventoryRepository;
import com.supplychain.repository.ProductHoldingRepository;
import com.supplychain.repository.ProductRepository;
import com.supplychain.repository.WarehouseRepository;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final WarehouseRepository warehouseRepository;
    private final ProductHoldingRepository productHoldingRepository;

    public InventoryService(
            InventoryRepository inventoryRepository,
            ProductRepository productRepository,
            WarehouseRepository warehouseRepository,
            ProductHoldingRepository productHoldingRepository) {

        this.inventoryRepository = inventoryRepository;
        this.productRepository = productRepository;
        this.warehouseRepository = warehouseRepository;
        this.productHoldingRepository = productHoldingRepository;
    }

    // ==============================
    // GET INVENTORY BY WAREHOUSE
    // ==============================
    public List<InventoryResponse> getInventoryByWarehouse(String warehouseId) {

        List<Inventory> inventoryList =
                inventoryRepository.findByWarehouse(warehouseId);

        List<InventoryResponse> responseList = new ArrayList<>();

        for (Inventory inventory : inventoryList) {

            InventoryResponse dto = new InventoryResponse();

            dto.setInventoryId(inventory.getId());
            dto.setWarehouseId(inventory.getWarehouse());
            dto.setProductId(inventory.getProduct());
            dto.setStock(inventory.getStock());

            productRepository.findById(inventory.getProduct())
                    .ifPresent(product -> {
                        dto.setProductName(product.getName());
                        dto.setCategory(product.getCategory());
                    });

            warehouseRepository.findById(inventory.getWarehouse())
                    .ifPresent(warehouse -> {
                        dto.setWarehouseName(warehouse.getName());
                    });

            responseList.add(dto);
        }

        return responseList;
    }

    // ==============================
    // ADD INVENTORY (USES HOLDING)
    // ==============================
    public InventoryResponse addInventory(InventoryRequest request) {

        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId())
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ObjectId productObjectId = new ObjectId(request.getProductId());
        ProductHolding holding = productHoldingRepository.findByProductId(productObjectId)
                .orElseThrow(() -> new RuntimeException("Product holding not found"));

        Optional<Inventory> existing =
                inventoryRepository.findByWarehouseAndProduct(
                        request.getWarehouseId(),
                        request.getProductId());

        if (existing.isPresent()) {
            throw new RuntimeException("Product already exists in warehouse");
        }

        // check stock in holding
        if (holding.getStock() < request.getStock()) {
            throw new RuntimeException("Not enough stock available in ProductHolding");
        }

        // create inventory
        Inventory inventory = new Inventory();
        inventory.setWarehouse(request.getWarehouseId());
        inventory.setProduct(request.getProductId());
        inventory.setStock(request.getStock());

        inventoryRepository.save(inventory);

        // reduce holding stock
        holding.setStock(holding.getStock() - request.getStock());
        holding.setStockStatus(holding.getStock() <= 0 ? "Out Of Stock" : "In Stock");

        productHoldingRepository.save(holding);

        // response
        InventoryResponse response = new InventoryResponse();
        response.setInventoryId(inventory.getId());
        response.setWarehouseId(warehouse.getId());
        response.setWarehouseName(warehouse.getName());
        response.setProductId(product.getId());
        response.setProductName(product.getName());
        response.setCategory(product.getCategory());
        response.setStock(inventory.getStock());

        return response;
    }

    // ==============================
    // UPDATE INVENTORY STOCK
    // ==============================
    public InventoryResponse updateStock(String inventoryId, int newStock) {

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        ProductHolding holding = productHoldingRepository.findByProductId(new ObjectId(inventory.getProduct()))
                .orElseThrow(() -> new RuntimeException("Product holding not found"));

        int oldStock = inventory.getStock();
        int diff = newStock - oldStock;

        // if increasing stock → check holding availability
        if (diff > 0 && holding.getStock() < diff) {
            throw new RuntimeException("Not enough stock in ProductHolding");
        }

        inventory.setStock(newStock);
        inventoryRepository.save(inventory);

        holding.setStock(holding.getStock() - diff);
        holding.setStockStatus(holding.getStock() <= 0 ? "Out Of Stock" : "In Stock");

        productHoldingRepository.save(holding);

        InventoryResponse response = new InventoryResponse();

        response.setInventoryId(inventory.getId());
        response.setWarehouseId(inventory.getWarehouse());
        response.setProductId(inventory.getProduct());
        response.setStock(inventory.getStock());

        productRepository.findById(inventory.getProduct())
                .ifPresent(product -> {
                    response.setProductName(product.getName());
                    response.setCategory(product.getCategory());
                });

        warehouseRepository.findById(inventory.getWarehouse())
                .ifPresent(warehouse -> {
                    response.setWarehouseName(warehouse.getName());
                });

        return response;
    }

    // ==============================
    // DELETE INVENTORY
    // ==============================
    public void removeInventory(String inventoryId) {

        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new RuntimeException("Inventory not found"));

        ProductHolding holding = productHoldingRepository.findByProductId(new ObjectId(inventory.getProduct()))
                .orElse(null);

        if (holding != null) {

            holding.setStock(holding.getStock() + inventory.getStock());
            holding.setStockStatus(holding.getStock() <= 0 ? "Out Of Stock" : "In Stock");

            productHoldingRepository.save(holding);
        }

        inventoryRepository.deleteById(inventoryId);
    }

    // =====================================
    // REDUCE INVENTORY AFTER ORDER
    // =====================================

    public InventoryResponse reduceInventory(
            ReduceInventoryRequest request) {

        Inventory inventory = inventoryRepository
                .findByWarehouseAndProduct(
                        request.getWarehouseId(),
                        request.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Inventory not found"));

        if (inventory.getStock() < request.getQuantity()) {
            throw new RuntimeException("Not enough stock available");
        }

        inventory.setStock(
                inventory.getStock() - request.getQuantity());

        inventoryRepository.save(inventory);

        InventoryResponse response = new InventoryResponse();

        response.setInventoryId(inventory.getId());
        response.setWarehouseId(inventory.getWarehouse());
        response.setProductId(inventory.getProduct());
        response.setStock(inventory.getStock());

        productRepository.findById(inventory.getProduct())
                .ifPresent(product -> {
                    response.setProductName(product.getName());
                    response.setCategory(product.getCategory());
                });

        warehouseRepository.findById(inventory.getWarehouse())
                .ifPresent(warehouse -> {
                    response.setWarehouseName(warehouse.getName());
                });

        return response;
    }

        /*
        ==================================
        ADD STOCK BACK TO INVENTORY
        (AFTER ORDER CANCELLATION)
        ==================================
        */

        public void addStock(

                String warehouseId,

                String productId,

                int stock

        ){

        /*
        ==============================
        Find Inventory
        ==============================
        */

        Inventory inventory = inventoryRepository

                .findByWarehouseAndProduct(

                        warehouseId,

                        productId

                )

                .orElseThrow(

                        () -> new RuntimeException(

                                "Inventory not found"

                        )

                );

        /*
        ==============================
        Increase Stock
        ==============================
        */

        inventory.setStock(

                inventory.getStock() + stock

        );

        /*
        ==============================
        Save Inventory
        ==============================
        */

        inventoryRepository.save(

                inventory

        );

        }
}