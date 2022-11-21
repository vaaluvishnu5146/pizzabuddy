import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Slider from "../../Components/Slider/Slider";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteItem } from "../../Redux/slice/cart.slice"; // RELATIVE IMPORT
import { addPizza } from "../../Redux/slice/pizza.slice";
import pizzaData from "../../data.json";

export default function ListingPage() {
  // CREATING DISPATCHER
  const dispatcher = useDispatch();
  const { pizzas = [] } = useSelector((state) => state.pizzaReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  // HOOKS
  const navigate = useNavigate();
  const fetchData = async () => {
    const response = await JSON.parse(JSON.stringify(pizzaData));
    if (response.data && response.data.length > 0) {
      dispatcher(addPizza(response.data));
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const addItemToCart = (data) => {
    if (data.id) {
      const cartCopy = Object.assign({}, data);
      cartCopy.quantity = 1;
      dispatcher(addToCart(cartCopy));
    }
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <Navbar cartCount={cart.length || 0} navigateTo={navigateToCart} />
      <div className="mb-5"></div>
      <div className="container container-fluid">
        <div className="row">
          {pizzas && pizzas.length > 0 ? (
            pizzas.map((d, i) => (
              <ProductCard data={d} key={i} add={addItemToCart} />
            ))
          ) : (
            <p>Sorry we dont server any product</p>
          )}
        </div>
      </div>
    </div>
  );
}
