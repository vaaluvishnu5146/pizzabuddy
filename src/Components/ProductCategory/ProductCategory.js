import React from "react";
import v from "../../images/v.png";
import nv from "../../images/nv.png";

export default function ProductCategory({ data = [] }) {
  const renderCategories = () => {
    let images = [];
    if (data.includes("veg")) {
      images.push(<img width="20px" src={v} />);
    }
    if (data.includes("non-veg")) {
      images.push(<img width="20px" src={nv} />);
    }
    return images;
  };

  return <div>{renderCategories()}</div>;
}
