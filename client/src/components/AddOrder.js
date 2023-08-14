import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../service/helper";
import { toast } from "react-toastify";
const AddOrder = () => {
  //state for input value
  const [orderNo, setOrderNo] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [jobId, setJobId] = useState("");
  //state for search
  const [searchedJobId, setSearchedJobId] = useState("");
  const [searchedOrderNo, setSearchedOrderNo] = useState("");

  const [searchedOrder, setSearchedOrder] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const [isSearchingByJobId, setIsSearchingByJobId] = useState(false);
  const [isSearchingByOrderNo, setIsSearchingByOrderNo] = useState(false);
  // Handler for rate change
  const handleRateChange = (event) => {
    const newRate = parseFloat(event.target.value);
    if (!isNaN(newRate) && newRate >= 0) {
      const newAmount = newRate * quantity;
      setRate(newRate);
      setAmount(newAmount);
    }
  };

  // Handler for quantity change
  const handleQuantityChange = (event) => {
    const newQuantity = parseFloat(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      const newAmount = rate * newQuantity;
      setQuantity(newQuantity);
      setAmount(newAmount);
    }
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const orderData = {
      orderNo,
      rate,
      quantity,
      amount,
    };

    axios
      .post(`${BASE_URL}/orders/addOrder`, orderData)
      .then((response) => {
        console.log("Order successfully submitted:", response.data);

        const generatedJobId = response.data.jobId;
        setJobId(generatedJobId);
        setIsSaving(true);
        setIsSearchPerformed(false);
        setIsSearchingByJobId(false);
        setIsSearchingByOrderNo(false);
        toast.success("Order Added Successfully");
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
  };
  // Handler for refreshing/resetting the form
  const handleRefresh = () => {
    setOrderNo("");
    setRate("");
    setQuantity("");
    setAmount("");
    setJobId("");
    setIsSaving(false);
    setSearchedJobId("");
    setSearchedOrderNo("");
    setSearchedOrder(null);
    setIsSearchPerformed(false);
    setIsSearchingByJobId(false);
    setIsSearchingByOrderNo(false);
  };
  // Handler for searching by job ID
  const handleSearchByJobId = () => {
    setIsSearchingByJobId(true);
    axios
      .get(`${BASE_URL}/orders/searchOrder?jobId=${searchedJobId}`)
      .then((response) => {
        const order = response.data;
        setSearchedOrder(order);
        setIsSaving(false);
        setIsSearchPerformed(true);
        // Update the form fields with the searched order data
        if (order) {
          setOrderNo(order.orderNo);
          setRate(order.rate);
          setQuantity(order.quantity);
          setAmount(order.amount);
          setJobId(order.jobId);
          setSearchedOrderNo("");
          // toast.success("Order Show Successfully");
        }
        if (response.data.success === false) {
          // Reset the form fields if no matching order is found
          toast.warning("Order Not Found");
          setOrderNo("");
          setRate("");
          setQuantity("");
          setAmount("");
          setJobId("");
        }
      })
      .catch((error) => {
        console.error("Error searching order:", error);
        setIsSearchPerformed(true);
        setIsSaving(true);
      });
  };

  // Handler for searching by order number
  const handleSearchByOrderNo = () => {
    setIsSearchingByOrderNo(true);
    axios
      .get(`${BASE_URL}/orders/searchOrderByOrderId?orderNo=${searchedOrderNo}`)
      .then((response) => {
        const order = response.data;
        console.log(order);
        setSearchedOrder(order);
        setIsSaving(false);
        setIsSearchPerformed(true);

        // Update the form fields with the searched order data
        if (order) {
          // toast.success("Order Show Successfully");
          setOrderNo(order.orderNo);
          setRate(order.rate);
          setQuantity(order.quantity);
          setAmount(order.amount);
          setJobId(order.jobId);
          setSearchedJobId("");
        }

        if (response.data.success === false) {
          // Reset the form fields if no matching order is found
          toast.warning("Order Not Found");
          setOrderNo("");
          setRate("");
          setQuantity("");
          setAmount("");
          setJobId("");
        }
      })
      .catch((error) => {
        console.error("Error searching order:", error);
        setIsSearchPerformed(true);
        setIsSaving(true);
      });
    // .finally(() => {
    //   setIsSearchingByJobId(false); // Reset the state to false when the search is completed
    // });
  };
  return (
    <div className="container col-md-8 order-form">
      <h1 className="heading">Add Order Form</h1>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="searchedJobId">Search by Job ID:</label>
          <input
            type="text"
            id="searchedJobId"
            className="form-control"
            value={searchedJobId}
            readOnly={isSaving || isSearchingByOrderNo}
            onChange={(event) => setSearchedJobId(event.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={handleSearchByJobId}
            disabled={isSaving || isSearchingByOrderNo}
          >
            Search
          </button>
        </div>
      </div>

      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="searchedOrderNo">Search by Order No:</label>
          <input
            type="text"
            id="searchedOrderNo"
            className="form-control"
            value={searchedOrderNo}
            readOnly={isSaving || isSearchingByJobId}
            onChange={(event) => setSearchedOrderNo(event.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary mt-2"
            disabled={isSaving || isSearchingByJobId}
            onClick={handleSearchByOrderNo}
          >
            Search
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="orderNo">Order No:</label>
            <input
              type="text"
              className="form-control"
              id="orderNo"
              value={orderNo}
              onChange={(event) => setOrderNo(event.target.value)}
              readOnly={isSaving || searchedOrder || isSearchPerformed}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="rate">Rate:</label>
            <input
              type="number"
              className="form-control"
              id="rate"
              value={rate}
              onChange={handleRateChange}
              readOnly={isSaving || searchedOrder || isSearchPerformed}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              readOnly={isSaving || searchedOrder || isSearchPerformed}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              disabled
              readOnly={isSaving || isSearchPerformed}
            />
          </div>
        </div>
        {jobId && !isSearchPerformed && !isSearchingByOrderNo && (
          <div className="form-group">
            <label htmlFor="jobId">Job ID:</label>
            <input
              type="text"
              className="form-control"
              id="jobId"
              value={jobId}
              disabled
              readOnly={isSaving || searchedOrder || !isSearchingByOrderNo}
            />
          </div>
        )}

        {!isSearchingByJobId && searchedOrder && (
          <div className="form-group">
            <label htmlFor="jobId">Job ID:</label>
            <input
              type="text"
              className="form-control"
              id="jobId"
              value={jobId}
              readOnly={false}
            />
          </div>
        )}

        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary button1 mb-4"
            disabled={isSaving || searchedOrder}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            className="btn btn-primary mb-4"
            type="button"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
