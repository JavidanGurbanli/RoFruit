import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../CartContext";
import { BiHeart, BiX, BiSolidHeart } from "react-icons/bi";
import { Button } from "@chakra-ui/react";
import "./SingleProduct.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SingleProduct = ({ product, inFavoritesPage, category }) => {
  const { t } = useTranslation(["products"]);
  const {
    favourites,
    setFavourites,
    pricingType,
    cart,
    setCart,
    openBasketDrawer,
  } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavourite, setIsFavourite] = useState(false);
  const priceField =
    pricingType === "retail" ? "retail_price" : "wholesale_price";
  useEffect(() => {
    setIsFavourite(favourites.some((item) => item.id === product.id));
  }, [favourites, product]);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const navigate = useNavigate();

  const toggleFavourite = () => {
    const isCurrentlyFavourite = favourites.some(
      (item) => item.id === product.id
    );
    const updatedFavourites = isCurrentlyFavourite
      ? favourites.filter((item) => item.id !== product.id)
      : [...favourites, product];
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    setFavourites(updatedFavourites);
  };

  const getIcon = () => {
    if (inFavoritesPage) {
      return (
        <BiX
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite();
          }}
        />
      );
    } else {
      return isFavourite ? (
        <BiSolidHeart
          className="icon favourite_icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite();
          }}
        />
      ) : (
        <BiHeart
          className="icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite();
          }}
        />
      );
    }
  };

  const iconElement = getIcon();

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      const itemIndex = cart.findIndex((item) => item.id === product.id);
      const discountedPrice = product.discount
        ? (
            product[priceField] -
            (product[priceField] * product.discount) / 100
          ).toFixed(2)
        : product[priceField].toFixed(2);
      if (itemIndex !== -1) {
        setCart((prevCart) =>
          prevCart.map((item, index) =>
            index === itemIndex
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  priceField: discountedPrice,
                }
              : item
          )
        );
      } else {
        setCart((prevCart) => [
          ...prevCart,
          { ...product, quantity, priceField: discountedPrice },
        ]);
      }
      setIsLoading(false);
      openBasketDrawer();
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart.concat({ ...product, quantity, priceField: discountedPrice })
        )
      );
    }, 500);
  };

  const priceClassName = product.discount > 0 ? "line_through-price" : "price";
  return (
    <li
      className="product"
      onClick={() =>
        navigate(
          `/products/${category === "all" ? "all" : product.category}/${
            product.id
          }`
        )
      }
    >
      <div className="product_img">
        <img
          src={process.env.PUBLIC_URL + product.image_url}
          alt={product.name}
        />
      </div>
      <h3>{product.name}</h3>
      <p>
        {product.discount > 0 && (
          <span className="discounted-price">
            {(
              product[priceField] -
              (product[priceField] * product.discount) / 100
            ).toFixed(2)}
            ₼
          </span>
        )}
        <span className={priceClassName}>{product[priceField]}</span>
        <span className="currency">₼</span>
        <span className="unit">/{t("products:kg")}</span>
      </p>
      <div className="product_counter">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleIncreaseQuantity();
          }}
        >
          +
        </button>
        <p>{quantity}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDecreaseQuantity();
          }}
        >
          -
        </button>
      </div>
      <Button
        isLoading={isLoading}
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
        className="add_basket"
      >
        {t("products:addToBasketText")}
      </Button>
      <div className="icon_container">{iconElement}</div>
    </li>
  );
};

export default SingleProduct;
