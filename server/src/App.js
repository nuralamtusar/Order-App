import "./App.css";
import AddOrder from "./components/AddOrder";
import EditOrder from "./components/EditOrder";
import Navbar from "./components/Navbar";
import OrderList from "./components/OrderList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addOrder" element={<AddOrder />} />
        <Route path="/orderList" element={<OrderList />} />
        <Route path="/edit/:id" element={<EditOrder />} />
      </Routes>
      <ToastContainer autoClose={1000} theme="colored" />
    </BrowserRouter>
  );
}

export default App;
