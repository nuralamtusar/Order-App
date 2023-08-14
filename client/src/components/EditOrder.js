import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder, updateOrder } from "../service/api";
import { toast } from "react-toastify";
const EditOrder = () => {
  const [orderNo, setOrderNo] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    loadOrderDetails();
  }, []);
  const loadOrderDetails = async () => {
    const response = await getOrder(id);
    setOrderNo(response.data.orderNo);
    setRate(response.data.rate);
    setQuantity(response.data.quantity);
    setAmount(response.data.amount);
  };
  const handleRateChange = (event) => {
    const newRate = event.target.value;
    const newAmount = newRate * quantity;
    setRate(newRate);
    setAmount(newAmount);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = event.target.value;
    const newAmount = rate * newQuantity;
    setQuantity(newQuantity);
    setAmount(newAmount);
  };
  const editOrderDetails = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      orderNo,
      rate,
      quantity,
      amount,
    };

    await updateOrder(id, updatedOrder);
    toast.success("order Update Successfully");
    navigate("/orderList"); // Assuming there is a route for displaying orders
  };
  return (
    <div className="container col-md-4 edit-form">
      <h1 className="heading">Edit Order</h1>
      <form onSubmit={editOrderDetails}>
        <div className="form-group">
          <label htmlFor="orderNo">Order No:</label>
          <input
            type="text"
            id="orderNo"
            className="form-control"
            value={orderNo}
            onChange={(event) => setOrderNo(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rate">Rate:</label>
          <input
            type="number"
            id="rate"
            className="form-control"
            value={rate}
            onChange={handleRateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={handleQuantityChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            disabled
            className="form-control"
            value={amount}
            readOnly
          />
        </div>
        <button className="btn btn-primary mt-4 mb-4" type="submit">
          Update order
        </button>
      </form>
    </div>
  );
};

export default EditOrder;
