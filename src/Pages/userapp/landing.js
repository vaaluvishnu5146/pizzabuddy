import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./cart";
import ListingPage from "./listings-page";
import OrderStatus from "./order-status";

export default function Landing() {
  return (
    <Routes>
      <Route exact path={"/landing/cart"} element={<Cart />} />
      <Route exact path="/" element={<ListingPage />} />
      <Route exact path="/orderStatus" element={<OrderStatus />} />
    </Routes>
  );
}
