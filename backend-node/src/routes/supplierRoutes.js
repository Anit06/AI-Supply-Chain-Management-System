const express= require("express");

const router=express.Router();

const{
    addSupplier,
    getSupplier,
    getSuppliers,
    updateSuppliers,
    deleteSuppliers
}=
require("../controllers/supplierController");
router.post("/",
    addSupplier
);
router.get("/",
    getSuppliers
);
router.get("/:id",
    getSupplier
);
router.put("/:id",
    updateSuppliers
);
router.delete("/:id",
    deleteSuppliers
);

module.exports=router;

