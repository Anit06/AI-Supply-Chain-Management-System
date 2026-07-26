package com.supplychain.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.supplychain.dto.InventoryRequest;
import com.supplychain.dto.InventoryResponse;
import com.supplychain.model.Warehouse;
import com.supplychain.repository.WarehouseRepository;
import com.supplychain.service.InventoryService;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    private final InventoryService inventoryService;
    private final WarehouseRepository warehouseRepository;

    public InventoryController(
            InventoryService inventoryService,
            WarehouseRepository warehouseRepository) {

        this.inventoryService = inventoryService;
        this.warehouseRepository = warehouseRepository;
    }

    @GetMapping("/test/warehouses")
    public List<Warehouse> testWarehouses() {
        return warehouseRepository.findAll();
    }

    @GetMapping("/warehouse/{warehouseId}")
    public ResponseEntity<List<InventoryResponse>> getInventoryByWarehouse(
            @PathVariable String warehouseId) {

        return ResponseEntity.ok(
                inventoryService.getInventoryByWarehouse(warehouseId));
    }

    @PostMapping
    public ResponseEntity<InventoryResponse> addInventory(
            @RequestBody InventoryRequest request) {

        return ResponseEntity.ok(
                inventoryService.addInventory(request));
    }

    @PutMapping("/{inventoryId}")
    public ResponseEntity<InventoryResponse> updateStock(
            @PathVariable String inventoryId,
            @RequestParam int stock) {

        return ResponseEntity.ok(
                inventoryService.updateStock(inventoryId, stock));
    }

    @DeleteMapping("/{inventoryId}")
    public ResponseEntity<String> deleteInventory(
            @PathVariable String inventoryId) {

        inventoryService.removeInventory(inventoryId);

        return ResponseEntity.ok("Inventory deleted successfully.");
    }
}