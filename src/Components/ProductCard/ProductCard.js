import React from "react";
import veg from "../../images/v.png";
import nonVeg from "../../images/nv.png";
import ProductCategory from "../ProductCategory/ProductCategory";

export default function ProductCard({ data = {}, add = () => {} }) {
  return (
    <div className="card col-lg-3 col-md-4 col-sm-6">
      <img src={data.uri || ""} className="card-img-top" alt={data.name} />
      <div className="card-body">
        <div className="card-header">
          <h5>{data.name || ""}</h5>
          <ProductCategory data={data?.foodCategory || []} />
        </div>
        <div height="10px" />
        <p>{data.price}</p>
        {add && (
          <a href="#" className="btn btn-danger" onClick={() => add(data)}>
            Add to oven
          </a>
        )}
      </div>
    </div>
  );
}
