const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  searchOrderByJobId,
  searchOrderByOrderNo,
} = require("../controllers/orderController");

const router = express.Router();

// Route for creating a new order
router.post("/orders/addOrder", createOrder);
// Route for fetching all orders
router.get("/orders", getAllOrders);
// Route for fetching a single order by its ID
router.get("/orders/editOrder/:id", getOrderById);
// Route for searching an order by Job ID
router.get("/orders/searchOrder", searchOrderByJobId);
// Route for searching an order by Order No
router.get("/orders/searchOrderByOrderId", searchOrderByOrderNo);
// Route for updating an order by its ID
router.put("/orders/updateOrder/:id", updateOrder);
// Delete an order by ID
router.delete("/orders/:id", deleteOrder);

module.exports = router;
