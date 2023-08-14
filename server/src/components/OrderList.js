import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../service/helper";
const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };
  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${BASE_URL}/orders/${orderId}`);
      // Filter out the deleted order from the orders state
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };
  return (
    <div className="container">
      <h1 className="heading">Order List</h1>
      <div className="order-table table-success">
        <table class="table">
          <thead>
            <tr className="table-success">
              <th>JobId</th>
              <th>Order No</th>
              <th>Rate</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr className="table-info" key={order._id}>
                <td>{order.jobId}</td>
                <td>{order.orderNo}</td>
                <td>{order.rate}</td>
                <td>{order.quantity}</td>
                <td>{order.amount}</td>
                <td>
                  <Link to={`/edit/${order._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
