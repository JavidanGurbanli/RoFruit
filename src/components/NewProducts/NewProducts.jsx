import React, { useEffect, useState } from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import "./NewProducts.scss";
import Loading from "../Loading/Loading";
import productData from "../../data";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const sortedProducts = productData.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const slicedProducts = sortedProducts.slice(0, 10);
    setNewProducts(slicedProducts);
    setIsLoading(false);
  }, []);

  return (
    <ul className="new_products">
      {isLoading ? (
        <Loading />
      ) : (
        newProducts.map((product) => (
          <SingleProduct key={product.id} product={product} icon="heart" />
        ))
      )}
    </ul>
  );
};

export default NewProducts;
