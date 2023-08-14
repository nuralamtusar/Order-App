const Order = require("../models/orderModel.js");

const generateJobId = () => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const uniqueNumber = generateUniqueNumber();

  return `FHDPL${year}${month}${day}${uniqueNumber}`;
};

const generateUniqueNumber = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};

// const jobId = generateJobId();
// console.log(jobId);

// Controller for fetching all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// Controller for creating a new order
const createOrder = async (req, res) => {
  try {
    const jobId = generateJobId();
    console.log(jobId);
    //console.log(req.body);
    const { orderNo, rate, quantity, amount } = req.body;
    // const existingOrder = await Order.findOne({ orderNo });

    // if (existingOrder) {
    //   return res.status(400).json({ error: "Order number already exists" });
    // }
    const order = new Order({
      jobId,
      orderNo,
      rate,
      quantity,
      amount,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderNo, rate, quantity, amount } = req.body;

    // Find the order by ID
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update order fields
    order.orderNo = orderNo;
    order.rate = rate;
    order.quantity = quantity;
    order.amount = amount;

    // Save the updated order
    await order.save();

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller for searching an order by Job ID
const searchOrderByJobId = async (req, res) => {
  try {
    const { jobId } = req.query;

    // Search for the order by Job ID
    const order = await Order.findOne({ jobId });

    if (!order) {
      return res
        .status(200)
        .json({ success: false, message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error searching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Search orders by order number
const searchOrderByOrderNo = async (req, res) => {
  try {
    const { orderNo } = req.query;

    const order = await Order.findOne({ orderNo });

    if (order) {
      res.json(order);
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Order not found" });
    }
  } catch (error) {
    console.error("Error searching order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Controller for deleting an order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the order by ID
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Delete the order
    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  searchOrderByJobId,
  searchOrderByOrderNo,
  deleteOrder,
};
